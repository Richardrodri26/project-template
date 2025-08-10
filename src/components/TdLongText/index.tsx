import { cn } from '@/lib/utils';
import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TdLongTextProps {
  children: React.ReactNode;
  className?: string;
}

export const TdLongText = ({ children, className }: TdLongTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const collapsedHeight = 22; // 1 línea aprox.
  const [hasOverflow, setHasOverflow] = useState(false);
  const [fullHeight, setFullHeight] = useState(collapsedHeight);

  // Medir overflow y altura completa
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const scrollH = el.scrollHeight;
    setHasOverflow(scrollH > collapsedHeight);
    setFullHeight(scrollH);
  }, [children]);

  // Reajustar si cambia tamaño dinámico
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { scrollHeight } = entry.target as HTMLElement;
      setHasOverflow(scrollHeight > collapsedHeight);
      setFullHeight(scrollHeight);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className={cn('group max-w-full overflow-hidden', { 'cursor-pointer': hasOverflow })}
      initial={{ height: collapsedHeight }}
      animate={{ height: collapsedHeight }}
      whileHover={hasOverflow ? { height: fullHeight } : {}}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      aria-haspopup={hasOverflow ? 'true' : undefined}
      aria-label={hasOverflow ? 'Pasa el cursor para expandir el texto' : undefined}
    >
      <div
        id={`td-longtext-${id}`}
        ref={textRef}
        className={cn(
          // Tailwind 'truncate' agrupa overflow-hidden, whitespace-nowrap y text-overflow:ellipsis
          'max-w-full truncate whitespace-normal group-hover:whitespace-pre-wrap group-hover:break-words',
          className,
        )}
        // maxHeight solo limita el hover, no afecta al truncate
        style={{ maxHeight: fullHeight }}
      >
        {children}
      </div>
    </motion.div>
  );
};
