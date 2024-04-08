import { useEffect } from "react";

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
