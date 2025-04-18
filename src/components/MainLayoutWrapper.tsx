'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminOrDashboard = pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminOrDashboard && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdminOrDashboard && <Footer />}
      {!isAdminOrDashboard && <CookieConsent />}
    </div>
  );
}
