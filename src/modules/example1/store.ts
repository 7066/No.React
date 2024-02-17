import { proxy, useSnapshot } from "valtio";

const Store: T = proxy({
  list: [],
  count: 0,
});

export const useExample1Store = (sync?: boolean): [Readonly<T>, T] => [
  useSnapshot(Store, { sync }),
  Store,
];

interface T {
  list: any;
  count: number;
}
