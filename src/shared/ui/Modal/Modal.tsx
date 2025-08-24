import { createPortal } from 'react-dom';

import { useModal } from '../../hooks/useModal';

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
  const modalRef = useModal(isOpen, onClose);

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
