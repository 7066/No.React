import React from "react";
import "./style.scss";
import { api_search, api_search2 } from "@/example1/service";
export default function Example1() {
  const [{ count: count1 }, _example1] = useExample1Store();
  const [{ count: count2 }, _example2] = useExample2Store();
  const onSuccess = () => {
    api_search().then(() => {
      message.success("请求成功. 请在控制台 Network 查看");
    });
  };

  const onWarning = () => {
    api_search2();
  };
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
        <Col span={12}>
          <div className="block">
            <h2 className="title">接口代理请求</h2>
            <div>
              <Flex gap="middle">
                <Button type="primary" onClick={onSuccess}>
                  成功示例
                </Button>
                <Button type="primary" danger onClick={onWarning}>
                  失败示例
                </Button>
              </Flex>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
