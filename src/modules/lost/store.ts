import { proxy, useSnapshot } from "valtio";

const Store: T = proxy({});

export const useLostStore = (sync?: boolean): [Readonly<T>, T] => [
  useSnapshot(Store, { sync }),
  Store,
];

interface T {}
