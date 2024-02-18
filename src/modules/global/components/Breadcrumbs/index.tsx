import React from "react";
export default function Breadcrumbs() {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const routes = getRoutes();
  const { t } = useTranslation();
  useEffect(() => {
    if (location.pathname === "/404" || location.pathname === "/") {
      setItems([]);
    } else {
      const matchs = location.pathname.split("/").filter((key) => key);

      const result: any = [];
      const dp = (target: any, matchs: any, result: any, flat = 0) => {
        const key = matchs.at(flat);

        if (key) {
          const _result: any = target
            .filter((r: any) => {
              const path = r.path.split("/").filter((k: any) => k);
              if (path.includes(":")) {
                return true;
              }
              return path.at(flat) === key;
            })
            .at(0);
          if (_result) {
            result.push(_result);
          }
          dp(_result?.children || [], matchs, result, flat + 1);
        } else {
          if (flat === matchs.length && target.length) {
            const _result = target.filter((r: any) => r.path === "").at(0);
            result.push(_result);
          }
        }
      };
      dp(routes, matchs, result);
      setItems(result);
    }
  }, [location.pathname]);

  return (
    <Breadcrumb
      className="breadcrumb-component"
      items={items.map((v: any) => {
        return {
          title: v?.meta.code ? t(v.meta.code + ".code") : v.meta.label,
        };
      })}
    />
  );
}
