import { useEffect, useState } from "react";

export const usePersistStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
  noResultCause?: string
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
    if (!result && noResultCause)
      throw new Error("다시 로그인 해주세요", { cause: noResultCause });
  }, [result, noResultCause]);

  return data;
};
