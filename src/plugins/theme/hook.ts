import { useSnapshot, proxy, subscribe } from "valtio";
// ANTD 主题动态数据, 需与项目 CSS Var 保持一致
import * as ANTD from "constant/antd-theme.js";
const THEME = proxy({
  target: "" /**         */ /** 当前主题 */,
  list: new Set() /**    */ /** 当前系统支持的主题列表, 由接口获取, 文件可放置在 public/_themes, 采用异步加载 */,
  loaded: new Set() /**  */ /** 缓存当前页面已加载过的主题, 防止重复加载 */,
});
let _code = 0; /**       */ /** 仅用于处理文件内逻辑判断 改变的来源 0 用户操作, 1 初始化, -1 监听函数 */

/** @watch 监听变化 加载主题文件 */
subscribe(THEME, ([[, [key]]]) => {
  if (key === "target") {
    if (THEME.list.has(THEME.target)) {
      LOAD_THEME(THEME.target);
    } else message.warning("该主题暂未实现");
  }
});

/** @hooks 获取主题, 可更改 */
export const useTheme = (): [string, (v: string) => void] => {
  const { target } = useSnapshot(THEME);
  return [
    target,
    (v: string) => {
      THEME.target = v;
    },
  ];
};

/** @hooks 获取主题列表, 可选 */
export const useThemeList = () => {
  const { list } = useSnapshot(THEME);
  return [list, () => {}];
};

/** @ANTD主题 */
export const ANTD_THEME = () =>
  THEME.target ? (ANTD as any)[THEME.target] : {};

/** @初始化 设置变量, 添加监听, 加载文件 */
(() => {
  // 获取当前系统是否是暗色主题
  const _dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // 接口请求
  return request.get("/api/themes").then((_data: any) => {
    _data.forEach((_a: any) => {
      // 添加主题列表
      THEME.list.add(_a);
    });

    // 获取用户持久化设置
    const local = localStorage.getItem("THEME");
    _code = 1; // 标记初始化触发

    // 当用户首次登录, 或跟随系统主题时
    if (!local || local === "auto") {
      // 首次登录, 跟随系统主题
      if (!local) localStorage.setItem("THEME", "auto");
      // 跟随系统设置 深色 主题
      if (_dark) THEME.target = "dark";
      // 跟随系统设置 亮色 主题
      else THEME.target = "light";
    } else {
      // 用户已经选择了主题时
      THEME.target = local;
    }
  });
})();

/** @加载文件 */
function LOAD_THEME(_: string) {
  /** @如果文件已加载 更新主题样式 */
  if (THEME.loaded.has(_)) return UPDATE_THEME(_);

  /** @如果文件未加载 */

  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = "/public/themes/" + _ + "_variable.css";
  // link.href = import.meta.env.BASE_URL + "_themes/" + _ + "_variable.css";
  document.head.appendChild(link);
  // 标记该主题已加载
  THEME.loaded.add(_);
  // 更新主题样式
  UPDATE_THEME(_);
}

/** @更新主题设置监听 */
function UPDATE_THEME(_: any) {
  document.documentElement.className = _;

  // 获取当前系统是否是暗色主题
  const _system = window.matchMedia("(prefers-color-scheme: dark)");
  const _dark = _system.matches;

  // 获取当前的主题存储 local
  const local = localStorage.getItem("THEME");
  if ((_dark && _ === "dark") || (!_dark && _ === "light")) {
    // A: 本地持久化的主题与当前系统主题一致 在初始化时有两种情况
    // A-1: 初始化时, local 就是 auto, 表示与系统一致 - 监听系统主题变化
    // A-2: 初始化时, local 不是 auto, 恰好与系统一致 - 不监听系统主题变化
    if (_code === 1 && local === "auto") {
      _system.addEventListener("change", LISTEN_THEME);
    }
    // B: 本地持久化的主题与当前系统主题一致 在改变时有两种情况
    // B-1: 监听触发, 不改变本地持久化的主题, 且无需重复设置监听
    // B-2: 用户触发, 设置本地持久化的主题与系统一致, 且设置监听
    if (_code === 0) {
      localStorage.setItem("THEME", "auto");
      _system.addEventListener("change", LISTEN_THEME);
    }
  } else {
    // C: 本地持久化的主题与当前系统主题不一致
    // C-1: 设置本地持久化
    // C-2: 当触发时, 本地持久化为跟随系统时, 需要移除监听事件
    localStorage.setItem("THEME", _);
    if (local === "auto") {
      _system.removeEventListener("change", LISTEN_THEME);
    }
  }
  // 重置触发标记为用户触发
  _code = 0;
}

/** @系统主题监听 */
function LISTEN_THEME(event: any) {
  // 标记监听触发
  _code = -1;
  if (event.matches) {
    THEME.target = "dark";
  } else {
    THEME.target = "light";
  }
}
