import { useEffect, useState } from "react";

export default function useDebounceValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value); // debbounce = inputValue
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay); // Ogni volta che value (o delay) cambia, avvio un timer.
    return () => clearTimeout(t);
  }, [value, delay]); // Ogni volta che value cambia resetto il Timer

  return debounced; // ritorno l'ultima versione
}
