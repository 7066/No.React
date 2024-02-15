import React from "react";
import "./style.scss";
export default function Tags() {
  const location = useLocation();
  const { metas } = useGlobalStore();
  const [tags, setTags] = useState({});
  const [key, setKey] = useState("");
  const { t } = useTranslation();

  const updateTags = (TAGS: any) => {
    localStorage.setItem("TAGS", JSON.stringify(TAGS));
  };

  useEffect(() => {
    const TAGS = JSON.parse(localStorage.getItem("TAGS") || "{}");
    const path = location.pathname;
    const key = "/" + path.split("/").at(1);

    if (key in metas) {
      setKey(key);
      setTags(() => {
        const _tags = {
          ...TAGS,
          ...tags,
          [key]: Object.assign({}, metas[key], { path }),
        };
        updateTags(_tags);
        return _tags;
      });
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
  const onClick = (tag: any) => {
    navigate(tag.path);
  };

  return (
    <Space className="tags-wrap" size={[0, 8]} wrap>
      {Object.keys(tags).map((_key) => {
        return (
          <Tag
            key={_key}
            closable
            color={key === _key ? "var(--tag-background-color)" : "default"}
            onClose={(e) => onClose(e, _key)}
            onClick={() => onClick((tags as any)[_key])}
          >
            {t((tags as any)[_key].code + ".code")}
          </Tag>
        );
      })}
    </Space>
  );
}
