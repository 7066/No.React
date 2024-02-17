export default [
  {
    meta: {
      code: "example2",
      icon: "RocketOutlined",
    },
    path: "/example2",
    Component: lazy(() => import("@/example2/pages")),
    children: [
      {
        meta: {
          label: "红",
        },
        path: "",
        Component: lazy(() => import("@/example2/pages/red")),
      },
      {
        meta: {
          label: "金",
        },
        path: "/example2/gold",
        Component: lazy(() => import("@/example2/pages/gold")),
      },
      {
        meta: {
          label: "蓝",
        },
        path: "/example2/blue/:id",
        Component: lazy(() => import("@/example2/pages/blue")),
      },
    ],
  },
];
