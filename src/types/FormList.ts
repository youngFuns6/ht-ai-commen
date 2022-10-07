import { ColProps } from 'antd';

export interface FormListProps {
  formList: FormListFace[];
  searchForm?: boolean;
  labelSpan?: number | string;
  wrapperSpan?: number;
  buttonPosition?: any;
  col?: ColProps;
  initialValues?: {[key: string]: any};
  labelOut?: 'horizontal' | 'vertical' | 'inline'
}

export interface FormListFace {
    name: string;
    label: string;
    time?: boolean;
    defNode?: any;
    checked?: boolean;
    initValue?: any;
    password?: boolean;
    placeholder?: string;
    rules?: Array<{ required?: boolean, message: string, pattern?: RegExp }>;
    hidden?: boolean;
}
