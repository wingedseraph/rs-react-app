import { Button } from '@/components/Button';
import type { Dispatch, SetStateAction } from 'react';

type PaginationProps = {
  currentPage: number;
  disabled: boolean;
  hasMorePages?: boolean;
  onClick: Dispatch<SetStateAction<number>>;
};

export function Pagination({
  currentPage,
  disabled,
  hasMorePages,
  onClick,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between gap-10 mt-4">
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
