import React from 'react';
import 'simplebar-react/dist/simplebar.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'suneditor/dist/css/suneditor.min.css';
import './globals.scss';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { appConfig } from '@/config/appConfig';
import { ReduxProvider } from '@/store/provider';
import type { Metadata } from 'next';
import { font } from '@/config/font';
import ToasterContextProvider from '@/components/Toaster/Toaster';
import AuthProvider from '@/lib/AuthProvider';
import Pwa from './Pwa';

export const metadata: Metadata = {
  title: {
    default: appConfig.site_name!,
    template: `%s | ${appConfig.site_name}`,
  },
  description: appConfig.description,
  keywords: appConfig.keywords,
  robots: {
    follow: true,
    index: true,
  },
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  icons: {
    icon: '/images/icon-auth.png',
  },
  authors: [
    {
      url: appConfig.url,
      name: appConfig.title,
    },
  ],
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_ID,
  },
  metadataBase: new URL(appConfig.url),
  openGraph: {
    images: `${appConfig.url}/favicon.ico`,
    type: 'article',
    title: appConfig.title,
    authors: appConfig.title,
    description: appConfig.description,
    locale: appConfig.locale,
    siteName: appConfig.site_name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={appConfig.locale || 'en'}>
      <body className={font.className}>
        <ReduxProvider>
          {/* <ConfigProvider theme={theme}> */}
          <AuthProvider>
            <StyledComponentsRegistry>
              <ToasterContextProvider>{children}</ToasterContextProvider>
            </StyledComponentsRegistry>
            <Pwa />
          </AuthProvider>
          {/* </ConfigProvider> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
