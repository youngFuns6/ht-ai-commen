import React from "react";
import lazyLoad from "../utils/lazyLoad";
import { LayoutIndex } from "../constant";
import { RouteObject } from "../types";

// 首页模块
const settingRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/setting",
				element: lazyLoad(React.lazy(() => import("@/pages/Setting"))),
				// element: <Home />,
				meta: {
					requiresAuth: true,
					title: "系统设置",
					key: "setting"
				},
				children: [
					{
						index: true,
						element: lazyLoad(React.lazy(() => import("@/pages/Setting/Chn"))),
						// element: <Home />,
						meta: {
							requiresAuth: true,
							title: "通道管理",
							key: "setting/chn"
						}
					},
					{
						path: '/home/setting/region',
						element: lazyLoad(React.lazy(() => import("@/pages/Setting/Region"))),
						// element: <Home />,
						meta: {
							requiresAuth: true,
							title: "区域管理",
							key: "setting/region"
						}
					},
					{
						path: '/home/setting/user',
						element: lazyLoad(React.lazy(() => import("@/pages/Setting/User"))),
						// element: <Home />,
						meta: {
							requiresAuth: true,
							title: "用户管理",
							key: "setting/user"
						}
					},
					{
						path: '/home/setting/sys',
						element: lazyLoad(React.lazy(() => import("@/pages/Setting/Sys"))),
						// element: <Home />,
						meta: {
							requiresAuth: true,
							title: "系统配置",
							key: "setting/sys"
						}
					},
					{
						path: '/home/setting/algo',
						element: lazyLoad(React.lazy(() => import("@/pages/Setting/Algo"))),
						// element: <Home />,
						meta: {
							requiresAuth: true,
							title: "算法配置",
							key: "setting/algo"
						}
					},
					{
						path: '/home/setting/seriaNet',
						element: lazyLoad(React.lazy(() => import("@/pages/Setting/SeriaNet"))),
						// element: <Home />,
						meta: {
							requiresAuth: true,
							title: "透传配置",
							key: "setting/seriaNet"
						}
					}
				]
			}
		]
	}
];

export default settingRouter;
