'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { HeroSection } from '@/components/HeroSection';

export default function ADHDCoachingPage() {
  return (
    <div className="font-roboto">
      {/* Hero Section */}
      <HeroSection
        title="ADHD Coaching"
        subtitle="Our specialized ADHD coaching services help individuals harness their unique cognitive style and thrive in both personal and professional environments."
        backgroundImage="/images/backgrounds/ADHD-Coaching.JPG"
        height="medium"
        textPosition="left"
      />
      <div className="container-custom mx-auto pt-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/services" className="text-[#0B4073] hover:text-[#7094B7] inline-flex items-center">
            <FiArrowLeft className="mr-2" />
            Back to Services
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0B4073]">ADHD Coaching</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our specialized ADHD coaching services help individuals harness their unique cognitive style, develop effective strategies, and thrive in both personal and professional environments.
            </p>
            <div className="bg-[#D6E2EA]/30 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Our ADHD coaching focuses on:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-[#7094B7] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Personalized strategies for executive functioning</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#7094B7] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Work and study environment optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#7094B7] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Harnessing ADHD strengths and managing challenges</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#7094B7] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Building sustainable routines and habits</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="/images/services/adhd-coaching.jpg" 
              alt="ADHD Coaching" 
              width={600} 
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
        
        {/* Content Sections */}
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-6 text-[#0B4073]">Understanding ADHD</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              ADHD is not simply a deficit or disorder—it's a different cognitive style that comes with both challenges and strengths. Our approach recognizes the unique neurological differences in ADHD and focuses on working with, rather than against, your natural cognitive patterns.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We believe that with the right strategies, environmental adjustments, and self-understanding, individuals with ADHD can thrive and leverage their unique strengths such as creativity, hyperfocus, and out-of-the-box thinking.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-6 text-[#0B4073]">Our ADHD Coaching Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#7094B7]">
                <h3 className="font-bold text-xl mb-3">Individual ADHD Coaching</h3>
                <p className="text-gray-600">
                  Personalized one-to-one coaching to develop strategies for executive functioning, time management, organization, and harnessing your unique ADHD strengths.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#7094B7]">
                <h3 className="font-bold text-xl mb-3">Workplace ADHD Strategies</h3>
                <p className="text-gray-600">
                  Specialized coaching for navigating workplace challenges, optimizing your work environment, and communicating effectively with colleagues and managers.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#7094B7]">
                <h3 className="font-bold text-xl mb-3">ADHD & Academic Success</h3>
                <p className="text-gray-600">
                  Support for students with ADHD to develop effective study strategies, manage academic workloads, and advocate for appropriate accommodations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#7094B7]">
                <h3 className="font-bold text-xl mb-3">ADHD Parent Coaching</h3>
                <p className="text-gray-600">
                  Guidance for parents of children with ADHD to create supportive home environments, develop effective parenting strategies, and advocate for their child's needs.
                </p>
              </div>
            </div>
          </section>
          
          <section className="bg-[#D6E2EA]/20 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-[#6A8EA0] text-center">Ready to transform your ADHD experience?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us to learn how our specialized ADHD coaching can help you develop strategies that work with your unique cognitive style and transform challenges into opportunities for growth and success.
            </p>
            <div className="text-center">
              <Link 
                href="/contact" 
                className="bg-[#6A8EA0] text-white px-8 py-3 rounded-full hover:bg-[#4A6E80] transition-colors inline-flex items-center"
              >
                Get Started
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
