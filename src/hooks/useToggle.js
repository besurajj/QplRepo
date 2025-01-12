import { useState ,useCallback } from 'react';


export const useToggle = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = useCallback(() => setValue((prevValue) => !prevValue), []);
  const setValueTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setValueFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value,toggleValue, setValueTrue, setValueFalse ];
};