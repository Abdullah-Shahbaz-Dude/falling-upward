"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NeurodiversityBookingRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/book/thinking-different");
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600">Redirecting to Different Thinking For Different Thinkers booking page...</p>
    </div>
  );
}
