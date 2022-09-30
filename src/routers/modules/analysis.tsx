import React from "react";
import lazyLoad from "../utils/lazyLoad";
import { LayoutIndex } from "../constant";
import { RouteObject } from "../types";
// import Analysis from "@/pages/Analysis";

// 首页模块
const analysisRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/analysis",
				element: lazyLoad(React.lazy(() => import("@/pages/Analysis"))),
				// element: <Home />,
				meta: {
					requiresAuth: true,
					title: "智能分析",
					key: "analysis"
				}
			}
		]
	}
];

export default analysisRouter;
