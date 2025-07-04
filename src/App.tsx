import { Component } from 'react';

type MyProps = {
  message: string;
};
type MyState = {
  count: number;
};
class Button extends Component<MyProps, MyState> {
  public state = { count: 0 };
  public render() {
    return (
      <button className="bg-amber-600 p-8 " onClick={() => this.increment(1)}>
        {this.props.message} {this.state.count}
      </button>
    );
  }
  public increment = (amt: number) => {
    // like this
    this.setState((state) => ({
      count: state.count + amt,
    }));
  };
}

export default function App() {
  return (
    <>
      <Button message="string" />
    </>
  );
}
