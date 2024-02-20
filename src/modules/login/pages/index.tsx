import React from "react";
import "./style.scss";
export default function Login() {
  useEffect(() => {
    NProgress.start();
    // 清除Token
    localStorage.removeItem("TOKEN");
    NProgress.done();
  }, []);
  const navigate = useNavigate();
  const onClick = (item: string) => {
    if (item === "go") {
      localStorage.setItem("TOKEN", "7066");
      navigate("/", {
        replace: true,
      });
    }
  };
  const onGit = () => {
    window.open("https://github.com/7066/No.React", "_blank");
  };
  const list = [
    "axios",
    "valtio",
    "i18n",
    "plop",
    "go",
    "eslint",
    "prettier",
    "commitlint",
    "stylelint",
  ];

  const bubbles = [
    {
      top: "300px",
      right: "120px",
      width: "60px",
      height: "60px",
    },
    {
      top: "220px",
      right: "260px",
      width: "20px",
      height: "20px",
    },
    {
      top: "100px",
      right: "300px",
      width: "10px",
      height: "10px",
    },
    {
      top: "100px",
      right: "220px",
      width: "30px",
      height: "30px",
    },
    {
      top: "130px",
      right: "80px",
      width: "100px",
      height: "100px",
    },
    {
      top: "100px",
      right: "30px",
      width: "10px",
      height: "10px",
    },
  ];

  return (
    <div className="login-wrap">
      {/* 画布 动效 */}
      <canvas id="canvas" />
      {/* 小球装饰 */}
      {bubbles.map((style, key) => {
        return <div key={key} style={style} className="bubble"></div>;
      })}

      {/* 仓库名称 */}
      <div className="logo" onClick={onGit}></div>
      {/* 仓库分支  */}
      <div className="git-wrap">
        {/* 装饰icon  */}
        <svg className="icon youxishoubing" aria-hidden="true">
          <use xlinkHref="#icon-youxishoubing"></use>
        </svg>
        {/* 仓库分支  */}
        <div className="git"></div>
      </div>
      {/* 项目简介  */}
      <div className="describe"></div>
      {/* 相关插件  */}
      <Row className="list-wrap" gutter={16}>
        {list.map((item) => {
          return (
            <Col key={item} span={8}>
              <div
                className={["item", item].join(" ")}
                onClick={() => onClick(item)}
              ></div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
