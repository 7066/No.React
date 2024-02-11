import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./mock"; // 请求拦截模拟接口 mockjs
import "assets/style"; // 基础样式

const el = document.getElementById("root") as Element;
const root = createRoot(el);

root.render(
  <React.StrictMode>
    <Suspense fallback={<div>loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
