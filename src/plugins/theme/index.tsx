import React from "react";
import { ANTD_THEME } from "./hook";
export default function ANTDConfig(props: any) {
  const [theme] = useTheme();
  return (
    <ConfigProvider key={theme} theme={ANTD_THEME()}>
      {props.children}
    </ConfigProvider>
  );
}
