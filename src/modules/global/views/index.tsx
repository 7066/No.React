import React from "react";
import { Outlet } from "react-router-dom";
import "./index.scss";
import { load } from "utils/router";
export default function Global() {
  const location = useLocation();
  const [isSingle, setSingle] = useState(false);

  const _globale = useGlobalStore();
  useEffect(() => {
    if (location.pathname === "/login") {
      // TODO 删除部分 localStorage
      console.log(" 删除部分 localStorage");
    } else {
      if (!_globale.ins.size) {
        const _global = useGlobalStore();
        const MODE = localStorage.getItem("MODE");
        if (MODE) {
          _global.mode = MODE as "code" | "url";
        }
        const mode = _global.mode;

        console.log("重新获取路由");
        load(mode).then(() => {
          console.log("加载完毕");
        });
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/404") {
      setSingle(true);
    } else {
      setSingle(false);
    }
  }, [location.pathname]);

  return (
    <div className={["global-wrap", isSingle ? "single" : null].join(" ")}>
      <Outlet></Outlet>
    </div>
  );
}
