import { proxy } from "valtio";
export const useGlobalStore = () =>
  proxy({
    ins: new Map(),
    menu: [],
    mode: "code",
  });
