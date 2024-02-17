import React from "react";
import Light from "./light";
import Dark from "./dark";
import "./style.scss";
export default function () {
  let [theme, setTheme] = useTheme();
  const [value] = useState(theme !== "dark");

  const onChange = (checked: any) => {
    setTheme(checked ? "light" : "dark");
  };
  return (
    <div className="theme-component ignore">
      <Switch
        checked={value}
        checkedChildren={<Light />}
        unCheckedChildren={<Dark />}
        onChange={onChange}
      />
    </div>
  );
}
