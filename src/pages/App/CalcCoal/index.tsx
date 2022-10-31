import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./index.scss";
import { Select, Radio, Space, DatePicker, Col, Row } from "antd";
import type { FormInstance } from "antd/es/form";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import moment from "moment";
import CountUp from "react-countup";
import { reactQueryKey } from "@/config/constance";
import FormList from "@/components/FormList";
import ToolBtn from "@/components/base/ToolBtn";
import Charts from "@/components/Charts";
import { State as AppState, changeApp } from "@/store/reducer/appSlice";
import { getCoalCount, getCoalSection } from "@/api/coal";
import { FormListFace } from "@/types/FormList";
import { ChnContext } from "@/types/Commen";
import { fillterQuery } from "@/utils/commen";

import commenBtn from "@/assets/images/btn/tools/query_btn.png";
import cocalCount from "@/assets/images/text/cocal_count.png";

const CalcCoal = () => {
  const { deviceChnArr, onChnScroll } = useOutletContext<ChnContext>();

  const coalCountRef = useRef<FormInstance>(null);
  const cocalSectionRef = useRef<FormInstance>(null);

  const { searchCoalCount, searchSectionCount, chartType } = useSelector(
    (state: AppState) => state.app
  );
  const dispatch = useDispatch();
  const [currentCoal, setCurrentCoal] = useState({
    currentYear: 0,
    currentMonth: 0,
    currentDay: 0,
  });

  // 获取煤量统计
  const { data: countCoalInfo, isFetched: countCoalIsfetched }: any = useQuery(
    [reactQueryKey.getCoalCount, searchCoalCount],
    () => getCoalCount(fillterQuery(searchCoalCount, "全部"))
  );

  // 获取煤量合计区间
  const { data: cocalSectionInfo, isFetched: cocalSectionIsfetched }: any =
    useQuery([reactQueryKey.getCoalSection, searchSectionCount], () =>
      getCoalSection({
        ...fillterQuery(searchSectionCount, "全部"),
        start_time: +moment(searchSectionCount.start_time).format("X"),
        stop_time: +moment(searchSectionCount.stop_time).format("X"),
      })
    );

  useEffect(() => {
    getCurrentCoal();
  }, []);

  // 分别获取当年当月当日煤量
  const getCurrentCoal = async () => {
    const current: any = await Promise.all([
      getCoalCount({
        unit: 1,
        start_time: new Date(+moment(Date.now()).format("YYYY"), 0).valueOf(),
      }),
      getCoalCount({
        unit: 2,
        start_time: new Date(
          +moment(Date.now()).format("YYYY"),
          +moment(Date.now()).format("MM")
        ).valueOf(),
      }),
      getCoalCount({
        unit: 3,
        start_time: new Date(
          +moment(Date.now()).format("YYYY"),
          +moment(Date.now()).format("MM"),
          0
        ).valueOf(),
      }),
    ]);
    setCurrentCoal({
      currentYear: current[0].length ? current[0].reduce((item1: any, item2: any) => item1.volume + item2.volume, {volume: 0}) : 0,
      currentMonth: current[1].length ? current[1].reduce((item1: any, item2: any) => item1.volume + item2.volume, {volume: 0}) : 0,
      currentDay: current[2].length ? current[2].reduce((item1: any, item2: any) => item1.volume + item2.volume, {volume: 0}) : 0,
    });
  };

  const getTimeTy = (value: number) => {
    switch (value) {
      case 1:
        return "year";
      case 2:
        return "month";
      case 3:
        return "date";
    }
  };

  // 统计表单字段值改变
  const onCountChange = (changedValues: any, allValues: any) => {
    // console.log(changedValues)
    const obj = changedValues.start_time
      ? { start_time: changedValues.start_time.valueOf() }
      : {};
    dispatch(
      changeApp({
        searchCoalCount: { ...searchCoalCount, ...changedValues, ...obj },
      })
    );
  };

  const countFormList: FormListFace[] = [
    {
      label: "所属通道",
      name: "id",
      defNode: (
        <Select
          onPopupScroll={(e) => onChnScroll("chn", e)}
          options={[
            { label: "全部", value: "全部", key: "全部" },
            ...deviceChnArr.map((item) => ({
              label: item.id,
              value: item.id,
              key: item.id,
            })),
          ]}
        />
      ),
    },
    {
      label: "",
      name: "unit",
      defNode: (
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={1}>按年统计</Radio>
            <Radio value={2}>按月统计</Radio>
            <Radio value={3}>按日统计</Radio>
          </Space>
        </Radio.Group>
      ),
    },
    {
      label: "",
      name: "start_time",
      defNode: <DatePicker picker={getTimeTy(searchCoalCount.unit!)} />,
    },
  ];

  const sectionFormList: FormListFace[] = [
    {
      label: "开始时间",
      name: "start_time",
      defNode: <DatePicker showTime />,
    },
    {
      label: "结束时间",
      name: "stop_time",
      defNode: <DatePicker showTime />,
    },
    {
      label: "所属通道",
      name: "device",
      defNode: (
        <Select
          onPopupScroll={(e) => onChnScroll("chn", e)}
          options={[
            { label: "全部", value: "全部", key: "全部" },
            ...deviceChnArr.map((item) => ({
              label: item.id,
              value: item.id,
              key: item.id,
            })),
          ]}
        />
      ),
    },
  ];

  return (
    <div className="calc-coal">
      <div className="calc-coal-left">
        <FormList
          ref={coalCountRef}
          onValuesChange={onCountChange}
          initialValues={{
            ...searchCoalCount,
            start_time: moment(searchCoalCount.start_time),
          }}
          labelOut="horizontal"
          labelSpan={24}
          wrapperSpan={24}
          col={{ span: 24 }}
          formList={countFormList}
        />
        <ToolBtn
          onClick={() => {
            dispatch(
              changeApp({
                searchCoalCount: {
                  ...coalCountRef.current?.getFieldsValue(),
                  start_time: coalCountRef.current
                    ?.getFieldValue("start_time")
                    ?.valueOf(),
                },
              })
            );
          }}
          native
          src={commenBtn}
        />
      </div>
      <div className="calc-coal-content">
        <Row>
          <Col span={24}>
            <Charts
              type={chartType}
              data={countCoalInfo}
              xField={
                (getTimeTy(searchCoalCount.unit!) as string) === "date"
                  ? "day"
                  : (getTimeTy(searchCoalCount.unit!) as string)
              }
              yField="volume"
              textBarSrc={cocalCount}
              onClick={(type) => {
                dispatch(changeApp({ chartType: type }));
              }}
            />
          </Col>
        </Row>
        <div className="cocal-count-all">
          <div className="cocal-counter">
            <i>
              <CountUp end={currentCoal.currentDay}></CountUp>
            </i>
            <span>当日煤量</span>
          </div>
          <div className="cocal-counter">
            <i>
              <CountUp end={currentCoal.currentMonth}></CountUp>
            </i>
            <span>当月煤量</span>
          </div>
          <div className="cocal-counter">
            <i>
              <CountUp end={currentCoal.currentYear}></CountUp>
            </i>
            <span>当年煤量</span>
          </div>
          <div className="cocal-count-section">
            <h3>
              区间统计
              <i>查询结果：{cocalSectionInfo && cocalSectionInfo.volume}</i>
            </h3>
            <div className="cocal-count-section-form">
              <div className="cocal-count-section-formlist">
                <FormList
                  ref={cocalSectionRef}
                  initialValues={{
                    ...searchSectionCount,
                    start_time: moment(searchSectionCount.start_time),
                    stop_time: moment(searchSectionCount.stop_time),
                  }}
                  labelSpan={7}
                  wrapperSpan={17}
                  col={{ span: 24 }}
                  formList={sectionFormList}
                />
              </div>
              <div>
                <ToolBtn
                  onClick={() => {
                    dispatch(
                      changeApp({
                        searchSectionCount: {
                          ...cocalSectionRef.current?.getFieldsValue(),
                          start_time: cocalSectionRef.current
                            ?.getFieldValue("start_time")
                            ?.valueOf(),
                          stop_time: cocalSectionRef.current
                            ?.getFieldValue("stop_time")
                            ?.valueOf(),
                        },
                      })
                    );
                  }}
                  width="100px"
                  native
                  src={commenBtn}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CalcCoal);
