import React from 'react';

import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
export type SearchProps = {
  loading?: boolean;
  onChange: (value: string) => void;
  onClick: (value: string) => void;
  value: string;
};

export function Search({ onChange, onClick, value }: SearchProps) {
  const handleSubmit = (event_: React.FormEvent<HTMLFormElement>): void => {
    event_.preventDefault();
    onClick(value);
  };

  return (
    <form
      className="flex flex-row justify-center gap-4 rounded-4xl border-8 p-4"
      onSubmit={handleSubmit}
      role="search"
    >
      <Input onChange={onChange} value={value} />
      <Button onClick={() => onClick(value)} type="submit">
        search
      </Button>
    </form>
  );
}
