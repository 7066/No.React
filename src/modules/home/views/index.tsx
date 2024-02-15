import React from "react";
import "./index.scss";
export default function Home() {
  const { t } = useTranslation();
  return <div className="home-wrap">{t("home.code")}</div>;
}
