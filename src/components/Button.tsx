import type { ButtonProps } from '@/types';
import { Component } from 'react';

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button
        type={this.props.type ?? 'button'}
        className={`cursor-pointer hover:bg-black transition-all disabled:pointer-events-none disabled:cursor-not-allowed ${this.props.className}`}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}
