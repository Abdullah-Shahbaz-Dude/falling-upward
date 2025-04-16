'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { HeroSection } from '@/components/HeroSection';

export default function ExecutiveMentoringPage() {
  return (
    <div className="font-roboto">
      {/* Hero Section */}
      <HeroSection
        title="Executive Mentoring & Boardroom Support"
        subtitle="We provide specialized mentoring and support for executives and board members, helping them navigate complex leadership challenges."
        backgroundImage="/images/backgrounds/Executive-Mentoring-for-Individuals-&-Boards.jpg"
        height="medium"
        textPosition="left"
      />
      <div className="container-custom mx-auto pt-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/services" className="text-[#6A8EA0] hover:text-[#4A6E80] inline-flex items-center">
            <FiArrowLeft className="mr-2" />
            Back to Services
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#6A8EA0]">Executive Mentoring & Boardroom Support</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We provide specialized mentoring and support for executives and board members, helping them navigate complex leadership challenges with psychological insights and evidence-based approaches.
            </p>
            <div className="bg-[#D6E2EA]/30 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Our executive services include:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-[#6A8EA0] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>One-to-one executive mentoring</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#6A8EA0] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Board development and effectiveness</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#6A8EA0] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Leadership team dynamics and conflict resolution</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#6A8EA0] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Strategic decision-making with psychological awareness</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="/images/services/executive-mentoring.jpg" 
              alt="Executive Mentoring & Boardroom Support" 
              width={600} 
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
        
        {/* Content Sections */}
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-6 text-[#6A8EA0]">The Psychology of Leadership</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Effective leadership is as much about psychological insight as it is about business acumen. Understanding how human behavior, motivation, and decision-making work at a deeper level can transform how executives lead their organizations.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our psychology-driven approach to executive mentoring helps leaders develop greater self-awareness, emotional intelligence, and interpersonal effectiveness, enabling them to create environments where people and organizations thrive.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-6 text-[#6A8EA0]">Our Executive Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#6A8EA0]">
                <h3 className="font-bold text-xl mb-3">Executive Mentoring</h3>
                <p className="text-gray-600">
                  Personalized one-to-one support for executives navigating complex leadership challenges, helping them develop psychological resilience and strategic clarity.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#6A8EA0]">
                <h3 className="font-bold text-xl mb-3">Board Development</h3>
                <p className="text-gray-600">
                  Programs to enhance board effectiveness, improve decision-making processes, and build constructive board dynamics based on psychological safety and trust.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#6A8EA0]">
                <h3 className="font-bold text-xl mb-3">Leadership Team Facilitation</h3>
                <p className="text-gray-600">
                  Expert facilitation of leadership team sessions to resolve conflicts, align on strategic priorities, and build more effective working relationships.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#6A8EA0]">
                <h3 className="font-bold text-xl mb-3">Executive Transition Support</h3>
                <p className="text-gray-600">
                  Specialized support for executives transitioning into new leadership roles, helping them navigate the psychological challenges of change and establish effective leadership quickly.
                </p>
              </div>
            </div>
          </section>
          
          <section className="bg-[#D6E2EA]/20 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-[#6A8EA0] text-center">Ready to elevate your leadership?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us to discuss how our psychology-driven executive mentoring and boardroom support can help you and your leadership team achieve greater effectiveness and impact.
            </p>
            <div className="text-center">
              <Link 
                href="/contact" 
                className="bg-[#6A8EA0] text-white px-8 py-3 rounded-full hover:bg-[#4A6E80] transition-colors inline-flex items-center"
              >
                Get in Touch
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
