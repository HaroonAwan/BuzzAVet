import type { SerializedError as RTKSerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
}

export function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ApiErrorResponse).message === 'string' &&
    'statusCode' in error &&
    typeof (error as ApiErrorResponse).statusCode === 'number'
  );
}

export interface TypedSerializedError extends RTKSerializedError {
  data?: ApiErrorResponse;
}

export function isTypedSerializedError(error: unknown): error is TypedSerializedError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    typeof (error as TypedSerializedError).name === 'string'
  );
}

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    (typeof (error as FetchBaseQueryError).status === 'number' ||
      typeof (error as FetchBaseQueryError).status === 'string')
  );
}

export function extractApiError(
  error: FetchBaseQueryError | RTKSerializedError | unknown
): ApiErrorResponse | undefined {
  if (isFetchBaseQueryError(error)) {
    // Handle network errors (status as string, e.g., 'FETCH_ERROR')
    if (typeof error.status === 'string') {
      return {
        message: error.error || 'Network error. Please try again.',
        statusCode: 0,
      };
    }
    if (error.data && isApiErrorResponse(error.data)) {
      return error.data;
    }
  }

  if (isTypedSerializedError(error)) {
    if (error.data && isApiErrorResponse(error.data)) {
      return error.data;
    }
  }

  return undefined;
}

export type RTKQueryError = FetchBaseQueryError | RTKSerializedError;
