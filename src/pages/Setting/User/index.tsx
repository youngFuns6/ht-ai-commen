import React, { useEffect, useRef } from "react";
import "./index.scss";
import { Select, Table, message } from "antd";
import type { FormInstance } from "antd/es/form";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "react-query";
import { cloneDeep } from "lodash";
import useGetCommenList from "@/hooks/useGetCommenList";
import FormList from "@/components/FormList";
import ToolBtn from "@/components/base/ToolBtn";
import Confirm from "@/components/Confirm";
import { FormListFace } from "@/types/FormList";
import { Role, UserInfo } from "@/types/User";
import { reactQueryKey } from "@/config/constance";
import {
  getRoleList,
  getUser,
  editUser,
  deleteUser,
  addUser,
} from "@/api/user";
import {
  State as SettingState,
  changeSetting,
} from "@/store/reducer/settingSlice";

import commenBtn from "@/assets/images/btn/tools/commen.png";
import commenAcBtn from "@/assets/images/btn/tools/commen_ac.png";
import { fillterQuery } from "@/utils/commen";

export default function User() {
  // 获取角色列表
  const { data: roleList }: any = useQuery(reactQueryKey.getRoleList, () =>
    getRoleList()
  );

  const formListRef = useRef<FormInstance>(null);
  const { user } = useSelector((state: SettingState) => state.setting);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.selectedRowKeys.length) return;
    formListRef.current?.setFieldsValue(user.form);
  }, [user.form]);

  // 获取用户
  const {
    data: userInfo,
    isFetched: userIsFetched,
    hasNextPage: userHasNextPage,
    fetchNextPage: userFetchNextPage,
    refetch,
  } = useGetCommenList([reactQueryKey.getUser], getUser, {});

  // 分页
  const onPageChange = (page: number, pageSize: number) => {
    dispatch(
      changeSetting({ user: { ...user, search: { page, limit: pageSize } } })
    );
  };

  const onSelectRow = (record: UserInfo) => {
    if (user.selectedRowKeys[0] === record.id) {
      dispatch(changeSetting({ user: { ...user, selectedRowKeys: [] }, form: {...formList, password: ''} }));
    } else {
      const obj = cloneDeep(record);
      delete obj.id;
      dispatch(
        changeSetting({
          user: { ...user, form: {...obj, password: ''}, selectedRowKeys: [record.id] },
        })
      );
    }
  };

  // 增加通道
  const addMutation = useMutation((form: UserInfo) => addUser(form));

  // 修改通道
  const editMutation = useMutation((form: UserInfo) => editUser(fillterQuery(form)));

  // 删除通道
  const deleteMutation = useMutation((id: number) => deleteUser(id));

  // 操作（增删改）
  const onOptUser = async (type: string) => {
    if (type !== "delete") {
      await formListRef.current?.validateFields();
    }
    switch (type) {
      case "add":
        await addMutation.mutateAsync(user.form);
        break;
      case "edit":
        if (!user.selectedRowKeys.length)
          return message.error("请先选择所需修改的通道");
        await editMutation.mutateAsync({
          id: user.selectedRowKeys[0],
          username: user.form.username,
          password: user.form.password, role: user.form.role,
        });
        break;
      case "delete":
        if (!user.selectedRowKeys.length)
          return message.error("请先选择所需删除的通道");
        await deleteMutation.mutateAsync(user.selectedRowKeys[0]);
        dispatch(changeSetting({ user: { ...user, selectedRowKeys: [] } }));
        break;
    }
    refetch();
  };

  const formList: FormListFace[] = [
    {
      label: "用户名",
      name: "username",
      rules: [{ required: true, message: "必填" }],
    },
    {
      label: "密码",
      name: "password",
      // rules: [{ required: true, message: "必填" }],
    },
    {
      label: "用户类型",
      name: "role",
      rules: [{ required: true, message: "必填" }],
      defNode: (
        <Select
          options={
            roleList?.map((item: Role) => ({
              label: item.name,
              value: item.id,
              key: item.id,
            })) || []
          }
        />
      ),
    },
  ];

  const columns = [
    {
      title: "用户名称",
      dataIndex: "username",
    },
    {
      title: "用户类型",
      dataIndex: "role",
      render: (role: string) =>
        roleList.find((item: Role) => item.id === role)?.name,
    },
  ];

  return (
    <div className="set-user">
      <div className="set-user-left">
        <Table
          pagination={{
            current: user.search.page,
            onChange: onPageChange,
            pageSize: 12,
            total: userInfo?.pages[0].total,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条数据`,
          }}
          rowKey="id"
          dataSource={userInfo?.pages[userInfo.pages.length - 1].items}
          columns={columns}
          rowClassName={(record) =>
            record.id === user.selectedRowKeys[0] ? "active-row" : ""
          }
          onRow={(record) => ({ onClick: () => onSelectRow(record) })}
        />
      </div>
      <div className="set-user-right">
        <FormList
          onValuesChange={(changeValues) =>
            dispatch(
              changeSetting({
                user: { ...user, form: { ...user.form, ...changeValues } },
              })
            )
          }
          initialValues={user.form}
          ref={formListRef}
          formList={formList}
          col={{ span: 24 }}
          labelSpan={7}
          wrapperSpan={17}
        />
        <div className="set-user-right-btn">
          <ToolBtn
            onClick={() => onOptUser("add")}
            src={commenBtn}
            acSrc={commenAcBtn}
            content="增加"
          />
          <ToolBtn
            onClick={() => onOptUser("edit")}
            src={commenBtn}
            acSrc={commenAcBtn}
            content="修改"
          />
          <Confirm title="确认删除？" onConfirm={() => onOptUser("delete")}>
            <ToolBtn src={commenBtn} acSrc={commenAcBtn} content="删除" />
          </Confirm>
        </div>
      </div>
    </div>
  );
}
