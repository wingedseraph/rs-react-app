import { useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

export default function Modal({
  children,
  isOpen,
  onClose,
  title,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // todo: refactor to use customHook
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;

      if (target instanceof Node) {
        if (modalRef.current && !modalRef.current.contains(target)) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="bg-opacity-50 animate-slideDown fixed inset-0 z-10 flex items-center justify-center duration-75"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-primary border-border-primary relative max-h-[90vh] w-3/4 overflow-y-auto rounded-4xl border-4 p-2 md:p-10"
      >
        {title && (
          <h2 id="modal-title" className="mb-6 text-center text-4xl italic">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
