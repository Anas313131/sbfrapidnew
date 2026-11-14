import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  imageReveal?: boolean;
};

export function Reveal({ children, delay = 0, className = '', imageReveal = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties;

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={style}
      className={`${imageReveal ? 'image-reveal' : 'reveal'} ${className}`}
    >
      {children}
    </div>
  );
}
