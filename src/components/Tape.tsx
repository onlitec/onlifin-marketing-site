import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

/** Rises once when it enters the viewport. Content is visible without JS motion support. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const [ref, seen] = useInView<HTMLElement>(0.15);
  const style = { '--d': `${delay}ms` } as CSSProperties;
  return (
    <Tag
      ref={ref as never}
      style={style}
      className={`reveal ${seen ? 'is-in' : 'is-pending'} ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * A figure that settles digit by digit, left to right, like a printing total.
 * Screen readers get the final value; reduced motion renders it immediately.
 */
export function Settle({ value, delay = 0, active = true }: { value: string; delay?: number; active?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [text, setText] = useState(value);

  useEffect(() => {
    if (reduced || !active) {
      setText(value);
      return;
    }
    const chars = [...value];
    const digitIdx = chars.map((c, i) => (/\d/.test(c) ? i : -1)).filter((i) => i >= 0);
    const start = performance.now() + delay;
    const duration = 700;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(1, (now - start) / duration);
      if (now - last > 50 || p === 1) {
        last = now;
        const locked = Math.floor(p * digitIdx.length);
        setText(
          chars
            .map((c, i) => {
              const k = digitIdx.indexOf(i);
              if (k < 0 || k < locked) return c;
              return String(Math.floor(Math.random() * 10));
            })
            .join(''),
        );
      }
      if (p < 1) raf = requestAnimationFrame(tick);
      else setText(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, delay, active, reduced]);

  return (
    <span>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true" className="text-vermilion-light">
        <rect x="0" y="0" width="22" height="4" fill="currentColor" />
        <rect x="0" y="9" width="22" height="4" fill="currentColor" />
      </svg>
      <span className="font-display text-[1.65rem] font-black uppercase leading-none tracking-[0.01em]">OnliFin</span>
    </span>
  );
}
