import  { Component, type ErrorInfo, type ReactNode } from "react";
import * as Sentry from "@sentry/react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  console.error("Application Error:", error);
  console.error("Error Details:", errorInfo);

  Sentry.captureException(error);
}

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">⚠️</div>

            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Something went wrong
            </h1>

            <p className="text-gray-600 mb-6">
              An unexpected error occurred in the application.
              Please try again.
            </p>

            {this.state.errorMessage && (
              <p className="text-sm text-gray-500 mb-6 break-words">
                {this.state.errorMessage}
              </p>
            )}

            <button
              onClick={this.handleReload}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;