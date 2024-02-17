import React, { Suspense } from "react";
import { Navigate, createHashRouter, RouterProvider } from "react-router-dom";
import { initWhitelist } from "./hook";
const Global = lazy(() => import("@/global/pages"));

const children = initWhitelist();
children.unshift({
  path: "/",
  element: <Navigate to="/home" />,
});

// 生成路由
const router = createHashRouter([
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

export default function Router() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export const getRoutes = () => router.routes.at(0)?.children || [];
