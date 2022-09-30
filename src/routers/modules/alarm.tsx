import React, {  } from "react";
import {  } from 'react-dom';
import lazyLoad from "../utils/lazyLoad";
import { LayoutIndex } from "../constant";
import { RouteObject } from "../types";
// import Home from "@/pages/Preview";

// 首页模块
const alrmRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/alarm",
				element: lazyLoad(React.lazy(() => import("@/pages/Alarm"))),
				// element: <Home />,
				meta: {
					requiresAuth: true,
					title: "报警查询",
					key: "alarm"
				}
			}
		]
	}
];

export default alrmRouter;
