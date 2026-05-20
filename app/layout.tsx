import './globals.css';
import type { Metadata } from 'next';
import { Inter, Old_Standard_TT } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const oldStandard = Old_Standard_TT({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-old-standard',
});

export const metadata: Metadata = {
  title: 'Río Delfín Lodge • Expeditions - Ecuadorian Amazon',
  description: 'Experience authentic Amazon expeditions and eco-friendly accommodations in the heart of the Ecuadorian rainforest.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${inter.className} ${oldStandard.variable}`}>
        {children}
      </body>
    </html>
  );
}