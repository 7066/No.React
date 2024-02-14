import { proxy, useSnapshot } from "valtio";
const STATE = proxy({
  ins: new Map(),
  menu: [],
  mode: "code",
  metas: {},
} as {
  ins: Map<string, Set<string>>;
  menu: any;
  mode: "url" | "code";
  metas: any;
});

export const useGlobalStore = (readonly: boolean = false) =>
  readonly ? useSnapshot(STATE) : STATE;
