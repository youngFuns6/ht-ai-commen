import React, { useRef, useImperativeHandle } from "react";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import FormList from "@/components/FormList";
import { FormListFace } from "@/types/FormList";
import ToolBtn from "@/components/base/ToolBtn";
import Confirm from "@/components/Confirm";
import type { FormInstance } from "antd/es/form";

import chnTextBar from "@/assets/images/text/chn_info.png";
import commenBtn from "@/assets/images/btn/tools/commen.png";
import commenAcBtn from "@/assets/images/btn/tools/commen_ac.png";

interface Props {
  list?: any[];
  columns?: ColumnsType<any>;
  formList?: FormListFace[];
  data?: any;
  hasAdd?: boolean;
  hasDel?: boolean;
  pagination?: TablePaginationConfig | false;
  onSelectRow?: (row: any) => void;
  onChangeValues?: (values: any) => void;
  onOpt?: (type: string) => void;
}

const ChnTable = React.forwardRef((props: Props, ref) => {
  const { list, columns, formList, data, hasAdd=true, hasDel=true, pagination = false, onSelectRow, onChangeValues, onOpt } =
    props;
  const formListRef = useRef<FormInstance>(null);
  useImperativeHandle(ref, () => ({
    setFieldsValue: formListRef.current?.setFieldsValue,
    getFieldsValue: formListRef.current?.getFieldsValue,
    resetFields: formListRef.current?.resetFields,
    getFieldValue: formListRef.current?.getFieldValue,
    validateFields: formListRef.current?.validateFields,
  }));
  return (
    <>
      <div className="set-chn">
        <div className="set-chn-left">
          <div className="set-chn-left-table">
            <Table
              pagination={pagination}
              scroll={{ y: "60vh", scrollToFirstRowOnChange: true }}
              rowKey="id"
              dataSource={list}
              columns={columns}
              rowClassName={(record) =>
                record.id === data.selectedRowKeys[0] ? "active-row" : ""
              }
              onRow={(record) => ({
                onClick: () => onSelectRow && onSelectRow(record),
              })}
            />
          </div>
        </div>
        <div className="set-chn-right">
          {/* <TextBar width="100%" height="50px" src={chnTextBar} /> */}
          <div className="set-chn-right-form">
            <FormList
              onValuesChange={(changeValues) =>
                onChangeValues && onChangeValues(changeValues)
              }
              ref={formListRef}
              initialValues={data.form}
              formList={formList || []}
              col={{ span: 24 }}
              labelSpan={8}
              wrapperSpan={16}
            />
          </div>
          <div className="set-chn-right-btn">
            {hasAdd && <ToolBtn
              onClick={() => onOpt && onOpt("add")}
              src={commenBtn}
              acSrc={commenAcBtn}
              content="增加"
            />}
            <ToolBtn
              onClick={() => onOpt && onOpt("edit")}
              src={commenBtn}
              acSrc={commenAcBtn}
              content="修改"
            />
            {hasDel && <Confirm
              title="确认删除？"
              onConfirm={() => onOpt && onOpt("delete")}
            >
              <ToolBtn src={commenBtn} acSrc={commenAcBtn} content="删除" />
            </Confirm>}
          </div>
        </div>
      </div>
    </>
  );
});

export default ChnTable;
