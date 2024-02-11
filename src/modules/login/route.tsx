import React from "react";
export default [
  {
    path: "/login",
    Component: lazy(() => import("@/login/views")),
  },
];
