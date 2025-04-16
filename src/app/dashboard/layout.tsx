import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'User Dashboard - Falling Upward',
  description: 'User dashboard for managing appointments and workbooks',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
