import { useInfiniteQuery, QueryFunctionContext } from 'react-query';
import { LIMIT } from '@/config/constance';

interface Params {
  page: number;
  limit: number;
}

type Fn<T> = (params: T & Params) => void;

export default function<T> (key: any, fn: Fn<T>, params: T, enabled=true) {
  return useInfiniteQuery(key, fetchFn, {
    getNextPageParam: (lastPage: any, pages) => {
      if (lastPage.offset + LIMIT <= lastPage.total) {
        return lastPage.offset / lastPage.limit + 2
      }
    },
    enabled
  });

  function fetchFn(key: QueryFunctionContext) {
    const { pageParam = 1 } = key;
  
    return fn({
      page: pageParam,
      limit: LIMIT,
      ...params,
    });
  }
}
