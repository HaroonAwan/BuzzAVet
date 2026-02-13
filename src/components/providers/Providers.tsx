'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@lib/store';
import { ErrorBoundary } from '@components/shared/ErrorBoundary';

import { Toaster } from 'react-hot-toast';
import { useHeaderHeight } from '@/lib/hooks';

export function Providers({ children }: { children: React.ReactNode }) {
  const headerHeight = useHeaderHeight();

  const topPosition = headerHeight ? `${headerHeight}px` : '90px';
  console.log('🚀 ~ Providers ~ topPosition:', topPosition);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
      <Toaster
        position="top-right"
        containerStyle={{
          top: topPosition,
          right: '60px',
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#FFFFFF',
            color: '#020409',
            padding: '12px 20px',
            borderRadius: '8px',
            borderColor: 'transparent',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0px 6px 16px 0px #00000014',
            maxWidth: '500px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#020409',
              secondary: '#FFFFFF',
            },
            style: {
              background: '#FFFFFF',
              color: '#020409',
            },
          },
          error: {
            duration: 3000,
            iconTheme: {
              primary: '#020409',
              secondary: '#FFFFFF',
            },
            style: {
              background: '#FFFFFF',
              color: '#020409',
            },
          },
          loading: {
            iconTheme: {
              primary: '#020409',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
    </ErrorBoundary>
  );
}
