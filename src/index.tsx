import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Theme from "./plugins/theme";
import Router from "./plugins/router";
import "./mock"; // 请求拦截模拟接口 mockjs
import "assets/style"; // 基础样式

function ANTDConfig(props: any) {
  const [theme] = useTheme();
  return (
    <ConfigProvider key={theme} theme={ANTD_THEME()}>
      {props.children}
    </ConfigProvider>
  );
}
const el = document.getElementById("root") as Element;

const root = createRoot(el);

root.render(
  // <React.StrictMode>
  <Theme>
    <Router />
  </Theme>
  //  </React.StrictMode>
  // <ANTDConfig>
  // <Suspense fallback={<div>loading...</div>}>
  //   <RouterProvider router={router} />
  // </Suspense>
  // </ANTDConfig>
  //  </React.StrictMode>
);
