import React from "react";
export default [
  {
    path: "/example1",
    Component: lazy(() => import("@/example1/views")),
  },
];
