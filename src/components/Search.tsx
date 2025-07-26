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
      className="bg-[#F6CD46] border-[#3B5BA7] border-8 text-black rounded-4xl p-4 flex flex-row justify-center gap-4"
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
