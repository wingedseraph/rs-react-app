import { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'about',
  title: 'about',
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
