import type { ErrorBoundaryProps, ErrorBoundaryState } from '@/types';
import { Component } from 'react';

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <h1>Something went wrong</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
