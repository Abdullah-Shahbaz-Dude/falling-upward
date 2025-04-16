import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import { LoadingProvider } from "@/components/LoadingProvider";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: 'Falling Upward - Physiotherapy Consultation',
  description: 'Professional physiotherapy consultation services to help you recover and thrive.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-roboto`}>
        <SessionProvider>
          <LoadingProvider>
            <MainLayoutWrapper>
              {children}
            </MainLayoutWrapper>
          </LoadingProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
