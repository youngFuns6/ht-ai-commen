import React, { useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./index.scss";
import { useQuery, useMutation } from "react-query";
import { cloneDeep } from "lodash";
import {
  Col,
  Select,
  Table,
  Radio,
  DatePicker,
  Row,
  Pagination,
  message,
} from "antd";
import type { FormInstance } from "antd/es/form";
import { useSelector, useDispatch } from "react-redux";
import useGetCommenList from "@/hooks/useGetCommenList";
import { reactQueryKey } from "@/config/constance";
import FormList from "@/components/FormList";
import ToolBtn from "@/components/base/ToolBtn";
import Confirm from "@/components/Confirm";
import {
  getPatrolPlan,
  addPatrolPlan,
  editPatrolPlan,
  deletePatrolPlan,
  getPatrolWorkerList,
} from "@/api/coal";
import { FormListFace } from "@/types/FormList";
import { ChnContext } from "@/types/Commen";
import { SearchPatrolPlan, Worker, PatrolPlan } from "@/types/Coal";
import { State as AppState, changeApp } from "@/store/reducer/appSlice";
import { fillterQuery } from "@/utils/commen";

import queryBtn from "@/assets/images/btn/tools/query_btn.png";
import moment from "moment";

const columns = [
  {
    title: "巡检类型",
    dataIndex: "type",
    render: (type: string) => (type === "XJ_001" ? "轨迹巡检" : "人脸巡检"),
  },
  {
    title: "计划名称",
    dataIndex: "name",
  },
  {
    title: "巡检设备",
    dataIndex: "device",
  },
  {
    title: "计划巡检开始时间",
    dataIndex: "begin_time",
    render: (time: number) => moment(time).format("HH:mm:ss"),
  },
  {
    title: "计划巡检结束时间",
    dataIndex: "duration",
    render: (time: number) => moment(time).format("HH:mm:ss"),
  },
  {
    title: "巡检人",
    dataIndex: "worker",
  },
];

export default function Plan() {
  const { deviceChnArr, onChnScroll } = useOutletContext<ChnContext>();

  const searchFormlistRef = useRef<FormInstance>(null);
  const planOptFormListRef = useRef<FormInstance>(null);

  const {
    searchPatrolPlan,
    patrolPlan: patrolPlanForm,
    selectedRowKeys,
  } = useSelector((state: AppState) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedRowKeys.length) return;
    planOptFormListRef.current?.setFieldsValue({
      ...patrolPlanForm,
      begin_time: moment(patrolPlanForm.begin_time),
      duration: moment(patrolPlanForm.duration),
    });
  }, [patrolPlanForm]);

  // 获取巡检计划
  const {
    data: patrolPlanInfo,
    isFetched: patrolPlanIsFetched,
    hasNextPage: patrolPlanHasNextPage,
    fetchNextPage: patrolPlanFetchNextPage,
    refetch: patrolPlanRefetch,
  } = useGetCommenList<SearchPatrolPlan>(
    [reactQueryKey.getPatrolPlan, searchPatrolPlan],
    getPatrolPlan,
    { ...fillterQuery(searchPatrolPlan, "全部") }
  );

  // 获取巡检人员
  const { data: patrolWorker, isFetched: patrolWorkerIsFetched } = useQuery(
    [reactQueryKey.getPatrolWorkerList],
    getPatrolWorkerList
  );

  // 添加计划
  const addMutation = useMutation((formData: PatrolPlan) =>
    addPatrolPlan(formData)
  );

  // 修改计划
  const editMutation = useMutation((formData: PatrolPlan) =>
    editPatrolPlan(formData)
  );

  // 删除计划
  const deleteMutation = useMutation((id: number) => deletePatrolPlan(id));

  // 巡检类型
  const onPlanTypeChange = () => {};

  // 分页
  const onPageChange = (page: number, pageSize: number) => {
    dispatch(
      changeApp({
        searchPatrolPlan: { ...searchPatrolPlan, page, limit: pageSize },
      })
    );
  };

  // 计划(增删改)
  const onOptPlan = (type: string) => {
    planOptFormListRef.current?.validateFields().then((v) => {
      switch (type) {
        case "add":
          addMutation.mutate(patrolPlanForm);
          break;
        case "edit":
          if (!selectedRowKeys.length)
            return message.error("请先选中所需修改的计划");
          editMutation.mutate({ ...patrolPlanForm, id: selectedRowKeys[0] });
          break;
        case "delete":
          if (!selectedRowKeys.length)
            return message.error("请先选中所需删除的计划");
          deleteMutation.mutate(selectedRowKeys[0]);
          break;
      }
      patrolPlanRefetch();
    });
  };

  const onSelectRow = (record: PatrolPlan) => {
    if (selectedRowKeys[0] === record.id) {
      dispatch(changeApp({ selectedRowKeys: [] }));
    } else {
      let obj = cloneDeep(record);
      delete obj.id;
      dispatch(changeApp({ selectedRowKeys: [record.id], patrolPlan: obj }));
    }
  };

  const searchFormList: FormListFace[] = [
    {
      label: "巡检设备",
      name: "device",
      defNode: (
        <Select
          onPopupScroll={(e) => onChnScroll("device", e)}
          options={deviceChnArr.map((item) => ({
            label: item.name,
            value: item.id,
            key: item.id,
          }))}
        />
      ),
    },
    {
      label: "巡检类型",
      name: "type",
      defNode: (
        <Select
          options={[
            { label: "轨迹巡检", value: "XJ_001", key: 0 },
            { label: "人脸巡检", value: "XJ_002", key: 1 },
          ]}
        />
      ),
    },
  ];

  const optFormList: FormListFace[] = [
    {
      label: "巡检类型",
      name: "type",
      defNode: (
        <Radio.Group onChange={onPlanTypeChange}>
          <Radio value={"XJ_001"}>轨迹巡检</Radio>
          <Radio value={"XJ_002"}>人脸巡检</Radio>
        </Radio.Group>
      ),
    },
    {
      label: "计划名称",
      name: "name",
      rules: [{ required: true, message: "必填" }],
    },
    {
      label: "计划巡检开始时间",
      name: "begin_time",
      rules: [{ required: true, message: "必填" }],
      defNode: <DatePicker picker="time" />,
    },
    {
      label: "计划巡检结束时间",
      name: "duration",
      rules: [{ required: true, message: "必填" }],
      defNode: <DatePicker picker="time" />,
    },
    {
      label: "巡检设备",
      name: "device",
      rules: [{ required: true, message: "必填" }],
      defNode: (
        <Select
          onPopupScroll={(e) => onChnScroll("chn", e)}
          options={deviceChnArr.map((item) => ({
            label: item.name,
            value: item.id,
            key: item.id,
          }))}
        />
      ),
    },
    {
      label: "巡检人",
      name: "worker",
      rules: [{ required: true, message: "必填" }],
      defNode: (
        <Select
          options={
            (patrolWorker as any)?.map((item: Worker) => ({
              label: item.name,
              value: item.id,
              key: item.id,
            })) || []
          }
        />
      ),
    },
  ];

  return (
    <div className="plan">
      <div className="plan-content">
        <div className="plan-content-table">
          <Table
            pagination={{
              current: searchPatrolPlan.page,
              onChange: onPageChange,
              pageSize: 12,
              showSizeChanger: false,
              total: patrolPlanInfo?.pages[0].total,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条数据`,
            }}
            scroll={{ y:  '60vh', scrollToFirstRowOnChange: true }}
            rowKey="id"
            rowClassName={(record) =>
              record.id === selectedRowKeys[0] ? "active-row" : ""
            }
            dataSource={
              patrolPlanInfo?.pages[patrolPlanInfo.pages.length - 1].items
            }
            columns={columns}
            onRow={(record) => ({ onClick: () => onSelectRow(record) })}
          />
        </div>
        {/* <div className='plan-page'>
          <Pagination
            current={searchPatrolPlan.page}
            onChange={onPageChange}
            pageSize={15}
            total={patrolPlanInfo?.pages[0].total}
            showQuickJumper
            showTotal={total => `共 ${total} 条数据`}
          />
        </div> */}
      </div>
      <div className="plan-right">
        <div>
          <FormList
            ref={searchFormlistRef}
            initialValues={searchPatrolPlan}
            col={{ span: 24 }}
            labelSpan={6}
            wrapperSpan={18}
            formList={searchFormList}
          />
          <Col offset={6}>
            <ToolBtn
              onClick={() => {
                dispatch(
                  changeApp({
                    searchPatrolPlan:
                      searchFormlistRef.current?.getFieldsValue(),
                  })
                );
              }}
              native
              src={queryBtn}
              content="搜索"
            />
          </Col>
        </div>
        <div className="plan-right-opt">
          <FormList
            onValuesChange={(changeValues) =>
              dispatch(
                changeApp({
                  patrolPlan: {
                    ...patrolPlanForm,
                    ...fillterQuery(changeValues),
                  },
                })
              )
            }
            ref={planOptFormListRef}
            initialValues={{
              ...patrolPlanForm,
              begin_time:
                patrolPlanForm.begin_time && moment(patrolPlanForm.begin_time),
              duration:
                patrolPlanForm.begin_time && moment(patrolPlanForm.duration),
            }}
            col={{ span: 24 }}
            labelSpan={7}
            wrapperSpan={17}
            formList={optFormList}
          />
          <Row gutter={20}>
            <Col span={8}>
              <ToolBtn
                onClick={() => onOptPlan("add")}
                src={queryBtn}
                native
                content="增加"
              />
            </Col>
            <Col span={8}>
              <ToolBtn
                onClick={() => onOptPlan("edit")}
                src={queryBtn}
                native
                content="修改"
              />
            </Col>
            <Col span={8}>
              <Confirm title="确认删除？" onConfirm={() => onOptPlan("delete")}>
                <ToolBtn src={queryBtn} native content="删除" />
              </Confirm>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
