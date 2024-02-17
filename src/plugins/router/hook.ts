import M1MENU from "constant/menu.json";
/** @初始化白名单路由 */
export const initWhitelist = () => {
  const modules = require.context("../../modules", true, /route\.ts$/);
  return modules
    .keys()
    .filter((url: string) => {
      const key = url.replace(/\.|\/|route|ts/g, "");
      if (key === "global") return true;
      if (key === "login") return true;
      if (key === "lost") return true;
      return false;
    })
    .flatMap((url: string) => modules(url).default);
};

/** @前端路由 静态匹配 - 前端定义菜单目录 后端返回模块权限及其按钮权限 */
export const staticMatch = () =>
  request.get("/api/user/menu1").then((resp: any) => {
    // 路由 id
    let id = 0;
    // 按钮权限
    const ins = new Map();
    // 获取路由
    const routes = getRoutes();
    // 直接读取各模块路由表
    const modules = require.context("../../modules", true, /route\.ts$/);
    // 根据模块名称组成 module: fileUrl 格式
    const keys = modules
      .keys()
      .map((url) => [url.replace(/\.|\/|route|ts/g, ""), url])
      .reduce((result: any, [key, url]) => {
        result[key] = url;
        return result;
      }, {});

    // 递归遍历前端菜单
    const dp = (arr: Array<any>, justId = false): any => {
      return arr.filter((item: any) => {
        // 给子路由添加 id
        if (justId) {
          Object.assign(item, {
            id: `${++id}`,
            children: dp(item.children || [], true),
          });
          return true;
        }

        // 菜单继续遍历, 根据 children 长度决定是否显示
        if (item.type === "menu") {
          item.children = dp(item.children || []);
          return item.children.length;
        }

        if (item.type === "module") {
          // 判断模块是否有权限
          if (item.code in resp) {
            // 判断模块是否真实存在
            if (item.code in keys) {
              // 收集按钮权限
              ins.set(item.code, new Set(resp[item.code]));
              // 获取模块对应的文件路径
              const url = keys[item.code];
              // 读取模块的路由配置信息
              modules(url).default.forEach((route: any) => {
                // 补充菜单中的 meta
                Object.assign(item, {
                  meta: route.meta,
                });

                // 设置路由信息
                const config = Object.assign(route, {
                  id: `${++id}`,
                  children: dp(route.children || [], true),
                });
                // 添加路由
                routes.unshift(config);
              });
              return true;
            }
          }
        }
        return false;
      });
    };
    // 遍历前端菜单
    const menu = dp(M1MENU);
    return { ins, menu };
  });

/** @前端路由 动态加载 - 前端定义菜单目录 后端返回模块权限及其按钮权限 */
export const dynamicLoad = () =>
  request.get("/api/user/menu2").then((resp: any) => {
    // 路由 id
    let id = 0;
    // 按钮权限
    const ins = new Map();
    // 获取路由
    const routes = getRoutes();
    // 异步加载模块下的 tsx 文件
    const modules = require.context("../../modules", true, /.tsx$/, "lazy");
    // 遍历获取 pages 下的 tsx 文件
    const keys = modules
      .keys()
      .filter((key) => key.includes("pages"))
      .reduce((result: any, el) => {
        result[el] = true;
        return result;
      }, {});

    // 递归遍历后端菜单
    const dp = (arr: any, addRoute = true) => {
      return arr.filter((item: any) => {
        // 菜单继续遍历, 根据 children 长度决定是否显示
        if (item.type === "menu") {
          item.children = dp(item.children || []);
          return item.children.length;
        }

        if (item.type === "module") {
          // 后端模块文件对应的真实地址
          const url = `./${item.component}.tsx`;
          // 判断模块是否真实存在
          if (url in keys) {
            // * 单模块放置在不同目录下
            // 如果模块存在, 标记为 false, 再次遇到时则无需加载路由
            if (keys[url]) {
              keys[url] = false;
            } else {
              addRoute = false;
            }

            // 设置按钮权限
            const { code = "", operate = [] } = item.meta || {};
            if (code && operate.length) {
              ins.set(code, new Set(operate));
            }

            // 设置路由信息
            const config = Object.assign(item, {
              children: dp(item.children || [], false), // 子路由无需单独添加
              Component: lazy(() => modules(url)),
              id: `${id++}`,
            });
            // 添加路由
            if (addRoute) {
              routes.unshift(config);
            }
            return true;
          }
          return false;
        }
      });
    };
    // 遍历后端菜单
    const menu = dp(resp);
    return { ins, menu };
  });
