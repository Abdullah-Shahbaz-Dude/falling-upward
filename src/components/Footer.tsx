'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiMail, FiPhone } from 'react-icons/fi';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#E2E6EB] text-gray-800">
      {/* Main Footer Content */}
      <div className="container-custom mx-auto py-8">
        <div className="flex flex-col mb-8">
          {/* Logo and Contact Info */}
          <div className="flex flex-col items-start mb-6">
            <div className="mb-4">
              <Image 
                src="/images/logo.png" 
                alt="Falling Upward Logo" 
                width={100} 
                height={100}
                className="border border-gray-200 p-2"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-[#0B4073]">Alexander Church</h3>
              <p className="text-[#0B4073]">Psychological Therapist, Mentor & Organisational Consultant</p>
              <div className="flex items-center text-[#0B4073]">
                <span className="mr-1">E:</span>
                <a href="mailto:alex@fallingupwards.co.uk" className="text-[#0B4073] hover:underline">alex@fallingupwards.co.uk</a>
              </div>
              <div className="flex items-center text-[#0B4073]">
                <span className="mr-1">M:</span>
                <a href="tel:07301261544" className="hover:underline">07301 261 544</a>
              </div>
              <div className="flex items-center text-[#0B4073]">
                <a href="https://www.fallingupwards.co.uk" className="hover:underline">www.fallingupwards.co.uk</a>
              </div>
            </div>
          </div>

          {/* Certification Images */}
          <div className="flex flex-row items-center space-x-6 mt-4">
            <Image 
              src="/images/BACP-Logo.png" 
              alt="BACP Certification" 
              width={150} 
              height={100}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#0B4073] py-3">
        <div className="container-custom mx-auto flex flex-col md:flex-row justify-between items-center text-white text-sm">
          <div>
            <p>Copyright © {currentYear} Fallingupward. All rights reserved. Powered by FALLINGUPWARD</p>
          </div>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <Link href="/terms-of-service" className="hover:underline">Terms of Services</Link>
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/cookie-policy" className="hover:underline">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
