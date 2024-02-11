import React from "react";
import Global from "@/global/views/index";
import { Navigate } from "react-router-dom";
import { initWhitelist } from "utils/router";
import { createHashRouter } from "react-router-dom";

/** @初始化白名单路由 */
const children = initWhitelist();

// 添加自定义跳转
children.unshift({
  path: "/",
  element: <Navigate to="/home" />,
});
// 生成路由
export default createHashRouter([
  {
    path: "/",
    element: <Global />,
    children,
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
]);
