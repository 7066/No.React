export const isAllowed = (code: string, type: "edit" | "export") => {
  const [{ ins }] = useGlobalStore();
  if (!ins.has(code)) return false;
  if (ins.get(code)?.has(type)) return true;
  return false;
};
