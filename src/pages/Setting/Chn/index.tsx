import React, { useRef, useEffect, Ref } from "react";
import "./index.scss";
import { message, Select, InputNumber, Tabs } from "antd";
import type { FormInstance } from "antd/es/form";
import { cloneDeep } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQuery } from "react-query";
import ChnTable from "./components/ChnTable";
import { FormListFace } from "@/types/FormList";
import { Device, DeviceChn } from "@/types/Device";
import { Region } from "@/types/Region";
import useGetCommenList from "@/hooks/useGetCommenList";
import { reactQueryKey, DEVICE_TYPE, EVENT_TYPE } from "@/config/constance";
import mergePageList from "@/utils/mergePageList";
import { getRegion } from "@/api/region";
import {
  getDevicesList,
  editDdevice,
  deleteDdevice,
  getDevicesChn,
  addDdevice,
  editDdeviceChn,
  deleteDdeviceChn,
} from "@/api/device";
import {
  State as SettingState,
  changeSetting,
  Commen,
} from "@/store/reducer/settingSlice";

import { fillterQuery } from "@/utils/commen";

const devicesColumns = [
  {
    title: "在线状态",
    dataIndex: "status",
    render: (status: number) => (status > 0 ? "在线" : "离线"),
  },
  {
    title: "设备名称",
    dataIndex: "name",
  },
  {
    title: "ip",
    dataIndex: "ip",
  },
  {
    title: "端口",
    dataIndex: "port",
  },
  {
    title: "软件版本",
    dataIndex: "sw",
  },
  {
    title: "硬件版本",
    dataIndex: "hw",
  },
  {
    title: "算法库版本",
    dataIndex: "algoVer",
  },
  {
    title: "模型版本",
    dataIndex: "modVer",
  },
  {
    title: "固件版本",
    dataIndex: "fwVer",
  },
];

