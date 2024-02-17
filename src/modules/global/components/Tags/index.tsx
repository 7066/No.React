import React from "react";
import "./style.scss";
import * as ANTDIcons from "@ant-design/icons";
export default function Tags() {
  const location = useLocation();
  const [tags, setTags] = useState({});
  const [key, setKey] = useState("");
  const { t } = useTranslation();
  const routes = getRoutes();

  const updateTags = (TAGS: any) => {
    localStorage.setItem("TAGS", JSON.stringify(TAGS));
  };

  useEffect(() => {
    const TAGS = JSON.parse(localStorage.getItem("TAGS") || "{}");
    const path = location.pathname;
    const key = "/" + path.split("/").at(1);
    if (key !== "/") {
      const route: any = routes.filter((r) => r.path === key).at(0);
      if (route) {
        setKey(key);
        setTags(() => {
          const _tags = {
            ...TAGS,
            ...tags,
            [key]: Object.assign({}, route?.meta || {}, { path }),
          };
          updateTags(_tags);
          return _tags;
        });
      }
    }
  }, [location.pathname]);

  const onClose = (e: any, key: string) => {
    e.preventDefault();
    const T = Object.assign({}, tags) as any;
    delete T[key];
    updateTags(T);
    setTags(T);
  };
  const navigate = useNavigate();
  const onClick = (path: string) => {
    if (path) navigate(path);
  };

  return (
    <Space className="tags-component" size={[0, 8]} wrap>
      {Object.keys(tags).map((_key) => {
        const { code = "", path = "", icon = "" } = (tags as any)[_key];
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
            onClick={() => onClick(path)}
          >
            {t(code + ".code")}
          </Tag>
        );
      })}
    </Space>
  );
}
