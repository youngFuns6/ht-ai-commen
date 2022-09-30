import React from "react";
import lazyLoad from "../utils/lazyLoad";
import { LayoutIndex } from "../constant";
import { RouteObject } from "../types";
// import Home from "@/pages/Preview";

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
				}
			}
		]
	}
];

export default settingRouter;
