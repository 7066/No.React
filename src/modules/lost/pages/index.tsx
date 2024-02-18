import React from "react";
import "./style.scss";
export default function Lost() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  return (
    <div className="lost-wrap">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={onClick}>
            返回首页
          </Button>
        }
      />
    </div>
  );
}
