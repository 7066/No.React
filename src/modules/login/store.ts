import { proxy, useSnapshot } from "valtio";

const Store: T = proxy({});

export const useLoginStore = (sync?: boolean): [Readonly<T>, T] => [
  useSnapshot(Store, { sync }),
  Store,
];

interface T {}
