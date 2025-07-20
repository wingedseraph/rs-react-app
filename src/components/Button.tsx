import { Component } from 'react';
import type { ButtonProps } from '../types/types';

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button
        className={`cursor-pointer hover:bg-black transition-all disabled:pointer-events-none disabled:cursor-not-allowed ${this.props.className}`}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
