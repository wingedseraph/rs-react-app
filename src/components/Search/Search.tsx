import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import React from 'react';

type SearchProps = {
  value: string;
  loading?: boolean;
  onChange: (value: string) => void;
  onClick: (value: string) => void;
};

export function Search({ value, onChange, onClick }: SearchProps) {
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
      <Input value={value} onChange={onChange} />
      <Button
        type="submit"
        onClick={() => {
          onClick(value);
        }}
      >
        search
      </Button>
    </form>
  );
}
