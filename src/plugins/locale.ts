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
    i18n.changeLanguage(key);
    localStorage.setItem("LOCALE", key);
  } else {
    LOADED.add(key);
    let modules: any;
    if (key === "zh") {
      modules = require.context("../modules", true, /zh.json$/, "lazy");
    }
    if (key === "en") {
      modules = require.context("../modules", true, /en.json$/, "lazy");
    }

    Promise.all(
      modules.keys().map((url: any) => {
        const [ns, lng] = url
          .replace(/modules|\.json|\.?\/?/g, "")
          .split("locales");

        return modules(url).then((resources: any) => {
          return [lng, ns, resources];
        });
      })
    ).then((resp: any) => {
      const result = resp.reduce(
        (result: any, props: any) => {
          const [lng, ns, json] = props;
          if (ns && json) {
            result.lng = lng;
            result.translation[ns] = json;
          }

          return result;
        },
        {
          lng: "",
          translation: {},
        }
      );

      i18n.addResourceBundle(result.lng, "translation", result.translation);
      i18n.changeLanguage(key);
      localStorage.setItem("LOCALE", key);
    });
  }
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
