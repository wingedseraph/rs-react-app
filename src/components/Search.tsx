import React from 'react';
import type { SearchProps } from '../types/types';
import { Button } from './Button';
import { Input } from './Input';

export class Search extends React.Component<SearchProps> {
  render() {
    return (
      <div>
        <Input value={this.props.value} onChange={this.props.onChange} />
        <Button
          onClick={this.props.onClick}
          disabled={!this.props.value || this.props.loading}
        >
          submit
        </Button>
      </div>
    );
  }
}
