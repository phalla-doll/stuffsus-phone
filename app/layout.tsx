import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Stuffsus - Tech Shop',
  description: 'Give All You Need',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-satoshi bg-[#F5F5F5] text-gray-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
