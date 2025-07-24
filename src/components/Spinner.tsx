import { Component } from 'react';

export class Spinner extends Component {
  render() {
    return (
      <div
        role="status"
        className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible"
      >
        <img className="animate-spin w-12 h-12" src="/newLogo.svg" />
      </div>
    );
  }
}
