import { Component } from 'react';

export type InputProps = {
  value: string;
  onChange: (value: string) => void;
};
export class Input extends Component<InputProps> {
  render() {
    return (
      <input
        className="text-black outline-0"
        type="text"
        value={this.props.value}
        onChange={(event_) => this.props.onChange(event_.target.value)}
        placeholder="type to search..."
      />
    );
  }
}
