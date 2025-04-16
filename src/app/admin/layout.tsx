import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Admin Dashboard - Falling Upward',
  description: 'Admin dashboard for managing users and workbooks',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The authentication check is handled in the page components
  // This layout just provides the structure
  return (
    <div className="font-roboto">
      {children}
    </div>
  );
}
