import React from "react";
import lazyLoad from "../utils/lazyLoad";
import { LayoutIndex } from "../constant";
import { RouteObject } from "../types";
// import Home from "@/pages/Preview";

// 首页模块
const appRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/app",
				element: lazyLoad(React.lazy(() => import("@/pages/App"))),
				// element: <Home />,
				meta: {
					requiresAuth: true,
					title: "智能应用",
					key: "app"
				},
				children: [
					{
						index: true,
						element: lazyLoad(React.lazy(() => import('@/pages/App/Plan'))),
						meta: {
							requiresAuth: true,
							title: '巡检计划',
							key: 'home/app/plan'
						}
					},
					{
						path: '/home/app/result',
						element: lazyLoad(React.lazy(() => import('@/pages/App/Result'))),
						meta: {
							requiresAuth: true,
							title: '巡检结果',
							key: 'home/app/result'
						}
					},
					{
						path: '/home/app/calcCoal',
						element: lazyLoad(React.lazy(() => import('@/pages/App/CalcCoal'))),
						meta: {
							requiresAuth: true,
							title: '煤量检测',
							key: 'home/app/calcCoal'
						}
					}
				]
			}
		]
	}
];

export default appRouter;
