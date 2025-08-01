import { Button } from '@/components/Button';

type PaginationProps = {
  currentPage: number;
  disabled: boolean;
  hasMorePages?: boolean;
  className?: string;
  onClick: (page: number) => void;
};

export function Pagination({
  currentPage,
  disabled,
  hasMorePages,
  className,
  onClick,
}: PaginationProps) {
  return (
    <div
      className={`p-4 flex items-center justify-between gap-10 mt-4 ${className}`}
    >
      <Button
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
      >
        previous
      </Button>
      <div>{currentPage}</div>

      <Button
        onClick={() => onClick(currentPage + 1)}
        disabled={!hasMorePages || disabled}
      >
        next
      </Button>
    </div>
  );
}
