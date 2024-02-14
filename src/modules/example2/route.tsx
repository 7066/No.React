import React from "react";
export default [
  {
    meta: {
      code: "example2",
      icon: "menu",
    },
    path: "/example2",
    Component: lazy(() => import("@/example2/views")),
    children: [
      {
        meta: {
          label: "红",
        },
        path: "",
        Component: lazy(() => import("@/example2/views/red")),
      },
      {
        meta: {
          label: "金",
        },
        path: "/example2/gold",
        Component: lazy(() => import("@/example2/views/gold")),
      },
      {
        meta: {
          label: "蓝",
        },
        path: "/example2/blue/:id",
        Component: lazy(() => import("@/example2/views/blue")),
      },
    ],
  },
];
