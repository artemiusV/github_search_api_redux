import { useEffect } from "react";

//кастомный хук
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
