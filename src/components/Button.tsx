import { Component } from 'react';
import type { ButtonProps } from '../types/types';

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button
        className="cursor-pointer hover:bg-black transition-all"
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}
