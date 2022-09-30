import React from "react";
import lazyLoad from "../utils/lazyLoad";
import { LayoutIndex } from "../constant";
import { RouteObject } from "../types";
// import Home from "@/pages/Preview";

// 首页模块
const calcRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/calc",
				element: lazyLoad(React.lazy(() => import("@/pages/Calc"))),
				// element: <Home />,
				meta: {
					requiresAuth: true,
					title: "数据统计",
					key: "calc"
				}
			}
		]
	}
];

export default calcRouter;
