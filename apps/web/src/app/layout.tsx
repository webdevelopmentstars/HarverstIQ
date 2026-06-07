import 'dotenv/config';
import type { AppProps } from 'next/app';
import './globals.css';

export const metadata = {
  title: 'HarverstIQ - Enterprise Web Crawler',
  description: 'Precision web scraping and data aggregation platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
