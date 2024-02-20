## 简介

> 基于 `Webpack` 搭建的 `React` `TypeScript` `Ant Design` `Valtio` 项目

`node: 18.19.0` `webpack: ^5.90.1` `react: ^18.2.0` `valtio: ^1.13.1` `antd: ^5.14.0`

## 开始

```bash
# 按照依赖
yarn

# 运行项目
yarn dev

# 打包项目
yarn build

# 启动交互 - 添加模块、添加公共组件、提交 Commit 信息
yarn p
```

## 目录结构

> 项目目录结构简述

```text
├─public
    ├─iconfont 图标库的存放位置
    └─themes   主题变量文件的存放位置, 文件命名要保持风格一致, 与 Ant Design 无关, 已实现懒加载
├─src
    ├─assets         资源, 已配置路径别名 `assets`, 可放置全局图片和样式
    ├─components     组件, 已配置路径别名 `#`,
    ├─constant       常量, 已配置路径别名 `constant`, 可放置全局图片和样式
    │    antd-components.js  组件名称数据, 已实现 Ant Design 动态导入组件
    │    antd-icons.js       图标名称数据, 已实现 @ant-design/icons 动态导入图标
    │    antd-theme.js       主题变量数据, 已实现 Ant Design 动态更改主题
    │    menu.json           前端菜单数据, 当 加载路由 采用前端匹配时使用
    │    ...
    ├─hooks          方法, 已配置自动导入, 可放置项目常用的函数
    │    plugins.ts       导出 plugins 文件内集成好的方法
    │    isAllowed.ts     模块按钮鉴权
    │    ...
    ├─modules        模块, 已配置路径别名 `@`
    │    ...
    ├─plugins        插件, 处理后的插件
    │    ...
    │    router  路由组件集成
    │    theme   主题换肤功能组件集成
    │    locale  国际化 i18next 处理
    │    request 请求 axios 二次封装
    │    ...
    ├─utils          工具, 已配置路径别名 `utils`

```

##### Hooks

> 以下函数均配置自动导入

```text
├─hooks
    │   request         封装 Axios 后的实例, 建议在模块下的 service.ts 中使用
    │   useLocale       获取当前语言, 通过方法可切换语言, 语言文件已实现懒加载
    │   useTranslation  仅导出插件 react-i18next 内置的函数
    │   getRoutes       获取路由表, 用来获取当前路由 meta 或者 动态添加路由, 已实现 `前端路由匹配` 和 `后端路由懒加载`
    │   useTheme        获取当前主题, 可更改; 支持懒加载主题, 动态改变 Ant Design 主题
    │   useThemeList    获取主题列表
    │   staticMatch     前端静态匹配加载路由
    │   dynamicLoad     后端动态加载路由
    │   isAllowed       获取当前模块的按钮权限
```

##### Modules

> 模块命名应与接口保持一致, 可通过 `yarn p` 自动生成模版

```text
├─login
    ├─components   页面 pages 中涉及的组件存放位置, 避免后端路由加载匹配时提取的 tsx 过多, 可通过 @/[module]/components 使用
    │    XComponent
    │       - index.tsx
    │       - style.scss 样式文件, 组件根标签类名应采 [component]-component 格式, 且样式包裹在 [module]-wrap 下, 避免样式冲突
    │    ...
    ├─images   图片资源
    ├─locales  翻译文件, 支持懒加载
    │    en.json
    │    zh.json
    ├─pages
    │     - index.tsx    主页面
    │     - style.scss   样式文件, 页面根标签的类名应采用 [module]-wrap 格式, 避免样式冲突
    │     - page1.tsx    子路由页面
    │    ...
    ├─route.ts      路由信息, 可自定义 meta 信息如 code、icon、label 等, 当 加载路由 采用前端匹配时使用
    ├─service.ts    接口存放位置, 可通过路径别名 `@/[module]/service` (跨模块)使用
    ├─store.ts      模块的状态管理, 已配置自动导入
```

##### route

> 模块内的路由信息表, 用于前端静态匹配时使用

```javascript
export default [
  {
    meta: {
      code: "S001",      // 权限码
      icon: "example",   // 图标
    },
    path: "/example",
    Component: lazy(() => import("@/[module]/pages")),  // 采用 Component lazy 的方式懒加载组件
    children: [
      {
        meta: {
          label: "日志",  // 子路由标题, 用于导航展示, 如有需要也可以做成国际化
        },
        path: "",
        Component: lazy(() => import("@/[module]/pages/page1.tsx"))
      },
      ...
    ],
  },
];
```

## 代码规范

`husky` `commitlint` `lint-staged` `ESLint` `Prettier` `stylelint`

TODO `icon图标优化` `开发环境优化`
