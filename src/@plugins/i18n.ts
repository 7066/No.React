import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useSnapshot, proxy, subscribe } from "valtio";
// 语言
const LOCALES = new Set(["zh", "en"]);
// 语言
const LOADED = new Set();
// 主题
const I18N = proxy({ value: "" });
// 信息
const resources = {} as {
  [key: string]: {
    translation: {
      [key: string]: object;
    };
  };
};

/** @加载语言文件 */
const LOAD_LOCALE = (key: string) => {
  if (LOADED.has(key)) {
  } else {
    LOADED.add(key);
    let modules: any;
    if (key === "zh") {
      modules = require.context("../modules", true, /zh.json$/);
    }
    if (key === "en") {
      modules = require.context("../modules", true, /en.json$/);
    }

    let translation: any = {};
    modules.keys().forEach((url: any) => {
      const [module, locale] = url
        .replace(/modules|\.json|\.?\/?/g, "")
        .split("locales");

      if (module && locale) {
        translation[module] = modules(url);
        resources[locale] = { translation };
      }
    });
  }
  i18n.changeLanguage(key);
  localStorage.setItem("LOCALE", key);
};

i18n.use(initReactI18next).init({
  lng: "zh",
  resources,
});

/** @watch */
subscribe(I18N, () => {
  if (LOCALES.has(I18N.value)) {
    LOAD_LOCALE(I18N.value);
  } else message.warning("该语言未实现");
});

/** @初始化 */
(() => {
  const _Locale = localStorage.getItem("LOCALE") || "zh";
  if (_Locale === "zh" || _Locale === "en") I18N.value = _Locale;
})();

/** @hooks */
export const useLocale = (): any => {
  const { value } = useSnapshot(I18N);

  return [
    value,
    (v: any) => {
      I18N.value = v;
    },
  ];
};

export { useTranslation } from "react-i18next";
export default i18n;
