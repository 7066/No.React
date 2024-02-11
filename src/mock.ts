// mockjs拦截代码
import Mock from "mockjs";

// 用户信息
Mock.mock("/api/user/info", "get", () => {
  return {
    data: {
      name: Mock.Random.csentence(2),
      region: Mock.mock("@region"),
    },
    code: 200,
    message: "success",
  };
});

// 支持的主题
Mock.mock("/api/themes", "get", () => {
  return {
    data: ["light", "dark", "crazy"],
    code: 200,
    message: "success",
  };
});

// 前端路由 后端返回格式
interface M1 {
  [key: string]: Array<"edit" | "export">;
}
const M1JSON: M1 = {
  home: ["edit", "export"],
  example1: ["edit"],
  example2: ["export"],
};
Mock.mock("/api/user/menu1", "get", () => {
  return {
    data: M1JSON,
    code: 200,
    message: "success",
  };
});

/**
 * @为什么保留 code
 * 按钮权限放在 meta 里完全可以实现模块内的按钮鉴权
 * 但是 code 保留, 一方面是为了应对跨模块鉴权, 类似于 A 模块 跳转 B 模块编辑, 要确定 B 模块是否拥有编辑权限等
 * 另一方面也是国际化相关
 *
 * @为什么加 type
 * 一方面方便判断, 另一方面可能有多种目录 如外部链接, 内部内嵌链接等
 *
 * @ps
 * 因为后端路由时要要统计 views 下所有 .vue 文件, 所以建议 views 下只放页面文件, 相关的零散组件 放在 moduleName/compoinents 下
 * 通过 @/moduleName/components 引用
 *
 * @path
 * 后端路由需注意 子路由 要带上父级路由前缀
 */
// 后端路由返回数据
const M2JSON = [
  {
    label: "加载不出来的目录",
    type: "menu",
    children: [
      {
        // 比如开发人员动态添加了路由, 但是文件代码 并没有合并主分支
        // 其他开发人员不受影响
        type: "module",
        meta: {
          icon: "menu",
          code: "home2",
          operate: ["edit", "export"],
        },
        path: "/home2",
        component: "home2/views/index",
      },
    ],
  },
  {
    label: "没有相关文件的路由不会加载",
    type: "menu",
    children: [
      {
        type: "module",
        meta: {
          icon: "menu",
          code: "home",
          operate: ["edit", "export"],
        },
        path: "/home",
        component: "home/views/index",
      },
      {
        // 比如开发人员动态添加了路由, 但是文件代码 并没有合并主分支
        // 其他开发人员不受影响
        type: "module",
        meta: {
          icon: "menu",
          code: "home2",
          operate: ["edit", "export"],
        },
        path: "/home2",
        component: "home2/views/index",
      },
    ],
  },
  {
    label: "自定义目录A",
    type: "menu",
    children: [
      {
        type: "module",
        meta: {
          icon: "menu",
          code: "home",
          operate: ["edit", "export"],
        },
        path: "/home",
        component: "home/views/index",
      },
    ],
  },
  {
    type: "module",
    meta: {
      icon: "menu",
      code: "example1",
      operate: ["export"],
    },
    path: "/example1",
    component: "example1/views/index",
  },
  {
    label: "自定义目录B",
    type: "menu",
    children: [
      {
        type: "module",
        meta: {
          icon: "menu",
          code: "example2",
          operate: ["edit"],
        },
        path: "/example2",
        component: "example2/views/index",
        children: [
          {
            type: "module",
            meta: {
              label: "红桃",
            },
            path: "/",
            component: "example2/views/red",
          },
          {
            type: "module",
            meta: {
              label: "金桃",
            },
            path: "/example2/gold",
            component: "example2/views/gold",
          },
          {
            type: "module",
            meta: {
              label: "蓝桃",
            },
            path: "/example2/blue",
            component: "example2/views/blue",
          },
        ],
      },
    ],
  },
];
Mock.mock("/api/user/menu2", "get", () => {
  return {
    data: M2JSON,
    code: 200,
    message: "success",
  };
});
