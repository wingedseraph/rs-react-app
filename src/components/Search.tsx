import type { SearchProps } from '@/types';
import React from 'react';
import { Button } from './Button';
import { Input } from './Input';

export function Search({ value, onChange, onClick }: SearchProps) {
  const handleSubmit = (event_: React.FormEvent<HTMLFormElement>): void => {
    event_.preventDefault();
    onClick(value);
  };

  return (
    <form
      className="flex flex-row justify-center gap-4 rounded-4xl border-8 p-4 text-black"
      onSubmit={handleSubmit}
      role="search"
    >
      <Input value={value} onChange={onChange} />
      <Button type="submit" onClick={() => onClick(value)}>
        search
      </Button>
    </form>
  );
}
