import { proxy, useSnapshot } from "valtio";

const Store: T = proxy({
  ins: new Map(),
  menu: [],
  mode: "url",
});

export const useGlobalStore = (sync?: boolean): [Readonly<T>, T] => [
  useSnapshot(Store),
  Store,
];

interface T {
  ins: Map<string, Set<string>>;
  menu: any;
  mode: "url" | "code";
}
