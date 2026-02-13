import type { Metadata } from 'next';
import { Poppins, Pacifico } from 'next/font/google';
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
          {children}
        </Providers>
      </body>
    </html>
  );
}
