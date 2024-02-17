import React from "react";
import "./style.scss";
export default function Example1() {
  const [{ count: count1 }, _example1] = useExample1Store();
  const [{ count: count2 }, _example2] = useExample2Store();
  return (
    <div className="example1-wrap">
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
                  disabled={!isAllowed("example1", "edit")}
                />
                <Button
                  type="primary"
                  icon={<VerticalAlignBottomOutlined />}
                  shape="circle"
                  disabled={!isAllowed("example1", "export")}
                />
              </Flex>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
