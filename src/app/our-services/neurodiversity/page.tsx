"use client";
import { motion } from "framer-motion";
import React, { Suspense, useState, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCheck,
  FiArrowRight,
  FiChevronDown,
  FiChevronUp
} from "react-icons/fi";
import { HeroSection } from "@/components/HeroSection";
import { CheckCircle } from "lucide-react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NeurodiversityRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/our-services/thinking-different");
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600">Redirecting to Different Thinking For Different Thinkers...</p>
    </div>
  );
}
