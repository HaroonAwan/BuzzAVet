import type { Metadata } from 'next';
import { Poppins, Pacifico } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import '@/assets/css/globals.css';
import '@/assets/css/custom.css';
import '@/assets/css/clamp.css';
import { Providers } from '@components/providers/Providers';
import { NavigationProgress } from '@components/shared/NavigationProgress';
import { DEFAULT_METADATA } from '@/seo/metadata';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'], variable: '--font-pacifico' });

export const metadata: Metadata = {
  ...DEFAULT_METADATA.rootLayoutMetadata,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${pacifico.variable} min-h-screen`}>
        <Providers>
          <NavigationProgress />
          <Toaster
            position="top-right"
            containerStyle={{
              top: '90px',
              right: '60px',
            }}
            toastOptions={{
              duration: 3000,
              style: {
                background: '#FFFFFF',
                color: '#020409',
                padding: '12px 20px',
                borderRadius: '0 0 8px 8px',
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
          {children}
        </Providers>
      </body>
    </html>
  );
}
