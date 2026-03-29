import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { CartProvider } from '@/context/CartContext';
import { SearchProvider } from '@/context/SearchContext';
import Cart from '@/components/Cart';

export const metadata: Metadata = {
  title: 'Stuffsus - Premium Tech Shop',
  description: 'Discover the latest tech gadgets, mobile phones, audio accessories, and smart home devices at Stuffsus.',
  keywords: ['tech', 'gadgets', 'mobile phones', 'audio', 'smart home', 'accessories', 'Stuffsus', 'ecommerce'],
  authors: [{ name: 'Stuffsus Team' }],
  openGraph: {
    title: 'Stuffsus - Premium Tech Shop',
    description: 'Discover the latest tech gadgets, mobile phones, audio accessories, and smart home devices at Stuffsus.',
    url: 'https://stuffsus.com',
    siteName: 'Stuffsus',
    images: [
      {
        url: 'https://picsum.photos/seed/interior/1200/630',
        width: 1200,
        height: 630,
        alt: 'Stuffsus Tech Shop',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stuffsus - Premium Tech Shop',
    description: 'Discover the latest tech gadgets, mobile phones, audio accessories, and smart home devices at Stuffsus.',
    images: ['https://picsum.photos/seed/interior/1200/630'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-satoshi bg-[#F5F5F5] text-gray-900" suppressHydrationWarning>
        <SearchProvider>
          <CartProvider>
            {children}
            <Cart />
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
