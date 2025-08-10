import { useEffect, useRef, useState } from 'react';

export function useDebouncedValue<T = any>({
  value,
  options = { leading: false },
  wait,
  fn,
}: {
  value: T;
  wait: number;
  options: { leading: boolean } | undefined;
  fn?: () => void;
}) {
  const [_value, setValue] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const cooldownRef = useRef(false);

  const [loading, setLoading] = useState(false);

  const cancel = () => window.clearTimeout(timeoutRef.current!);

  useEffect(() => {
    if (mountedRef.current) {
      if (!cooldownRef.current && (options?.leading || false)) {
        setLoading(true);

        cooldownRef.current = true;
        if (fn) {
          fn();
        }
        setValue(value);
        setLoading(false);
      } else {
        cancel();
        setLoading(true);

        timeoutRef.current = window.setTimeout(() => {
          cooldownRef.current = false;
          if (fn) {
            fn();
          }
          setValue(value);
          setLoading(false);
        }, wait);
      }
    }
  }, [value, options?.leading, wait]);

  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);

  return { _value, cancel, loading } as const;
}
