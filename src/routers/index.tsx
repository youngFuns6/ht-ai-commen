import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { RouteObject } from './types';
import lazyLoad from "@/routers/utils/lazyLoad";

const metaRouters = import.meta.glob('./modules/*.tsx', { eager: true, });
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item] as Object).forEach((key: any) => {
		routerArray.push(...((metaRouters[item] as any)[key]));
	});
});

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/login' />
  },
  {
		path: "/login",
		element: lazyLoad(lazy(() => import("@/pages/Login"))),
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
  ...routerArray,
  {
		path: "*",
		element: <Navigate to="/404" />
	}
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
}

export default Router;
