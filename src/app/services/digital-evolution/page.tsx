'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { HeroSection } from '@/components/HeroSection';

export default function DigitalEvolutionPage() {
  return (
    <div className="font-roboto">      
      {/* Hero Section */}
      <HeroSection
        title="Digital Evolution and AI Adoption"
        subtitle="We help organizations navigate the complex landscape of digital transformation and AI integration, ensuring technology serves human needs and enhances wellbeing."
        backgroundImage="/images/backgrounds/Digital-Evolution -Ai-Adoption.JPG"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#6A8EA0]">Digital Evolution and AI Adoption</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We help organizations navigate the complex landscape of digital transformation and AI integration, ensuring technology serves human needs and enhances wellbeing rather than creating additional stress.
            </p>
            <div className="bg-[#D6E2EA]/30 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Our approach focuses on:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-[#6A8EA0] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Human-centered digital transformation strategies</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#6A8EA0] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Ethical AI implementation and governance</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#6A8EA0] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Managing digital change with psychological insights</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#6A8EA0] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Building digital resilience in teams and leadership</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="/images/services/digital-evolution.jpg" 
              alt="Digital Evolution and AI Adoption" 
              width={600} 
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
        
        {/* Content Sections */}
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-6 text-[#6A8EA0]">Why Digital Evolution Matters</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Digital transformation is not just about implementing new technologies—it's about evolving how organizations operate, think, and deliver value. When approached with psychological insights, digital evolution can enhance human potential rather than replace it.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our psychology-driven approach ensures that digital changes align with human needs, capabilities, and wellbeing, creating sustainable transformation that people embrace rather than resist.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-6 text-[#6A8EA0]">Our Digital Evolution Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#6A8EA0]">
                <h3 className="font-bold text-xl mb-3">Digital Change Management</h3>
                <p className="text-gray-600">
                  We help organizations navigate digital transitions with strategies that address the psychological aspects of change, reducing resistance and building engagement.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#6A8EA0]">
                <h3 className="font-bold text-xl mb-3">AI Readiness Assessment</h3>
                <p className="text-gray-600">
                  We evaluate your organization's cultural, structural, and psychological readiness for AI adoption, identifying potential barriers and opportunities.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#6A8EA0]">
                <h3 className="font-bold text-xl mb-3">Digital Wellbeing Programs</h3>
                <p className="text-gray-600">
                  We design initiatives that help employees maintain psychological wellbeing while adapting to increasingly digital work environments.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#6A8EA0]">
                <h3 className="font-bold text-xl mb-3">Ethical AI Framework Development</h3>
                <p className="text-gray-600">
                  We help organizations create governance frameworks that ensure AI is implemented ethically, transparently, and with human wellbeing at the center.
                </p>
              </div>
            </div>
          </section>
          
          <section className="bg-[#D6E2EA]/20 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-[#6A8EA0] text-center">Ready to evolve your digital approach?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us to discuss how our psychology-driven approach to digital evolution can help your organization thrive in the digital age while enhancing human potential.
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
