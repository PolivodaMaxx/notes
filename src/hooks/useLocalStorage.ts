import { useState, useEffect } from 'react';

export default function useLocaleStorage<T>(initialValue: T, key: string) {
  const getValue = () => {
    const value = localStorage.getItem(key);

    if (value) {
      console.log(3);
      return JSON.parse(value);
    }

    return initialValue;
  };

  const [value, setValue] = useState<T>(getValue);

  useEffect(() => {
    if (!value) return;

    const stringValue = JSON.stringify(value);

    localStorage.setItem(key, stringValue);
  }, [value]);

  return { value, setValue };
}
