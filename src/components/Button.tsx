import type { ButtonProps } from '@/types';
import { Component } from 'react';

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button
        type={this.props.type ?? 'button'}
        className={`text-[#203363] cursor-pointer hover:underline underline-offset-4 transition-all disabled:pointer-events-none disabled:cursor-not-allowed ${this.props.className}`}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}
