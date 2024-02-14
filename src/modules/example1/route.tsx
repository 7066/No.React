import React from "react";
export default [
  {
    meta: {
      code: "example1",
      icon: "menu",
    },
    path: "/example1",
    Component: lazy(() => import("@/example1/views")),
  },
];
