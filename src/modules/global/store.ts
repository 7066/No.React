import { proxy, useSnapshot } from "valtio";

const Store: T = proxy({
  ins: new Map(),
  menu: [],
  mode: "dynamicLoad",
});

export const useGlobalStore = (sync?: boolean): [Readonly<T>, T] => [
  useSnapshot(Store, { sync }),
  Store,
];

interface T {
  ins: Map<string, Set<string>>;
  menu: any;
  mode: "dynamicLoad" | "staticMatch";
}
