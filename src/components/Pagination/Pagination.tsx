import { Button } from '@/components/Button/Button';

type PaginationProps = {
  className?: string;
  currentPage: number;
  disabled: boolean;
  hasMorePages?: boolean;
  onClick: (page: number) => void;
};

export function Pagination({
  className = '',
  currentPage,
  disabled,
  hasMorePages,
  onClick,
}: PaginationProps) {
  return (
    <div
      className={`mt-4 flex items-center justify-between gap-10 p-4 ${className}`}
    >
      <Button
        disabled={currentPage === 1 || disabled}
        onClick={() => {
          onClick(currentPage - 1);
        }}
      >
        prev
      </Button>
      <div data-testid="currentPage">{currentPage}</div>

      <Button
        disabled={!hasMorePages || disabled}
        onClick={() => {
          onClick(currentPage + 1);
        }}
      >
        next
      </Button>
    </div>
  );
}
