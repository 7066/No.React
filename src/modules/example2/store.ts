import { proxy, useSnapshot } from "valtio";

const Store: T = proxy({
  count: 0,
});

export const useExample2Store = (sync?: boolean): [Readonly<T>, T] => [
  useSnapshot(Store, { sync }),
  Store,
];

interface T {
  count: number;
}
