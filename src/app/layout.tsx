import { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/components/LoadingProvider";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: 'Falling Upwards - Psychology-Driven Solutions',
  description: 'We provide psychology-driven solutions for individuals and organizations, including digital evolution, executive mentoring, therapy, and Different Thinking services.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-roboto`}>
        <LoadingProvider>
          <MainLayoutWrapper>
            {children}
          </MainLayoutWrapper>
        </LoadingProvider>
      </body>
    </html>
  );
}
