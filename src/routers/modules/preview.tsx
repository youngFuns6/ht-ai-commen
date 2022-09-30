import React from "react";
import lazyLoad from "../utils/lazyLoad";
import { LayoutIndex } from "../constant";
import { RouteObject } from "../types";
// import Home from "@/pages/Preview";

// 首页模块
const homeRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/preview",
				element: lazyLoad(React.lazy(() => import("@/pages/Preview"))),
				// element: <Home />,
				meta: {
					requiresAuth: true,
					title: "实时预览",
					key: "preview"
				}
			}
		]
	}
];

export default homeRouter;
