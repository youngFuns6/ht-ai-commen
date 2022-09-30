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
				}
			}
		]
	}
];

export default appRouter;
