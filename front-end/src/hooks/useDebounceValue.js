import { useEffect, useState } from "react";

export default function useDebounceValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value); // debbounce = inputValue
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}
