import type { Metadata } from 'next';
import { FONTS } from '@/lib/fonts';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'RiskVision',
  description: 'Análise de Riscos no Mercado de Ações',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${FONTS.poppins.variable} ${FONTS.roboto.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
