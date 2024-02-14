export default [
  {
    meta: {
      code: "home",
      icon: "menu",
    },
    path: "/home",
    Component: lazy(() => import("@/home/views")),
  },
];
