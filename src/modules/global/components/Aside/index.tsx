import React from "react";
import type { MenuProps } from "antd";
import "./style.scss";
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
  const { menu } = useGlobalStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [key, setKey] = useState("");
  useEffect(() => {
    const _key = location.pathname.replace("/", "");
    // TODO 菜单高亮不展开
    setKey(_key);
  }, [location.pathname]);

  const onClick = (item: MenuItem) => {
    if (item) {
      navigate("/" + item.key);
    }
  };

  const _random = () =>
    Math.floor(Math.random() * (1000 - 100 + 1) + 100) +
    "" +
    Math.floor(Math.random() * (1000 - 100 + 1) + 100);
  const _getItem = (arr: any) =>
    arr.map((item: any) => {
      return getItem(
        item.label || item.code,
        item.code || _random(),
        item.icons || "",
        item.children ? _getItem(item.children) : ""
      );
    });

  return (
    <div className="aside-wrap ignore">
      {
        <Menu
          key={key}
          onClick={onClick}
          style={{ width: 256 }}
          defaultOpenKeys={[key]}
          defaultSelectedKeys={[key]}
          mode="inline"
          items={_getItem(menu)}
        />
      }
    </div>
  );
}
