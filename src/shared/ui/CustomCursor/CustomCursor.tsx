import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (cursorRef.current) {
      const rect = cursorRef.current.parentElement?.getBoundingClientRect();

      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cursorRef.current.style.transform = `translate3d(${x.toString()}px, ${y.toString()}px, 0) translate(-50%, -50%)`;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none absolute h-[90px] w-[90px] rounded-full border border-white bg-white mix-blend-difference`}
    />
  );
}
