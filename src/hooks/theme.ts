import { useSnapshot, proxy } from "valtio";
const n = new Set(["sunny", "night"]);
const topic = proxy({ value: "sunny" });

export const useTopic = (): any => [
  useSnapshot(topic).value,
  (k: "sunny" | "night") => {
    if (n.has(k)) {
      const root = document.documentElement;
      root.className = k;
      topic.value = k;
      return;
    }
    throw new Error(`主题 -${k}- 尚未定义`);
  },
];
