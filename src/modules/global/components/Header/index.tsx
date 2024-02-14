import Theme from "./Theme/";
import Locale from "./Locale";
import React from "react";
import "./style.scss";
export default function Header() {
  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/login", {
      replace: true,
    });
  };
  const onGithub = () => {
    window.open("https://github.com/7066/No.React", "_blank");
  };

  return (
    <div className="header-wrap ignore">
      <div className="logo"></div>
      <div className="tools">
        <Theme />
        <Locale />
        <i className="iconfont icon-github" tabIndex={0} onClick={onGithub}></i>
        <i className="iconfont icon-guanji" tabIndex={0} onClick={onLogout}></i>
      </div>
    </div>
  );
}
