import React from "react";
import { useMatches } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const match = useMatches();
  const { metas } = useGlobalStore();
  const [items, setItems] = useState([]);
  useEffect(() => {
    // 获取符合条件的路由, 去掉 "/" [首位]路由
    // 把匹配到的路由切片 @A ["", "example2", "", "blue", "", "2"]
    const _MATCH = match
      .filter((v: any, i: number) => i)
      .map((item) => item.pathname.split("/"));

    // 遍历 metas 过滤符合条件的
    const _items: any = Object.keys(metas)
      .filter((item: any) => {
        // 把 key 切片, 符合 @A
        const T = item.split("/");
        // 过滤匹配,  _MATCH 是多项, 过滤出 多个符合条件的
        return _MATCH.some((m) => {
          // 匹配长度
          if (m.length === T.length) {
            // 精细匹配
            return m.every((k, i) => {
              // 动态路径参数 查到: 直接跳过
              if (T[i].includes(":")) {
                return true;
              }
              return T[i] === k;
            });
          }
          return false;
        });
      })
      .map((key) => metas[key]);
    setItems(_items);
  }, [location.pathname]);

  return (
    // title: <a href="">Application Center</a>,
    <Breadcrumb
      className="breadcrumb-wrap"
      items={items.map((v: any) => {
        return {
          title: v.code || v.label,
        };
      })}
    />
  );
}
