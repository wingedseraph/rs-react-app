import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

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
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return createPortal(
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 z-50 h-[90px] w-[90px] rounded-full border border-white bg-white mix-blend-difference will-change-transform`}
    />,
    document.body
  );
}