export default function Chn() {
  const deviceFormListRef = useRef<FormInstance>(null);
  const chnFormListRef = useRef<FormInstance>(null);
  const { device, chn, activeTabKey, } = useSelector(
    (state: SettingState) => state.setting
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeTabKey === "0") {
      if (!device.selectedRowKeys.length) return;
      deviceFormListRef.current?.setFieldsValue(device.form);
    } else {
      if (!chn.selectedRowKeys.length) return;
      chnFormListRef.current?.setFieldsValue(chn.form);
    }
  }, [chn.form, device.form]);

  // 获取设备列表
  const { data: devicesList, refetch: deviceRefetch }: any = useQuery(
    reactQueryKey.getDevicesList,
    () => getDevicesList()
  );

  // 获取通道
  const {
    data: chnInfo,
    isFetched: chnIsFetched,
    hasNextPage: chnHasNexPage,
    fetchNextPage: chnFetchNextPage,
    refetch: chnRefetch,
  } = useGetCommenList(
    [reactQueryKey.getDeviceChn],
    getDevicesChn,
    { ...chn.search },
    activeTabKey === "1"
  );

  // 获取区域信息
  const {
    data: regionInfo,
    isFetched: regionIsFetched,
    hasNextPage: regionHasNextPage,
    fetchNextPage: regionFetchNextPage,
    refetch,
  } = useGetCommenList(
    [reactQueryKey.getRegion],
    getRegion,
    { limit: 50 },
    activeTabKey === "1"
  );

  // 分页
  const onPageChange = (page: number, pageSize: number) => {
    dispatch(
      changeSetting({ chn: { ...chn, search: { page, limit: pageSize } } })
    );
  };

  const onSelectRow = (
    record: Device & DeviceChn,
    typeObj: Commen,
    type: string
  ) => {
    if (typeObj.selectedRowKeys[0] === record.id) {
      dispatch(changeSetting({ [type]: { ...typeObj, selectedRowKeys: [] } }));
    } else {
      const obj = cloneDeep(record);
      delete obj.id;
      dispatch(
        changeSetting({
          [type]: { ...typeObj, form: obj, selectedRowKeys: [record.id] },
        })
      );
    }
  };

  // 增加设备
  const addMutation = useMutation((form: Device) =>
    addDdevice(fillterQuery(form) as any)
  );

  // 修改设备
  const editMutation = useMutation((form: Device & DeviceChn) =>
    activeTabKey === "0"
      ? editDdevice(device.selectedRowKeys[0], form)
      : editDdeviceChn(chn.selectedRowKeys[0], form)
  );

  // 删除设备
  const deleteMutation = useMutation((id: string) =>
    activeTabKey === "0" ? deleteDdevice(id) : deleteDdeviceChn(id)
  );

  // 操作（增删改）设备
  const onOptDevice = async (
    type: string,
    typeObj: Commen,
    typeObjStr: string,
    ref: React.RefObject<FormInstance>
  ) => {
    if (type !== "delete") {
      await ref.current?.validateFields();
    }
    switch (type) {
      case "add":
        try {
          await addMutation.mutateAsync(ref.current?.getFieldsValue());
          ref.current?.resetFields();
        } catch (error) {
          message.error("添加失败");
        }
        break;
      case "edit":
        if (!typeObj.selectedRowKeys.length)
          return message.error("请先选择所需修改的数据");
        await editMutation.mutateAsync(ref.current?.getFieldsValue());
        break;
      case "delete":
        if (!typeObj.selectedRowKeys.length)
          return message.error("请先选择所需删除的数据");
        await deleteMutation.mutateAsync(typeObj.selectedRowKeys[0]);
        dispatch(
          changeSetting({
            [typeObjStr]: { ...typeObj, selectedRowKeys: [] },
          })
        );
        break;
    }
    activeTabKey === "0" ? deviceRefetch() : chnRefetch();
  };

  const onPopupScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // console.log(e)
    const h = e.target as HTMLElement;
    if (h.scrollTop + h.offsetHeight >= h.scrollHeight) {
      if (regionHasNextPage) {
        regionFetchNextPage();
      }
    }
  };

  const deviceFormList: FormListFace[] = [
    {
      label: "设备IP",
      name: "ip",
      // rules: [{ required: true, message: "必填项" }],
    },
    {
      label: "设备端口",
      name: "port",
      rules: [{ required: true, message: "必填项" }],
      defNode: <InputNumber min={0} />,
    },

    {
      label: "IPC 用户名",
      name: "username",
    },
    {
      label: "IPC 密码",
      name: "userpass",
    },
  ];

  const chnFormList: FormListFace[] = [
    {
      label: "通道名称",
      name: "name",
      // rules: [{ required: true, message: "必填项" }],
    },
    {
      label: "区域",
      name: "region",
      defNode: (
        <Select
          onPopupScroll={(e) => onPopupScroll(e)}
          options={[
            ...mergePageList<Region>(regionInfo?.pages).map((item) => ({
              label: item.name,
              value: item.id,
              key: item.id,
            })),
          ]}
        />
      ),
    },
  ];

  const chnColumns = [
    {
      title: "通道名称",
      dataIndex: "name",
    },
    {
      title: "设备类型",
      dataIndex: "devType",
      render: (devType: string) =>
        DEVICE_TYPE.find((item) => item.type === devType)?.name,
    },
    {
      title: "所在区域",
      dataIndex: "region",
      render: (region: number) =>
        mergePageList<Region>(regionInfo?.pages).find(
          (item) => item.id === region
        )?.name,
    },
    {
      title: "设备IP",
      dataIndex: "ip",
    },
    {
      title: "IPC IP",
      dataIndex: "pip",
    },
  ];

  return (
    <Tabs
      onChange={(key) => dispatch(changeSetting({ activeTabKey: key }))}
      defaultActiveKey={activeTabKey}
      items={[
        {
          label: "设备管理",
          key: "0",
          children: (
            <ChnTable
              onOpt={(type: string) => onOptDevice(type, device, "device", deviceFormListRef)}
              list={devicesList}
              columns={devicesColumns}
              data={device}
              formList={deviceFormList}
              onSelectRow={(row) => onSelectRow(row, device, "device")}
              ref={deviceFormListRef}
            />
          ),
        },
        {
          label: "通道管理",
          key: "1",
          children: (
            <ChnTable
              onOpt={(type: string) => onOptDevice(type, chn, "chn", chnFormListRef)}
              list={chnInfo?.pages[chnInfo.pages.length - 1].items}
              columns={chnColumns}
              data={chn}
              formList={chnFormList}
              onSelectRow={(row) => onSelectRow(row, chn, "chn")}
              ref={chnFormListRef}
              hasAdd={false}
              hasDel={false}
              pagination={{
                current: chn.search!.page,
                onChange: onPageChange,
                pageSize: 12,
                total: chnInfo?.pages[0].total,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条数据`,
              }}
            />
          ),
        },
      ]}
    />
  );
}
