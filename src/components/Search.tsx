import React from 'react';
import type { SearchProps } from '../types/types';
import { Button } from './Button';
import { Input } from './Input';

export class Search extends React.Component<SearchProps> {
  render() {
    return (
      <div className="p-4 flex flex-row justify-center gap-4">
        <Input value={this.props.value} onChange={this.props.onChange} />
        <Button
          onClick={this.props.onClick}
          disabled={!this.props.value || this.props.loading}
        >
          search
        </Button>
      </div>
    );
  }
}
