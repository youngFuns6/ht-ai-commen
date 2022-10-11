import React, { useImperativeHandle } from 'react';
import { Form, Input, Row, Col, } from 'antd';
import { FormListProps } from '@/types/FormList';

const FormList = React.forwardRef((props: FormListProps, ref) => {
  const { formList, col, searchForm = false, labelSpan = 4, wrapperSpan = 16, buttonPosition = 'left', initialValues, labelOut = 'horizontal', onValuesChange } = props;

  const layout = {
    labelCol: { span: labelSpan },
    wrapperCol: { span: wrapperSpan },
  };

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => (
    {
      setFieldsValue: form.setFieldsValue,
      getFieldsValue: form.getFieldsValue,
      resetFields: form.resetFields,
      getFieldValue: form.getFieldValue,
      validateFields: form.validateFields,
    }
  ))

  const getFields = () => {
    const children = [];
    for (let i = 0; i < formList.length; i++) {
      children.push(
        searchForm ? <Col {...col} key={i}>
          <Form.Item
            name={formList[i].name}
            label={formList[i].label}
            initialValue={formList[i].initValue}
          >
            {!formList[i].defNode ? <Input /> : formList[i].defNode}
          </Form.Item>
        </Col> :
          !formList[i].hidden && <Form.Item
            key={i}
            name={formList[i].name}
            label={formList[i].label}
            rules={formList[i].rules}
            initialValue={formList[i].initValue}
            {...formList[i].checked ? { valuePropName: 'checked' } : {}}
          >
            {!formList[i].defNode ? (
              !formList[i].password ? <Input placeholder={formList[i].placeholder} /> : <Input.Password />
            ) : (
              formList[i].defNode
            )}
          </Form.Item>
      );
    }
    return children;
  };

  return (
    <Form
      onValuesChange={onValuesChange}
      layout={labelOut}
      initialValues={initialValues}
      autoComplete='off'
      {...layout}
      form={form}
      labelAlign="right"
      labelWrap
    >
      {searchForm ? <Row gutter={24}>{getFields()}</Row> : getFields()}
    </Form>
  );
})


export default React.memo(FormList);
