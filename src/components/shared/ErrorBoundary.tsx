'use client';

import React, { Component, type ReactNode, type ErrorInfo } from 'react';
import { ErrorBoundaryUI } from './ErrorBoundaryUI';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in all environments
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorBoundaryUI error={this.state.error} errorInfo={this.state.errorInfo} />;
    }

    return this.props.children;
  }
}
