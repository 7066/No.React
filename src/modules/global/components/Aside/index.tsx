import React from "react";
import type { MenuProps } from "antd";
import "./style.scss";
import * as ANTDIcons from "@ant-design/icons";
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export default function Aside() {
  const [{ menu }] = useGlobalStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [key, setKey] = useState("");
  const [keyPath, setKeyPath] = useState([]);
  useEffect(() => {
    console.log(menu, "menu?");
    const data = JSON.parse(localStorage.getItem("MENU") || "{}");
    const code = location.pathname.split("/").pop() || "";
    if (code in data) {
      const config = data[code];
      if (config.key) setKey(config.key);
      if (config.keyPath) setKeyPath(config.keyPath);
    }
  }, [location.pathname]);

  const onClick = (item: any) => {
    if (item.key) {
      const code = item.key.split("_").at(0);
      if (code) {
        const config = JSON.parse(localStorage.getItem("MENU") || "{}");
        Object.assign(config, {
          [code]: {
            key: item.key,
            keyPath: item.keyPath,
          },
        });
        localStorage.setItem("MENU", JSON.stringify(config));
        navigate("/" + code);
      }
    }
  };

  let count = 0;
  const _getItem = (arr: any) =>
    arr.map((item: any) => {
      if (item.type === "menu") {
        const { label = "", icon = "", children = [] } = item || {};
        const _icon =
          icon in ANTDIcons
            ? React.createElement((ANTDIcons as any)[icon])
            : "";
        return getItem(label, count++, _icon, _getItem(children));
      } else {
        const { code = "", icon = "" } = item.meta || {};
        const _icon =
          icon in ANTDIcons
            ? React.createElement((ANTDIcons as any)[icon])
            : "";
        return getItem(t(code + ".code"), code + "_" + count++, _icon);
      }
    });

  return (
    <div className="aside-component ignore">
      {
        <Menu
          key={key}
          onClick={onClick}
          style={{ width: 256 }}
          defaultOpenKeys={keyPath}
          defaultSelectedKeys={[key]}
          mode="inline"
          items={_getItem(menu)}
        />
      }
    </div>
  );
}
