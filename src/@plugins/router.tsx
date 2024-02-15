import React from "react";
import Global from "@/global/views/index";
import { Navigate } from "react-router-dom";
import { createHashRouter } from "react-router-dom";

/** @初始化白名单路由 */
const initWhitelist = () => {
  const modules = require.context("../modules", true, /route\.tsx$/);
  return modules
    .keys()
    .filter((url: string) => {
      const key = url.replace(/\.|\/|route|tsx/g, "");
      if (key === "global") return true;
      if (key === "login") return true;
      if (key === "lost") return true;
      return false;
    })
    .flatMap((url: string) => modules(url).default);
};
const children = initWhitelist();
children.unshift({
  path: "/",
  element: <Navigate to="/home" />,
});

/** @加载用户路由 */
export const LOAD_ROUTES = () => {
  let { mode, ins, menu, metas } = useGlobalStore();
  // 重置按钮权限
  ins.clear();

  // 重置metas信息
  Object.keys(metas).forEach((key) => {
    delete metas[key];
  });

  // 重置菜单
  menu.length = 0;

  // 重置加载方式
  const MODE = localStorage.getItem("MODE");
  if (MODE) {
    mode = MODE as "code" | "url";
  }

  const API = new Map([
    [
      /**
       * @前端路由 前端定义菜单目录 后端返回模块权限及其按钮权限
       * */
      "code",
      () =>
        request.get("/api/user/menu1").then((resp: any) => {
          // 收集按钮权限
          Object.keys(resp).forEach((key) => {
            ins.set(key, new Set(resp[key]));
          });
          // 获取路由表第一个
          const routes = (router.routes.at(0) as { children: Array<any> })
            .children;
          // 获取各模块路由表
          const modules = require.context("../modules", true, /route\.tsx$/);

          // 收集 meta
          const dm = (arr: any, parent: any) => {
            arr.forEach((rt: any) => {
              if (rt.children) {
                dm(rt.children, rt);
              } else {
                let key = rt.path;
                if (!rt.path) {
                  key = parent.path + "/";
                }
                metas[key] = rt.meta;
              }
            });
          };

          // 遍历动态添加路由
          modules.keys().forEach((url: string) => {
            const key = url.replace(/\.|\/|route|tsx/g, "");
            if (key in resp) {
              modules(url).default.forEach((rt: any) => {
                metas[rt.path] = rt.meta;
                if (rt.children) {
                  dm(rt.children, rt);
                }
                routes.unshift(rt);
              });
            }
          });

          /** @根据前端自定义目录和实际权限确定最终展示 */
          const dp = (arr: Array<any>): any => {
            return arr.filter((item: any) => {
              if (item.type === "menu") {
                item.children = dp(item.children);
                return item.children.length;
              } else {
                if ("/" + item.code in metas) {
                  item = Object.assign(item, metas["/" + item.code]);
                  return true;
                }
                return false;
              }
            });
          };

          // 设置菜单
          dp(M1MENU).forEach((el: any) => {
            menu.push(el);
          });

          return resp;
        }),
    ],
  ]);
  return (API.get(mode) as any)();
};

// 调用函数
const M1MENU = [
  {
    type: "module",
    code: "home",
  },
  {
    type: "menu",
    label: "自定义目录1",
    children: [
      {
        type: "menu",
        label: "无权限的模块不加载",
        children: [
          {
            type: "module",
            code: "example1",
          },
          {
            type: "module",
            code: "XXX",
          },
        ],
      },
      {
        type: "module",
        code: "example2",
      },
    ],
  },
  {
    type: "menu",
    label: "自定义目录9",
    children: [
      {
        code: "example4",
      },
    ],
  },
];

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
