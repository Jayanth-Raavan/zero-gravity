import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zero Gravity Photography — Cinematic Website Concept',
  description: 'A cinematic website redesign concept prepared for Zero Gravity Photography.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
