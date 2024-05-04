import { useEffect } from "react";

//кастомный хук можно его переиспользовать в любов участке кода
const useDebounceEffect = (callback, delay, deps) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [...deps, delay]);
};

export default useDebounceEffect;
