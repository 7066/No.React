export default [
  {
    meta: {
      code: "example1",
      icon: "DeploymentUnitOutlined",
    },
    path: "/example1",
    Component: lazy(() => import("@/example1/pages")),
  },
];
