import type { SearchProps } from '@/types';
import React from 'react';
import { Button } from './Button';
import { Input } from './Input';

export class Search extends React.Component<SearchProps> {
  handleSubmit = (event_: React.FormEvent<HTMLFormElement>): void => {
    event_.preventDefault();
    this.props.onClick(this.props.value);
  };

  render() {
    return (
      <form
        className="bg-[#F6CD46] border-[#203566] border-8 text-black rounded-4xl p-4 flex flex-row justify-center gap-4"
        onSubmit={this.handleSubmit}
        role="search"
      >
        <Input value={this.props.value} onChange={this.props.onChange} />
        <Button
          type="submit"
          onClick={() => this.props.onClick(this.props.value)}
        >
          search
        </Button>
      </form>
    );
  }
}
