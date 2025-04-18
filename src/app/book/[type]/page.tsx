'use client';

import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the main booking page content to reuse it
const BookPageContent = dynamic(() => import('../page').then((mod) => ({ 
  default: mod.default 
})), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-xl text-gray-600 font-[Roboto]" style={{ color: '#7094B7' }}>
        Loading booking form...
      </div>
    </div>
  ),
});

export default function DynamicBookPage() {
  // Get the consultation type from the route parameter
  const params = useParams();
  const type = params.type as string;

  // Pass the type as a query parameter to the original component
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-xl text-gray-600 font-[Roboto]" style={{ color: '#7094B7' }}>
          Loading booking form...
        </div>
      </div>
    }>
      <BookPageContent type={type} />
    </Suspense>
  );
} 