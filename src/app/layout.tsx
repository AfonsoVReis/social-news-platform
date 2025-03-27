import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components/layout/header';
import { StoreProvider } from '@/providers/store-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social News Platform',
};

const roboto = Roboto({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700'],
});

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en" suppressHydrationWarning>
    <UserProvider>
      <StoreProvider>
        <body className={roboto.variable}>
          <InitColorSchemeScript attribute="class" />

          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider>
              <StyledEngineProvider injectFirst>
                <CssBaseline />

                <Toaster />

                <Header />

                {children}
              </StyledEngineProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </StoreProvider>
    </UserProvider>
  </html>
);

export default RootLayout;
