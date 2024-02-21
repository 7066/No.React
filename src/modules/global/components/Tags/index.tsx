import React from "react";
import "./style.scss";
import * as ANTDIcons from "@ant-design/icons";
import { useMatches } from "react-router-dom";
export default function Tags() {
  const location = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();

  const [tags, setTags] = useState({});
  const [key, setKey] = useState("");
  const { t } = useTranslation();
  const routes = getRoutes();

  const updateTags = (data: any) => {
    sessionStorage.setItem("TAGS", JSON.stringify(data));
  };

  useEffect(() => {
    const TAGS = JSON.parse(sessionStorage.getItem("TAGS") || "{}");
    const url = location.pathname;
    const code = url.split("/").at(1);
    let config = {};
    if (code && code !== "404") {
      const path = "/" + code;
      const route: any = routes.filter((r) => r.path === path).at(0);

      if (route) {
        setKey(path);
        config = {
          [path]: Object.assign({}, route?.meta || {}, { url }),
        };
      }
    }

    setTags(() => {
      const data = Object.assign({}, TAGS, tags, config);
      updateTags(data);
      return data;
    });
  }, [location.pathname]);

  const onClose = (e: any, key: string) => {
    e.preventDefault();
    const keys = Object.keys(tags);
    const item = matches.at(1) as any;
    const T = Object.assign({}, tags) as any;

    if (key in tags) {
      if (keys.length > 1) {
        // 表示删除的是当前路由
        if (item.pathname === key) {
          // 删除
          delete T[key];
          // 获取当前剩余第一个页签
          const _t: any = Object.keys(tags).at(0);
          // 获取路由地址
          const path = T[_t].path;
          // 跳转路由
          navigate(path);
        } else {
          // 删除
          delete T[key];
        }
      }
      updateTags(T);
      setTags(T);
    }
  };
  const onClick = (url: string) => {
    if (url) navigate(url);
  };

  return (
    <Space className="tags-component" size={[0, 8]} wrap>
      {Object.keys(tags).map((_key) => {
        const { code = "", url = "", icon = "" } = (tags as any)[_key];
        const _icon =
          icon in ANTDIcons
            ? React.createElement((ANTDIcons as any)[icon])
            : "";
        return (
          <Tag
            key={_key}
            icon={_icon}
            closable
            color={key === _key ? "var(--tag-background-color)" : "default"}
            onClose={(e) => onClose(e, _key)}
            onClick={() => onClick(url)}
          >
            {t(code + ".code")}
          </Tag>
        );
      })}
    </Space>
  );
}
