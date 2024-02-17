import React from "react";
import "./style.scss";
import Header from "../components/Header";
import Aside from "../components/Aside";
import Tags from "../components/Tags";
import Breadcrumbs from "../components/Breadcrumbs";
export default function Global() {
  const location = useLocation();
  const navigate = useNavigate();
  const [{ ins }, _global] = useGlobalStore();

  useEffect(() => {
    // 保存上次路由地址
    if (location.pathname !== "/404" && location.pathname !== "/") {
      localStorage.setItem("PATH", location.pathname);
    }

    if (location.pathname !== "/login") {
      const TOKEN = localStorage.getItem("TOKEN");
      if (TOKEN) {
        if (!ins.size) {
          const MODE = localStorage.getItem("MODE");
          if (MODE) {
            _global.mode = MODE as "code" | "url";
          }

          let FN;
          if (_global.mode === "code") {
            FN = staticMatch;
          } else {
            FN = dynamicLoad;
          }
          FN().then((resp) => {
            _global.ins = resp.ins;
            _global.menu = resp.menu;
            // TODO 重定向会404闪烁
            const path = localStorage.getItem("PATH") || "";
            navigate(path === "/login" ? "/" : path, {
              replace: true,
            });
          });
        }
      } else {
        message.error({
          content: "登录状态失效, 即将退出登录!",
        });
        setTimeout(() => {
          window.location.href = window.location.origin + "/#/login";
        }, 1000);
      }
    }
  }, [location.pathname]);

  const [single, setSingle] = useState(false);
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/404") {
      if (!single) setSingle(true);
    } else {
      if (single) setSingle(false);
    }
  }, [location.pathname]);

  return (
    <div className={["global-wrap", single ? "single" : "container"].join(" ")}>
      {single ? (
        <Outlet></Outlet>
      ) : (
        <>
          {/* 内容布局 */}
          {/* 头部 */}
          <Header />
          <div className="content-wrap">
            {/* 侧边栏 */}
            <Aside />
            <div className="main">
              {/* 页签  */}
              <Tags />
              <div className="module-wrap">
                {/* 面包屑导航 */}
                <Breadcrumbs />
                <Outlet />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
