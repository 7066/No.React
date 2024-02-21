import React from "react";
import "./style.scss";
export default function Home() {
  const [{ mode }, _global] = useGlobalStore();
  const [{ count: count1 }, _example1] = useExample1Store();
  const [{ count: count2 }, _example2] = useExample2Store();
  const [, setTheme] = useTheme();

  const onCrazy = () => {
    setTheme("crazy");
  };

  const onMode = (mode: "staticMatch" | "dynamicLoad") => {
    _global.mode = mode;
    localStorage.setItem("MODE", mode);
    window.location.reload();
  };
  return (
    <div className="home-wrap">
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
                  disabled={!isAllowed("home", "edit")}
                />
                <Button
                  type="primary"
                  icon={<VerticalAlignBottomOutlined />}
                  shape="circle"
                  disabled={!isAllowed("home", "export")}
                />
              </Flex>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="block">
            <h2 className="title">更多主题</h2>
            <Button type="primary" onClick={onCrazy}>
              Crazy
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <div className="block">
            <h2 className="title">路由模式</h2>
            <div>
              <Flex gap="middle">
                <Button
                  type={mode === "staticMatch" ? "primary" : "default"}
                  onClick={() => onMode("staticMatch")}
                >
                  前端路由
                </Button>
                <Button
                  type={mode === "dynamicLoad" ? "primary" : "default"}
                  onClick={() => onMode("dynamicLoad")}
                >
                  后端路由
                </Button>
              </Flex>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
