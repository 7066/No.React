import React from "react";
export default [
  {
    meta: {
      code: "auto",
      icon: "",
    },
    path: "/login",
    Component: lazy(() => import("@/login/views")),
  },
];
