import React from "react";
import { createRoot } from "react-dom/client";
import Theme from "./plugins/theme";
import Router from "./plugins/router";
import "./mock"; // 请求拦截模拟接口 mockjs
import "assets/style"; // 基础样式

const el = document.getElementById("root") as Element;

const root = createRoot(el);

root.render(
  <React.StrictMode>
    <Theme>
      <Router />
    </Theme>
  </React.StrictMode>
);
