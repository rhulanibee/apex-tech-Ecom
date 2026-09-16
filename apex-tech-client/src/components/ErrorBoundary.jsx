import { Component } from 'react';

// Catches JavaScript errors thrown during render (e.g. a null product field
// crashing a page) that a try/catch around an API call can never catch,
// since those happen inside React's render, not in application code you
// control. Without this, any such error shows the user a blank white page
// with no way back - which is what the lecturer flagged in the M3/M4 demo.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Uncaught render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-4">
          <h1 className="text-xl font-black text-white">Something went wrong.</h1>
          <p className="text-sm text-textMuted">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => window.location.assign('/')}
            className="inline-block bg-white text-midnight font-black px-6 py-3 rounded-full text-xs"
          >
            Back to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
