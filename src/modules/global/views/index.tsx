import React from "react";
import "./index.scss";
import { load } from "utils/router";
import Header from "../components/Header";
import Aside from "../components/Aside";
import Tags from "../components/Tags";
import Breadcrumbs from "../components/Breadcrumbs";
export default function Global() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ins } = useGlobalStore(true);

  useEffect(() => {
    // 保存上次路由地址
    if (location.pathname !== "/404") {
      localStorage.setItem("PATH", location.pathname);
    }

    if (location.pathname === "/login") {
      // TODO 删除部分 localStorage
      console.log(" 删除部分 localStorage");
    } else {
      if (!ins.size) {
        load().then(() => {
          // TODO 重定向会404闪烁
          const path = localStorage.getItem("PATH") || "";
          navigate(path === "/login" ? "/" : path, {
            replace: true,
          });
        });
      }
    }
  }, [location.pathname]);

  const [single, setSingle] = useState(false);
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/404") {
      setSingle(true);
    } else {
      setSingle(false);
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
                {/* <router-view class="module"></router-view> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
