import { useEffect } from "react";
import type { FormInstance } from 'antd/es/form';
import { useDispatch, useSelector } from 'react-redux';
import useGetCommenList from '@/hooks/useGetCommenList';
import { Commen } from '@/store/reducer/settingSlice';

export default <T>(opt: Commen, formRef: FormInstance, apiKey: string, api: any, name: string, itemName: string) => {
  const { region } = useSelector((state: T) => state[name]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!opt.selectedRowKeys.length) return;
    formRef.setFieldsValue(opt.form);
  }, [opt.form]);

  // 获取信息
  const { data: regionInfo, isFetched: regionIsFetched, hasNextPage: regionHasNextPage, fetchNextPage: regionFetchNextPage } = useGetCommenList(apiKey, api, opt.search);

  // 分页
  const onPageChange = (page: number, pageSize: number) => {
    dispatch(changeSetting({ region: { ...region, search: { page, limit: pageSize } } }));
  }
}
