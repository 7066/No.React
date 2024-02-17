export default [
  {
    meta: {
      code: "home",
      icon: "HomeOutlined",
    },
    path: "/home",
    Component: lazy(() => import("@/home/pages")),
  },
];
