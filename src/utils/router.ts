/** @加载白名单 */
export const initWhitelist = () => {
  const modules = require.context("../modules", true, /route\.tsx$/);
  return modules
    .keys()
    .filter((url: string) => {
      const key = url.replace(/\.|\/|route|tsx/g, "");
      if (key === "global") return true;
      if (key === "login") return true;
      if (key === "lost") return true;
      if (key === "home") return true;
      return false;
    })
    .flatMap((url: string) => modules(url).default);
};

/** @加载用户路由 */
export const load = (mode) => {
  console.log("cao");

  const API = new Map([
    [
      /**
       * @前端路由 前端定义菜单目录 后端返回模块权限及其按钮权限
       * */
      "code",
      () =>
        request.get("/api/user/menu1").then((resp: any) => {
          console.log(resp, "router?", router);
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
        label: "自定义目录2, 无权限的模块不加载",
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
        code: "example1",
      },
    ],
  },
];
