import React from "react";
import "./style.scss";
export default function Example2() {
  const [{ count: count1 }, _example1] = useExample1Store();
  const [{ count: count2 }, _example2] = useExample2Store();
  const navigate = useNavigate();
  const onClick = (path: any) => {
    navigate(path);
  };
  return (
    <div className="example2-wrap">
      <Row>
        <Col span={12}>
          <div className="block">
            <h2 className="title">数据共享</h2>
            <div>
              <div style={{ display: "inline-block", marginRight: "24px" }}>
                <Statistic title="青龙 Count" value={count1} />
                <Button size="large" onClick={() => (_example1.count += 1)}>
                  + Count
                </Button>
              </div>
              <div style={{ display: "inline-block" }}>
                <Statistic title="朱雀 Count" value={count2} />
                <Button size="large" onClick={() => (_example2.count += 1)}>
                  + Count
                </Button>
              </div>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="block">
            <h2 className="title">按钮权限</h2>
            <div>
              <Flex gap="middle">
                <Button
                  type="primary"
                  icon={<FormOutlined />}
                  shape="circle"
                  disabled={!isAllowed("example2", "edit")}
                />
                <Button
                  type="primary"
                  icon={<VerticalAlignBottomOutlined />}
                  shape="circle"
                  disabled={!isAllowed("example2", "export")}
                />
              </Flex>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="block">
            <h2 className="title">路由切换</h2>
            <h6>切换Tag时, 会保留当前路由地址</h6>
            <div>
              {/* <NavLink to="/example2/gold">金</NavLink> */}
              <Button type="link" block onClick={() => onClick("")}>
                红
              </Button>
              <Button
                type="link"
                block
                onClick={() => onClick("/example2/gold")}
              >
                金
              </Button>
              <Button
                type="text"
                block
                onClick={() => onClick("/example2/blue/2")}
              >
                蓝
              </Button>
            </div>
            <Outlet></Outlet>
          </div>
        </Col>
      </Row>
    </div>
  );
}
