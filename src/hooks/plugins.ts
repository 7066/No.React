// axios 相关
export { request } from "../plugins/request";
// i18n 相关
export { useTranslation, useLocale } from "../plugins/locale";
// 路由 相关
export { getRoutes } from "../plugins/router";
// 加载路由的两种模式
export { staticMatch, dynamicLoad } from "../plugins/router/hook";
// 主题 相关
export { useThemeList, useTheme } from "../plugins/theme/hook";
// 进度条
export { default as NProgress } from "nprogress";
import "nprogress/nprogress.css";
