import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useSnapshot, proxy } from "valtio";
const n = new Set(["zh_CN", "en_US"]);
const target = proxy({ value: "zh_CN" });

const files = [] as Array<FILES<NonNullable<any>>>;
files.push(require.context("../community", true, /(en_US|zh_CN).ts$/));
files.push(require.context("../modules", true, /(en_US|zh_CN).ts$/));

const resources = {} as {
  [key: string]: {
    translation: {
      [key: string]: object;
    };
  };
};
files.forEach((file) => {
  file.keys().forEach((url) => {
    const [module, locale] = url
      .replace(/modules|community|\.ts|\.?\/?/g, "")
      .split("locale");

    if (module && locale) {
      if (!resources[locale]) {
        resources[locale] = { translation: {} };
      }
      resources[locale]["translation"][module] = file(url).default;
    }
  });
});

i18n.use(initReactI18next).init({
  lng: "zh_CN",
  resources,
});

export const useLocale = (): any => [
  useSnapshot(target).value,
  (k: "zh_CN" | "en_US") => {
    if (n.has(k)) {
      i18n.changeLanguage(k);
      target.value = k;
    } else {
      throw new Error(`国际化 -${k}- 尚未定义`);
    }
  },
];

export const t = i18n.t;
export default i18n;
