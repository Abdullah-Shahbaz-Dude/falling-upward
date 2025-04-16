'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { HeroSection } from '@/components/HeroSection';

export default function PsychologicalTherapyPage() {
  return (
    <div className="font-roboto">
      {/* Hero Section */}
      <HeroSection
        title="Psychological Therapy"
        subtitle="Our psychological therapy services provide a safe, confidential space for individuals to explore challenges and develop strategies for positive change."
        backgroundImage="/images/backgrounds/Psychological-Therapy -Page.JPG"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#6A8EA0]">Psychological Therapy</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our psychological therapy services provide a safe, confidential space for individuals to explore challenges, process difficult experiences, and develop strategies for positive change and growth.
            </p>
            <div className="bg-[#D6E2EA]/30 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Our therapy approach addresses:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-[#6A8EA0] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Anxiety, stress, and depression</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#6A8EA0] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Past trauma and difficult life experiences</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#6A8EA0] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Relationship challenges and interpersonal difficulties</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#6A8EA0] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Life transitions and identity exploration</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="/images/services/psychological-therapy.jpg" 
              alt="Psychological Therapy" 
              width={600} 
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
        
        {/* Content Sections */}
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-6 text-[#6A8EA0]">Our Therapeutic Approach</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We believe that effective therapy is built on a foundation of trust, empathy, and psychological safety. Our approach integrates evidence-based therapeutic methods with a deep respect for each individual's unique experiences and needs.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Rather than offering a one-size-fits-all approach, we draw from various therapeutic modalities including cognitive-behavioral therapy, psychodynamic approaches, mindfulness-based interventions, and trauma-informed care to create a personalized therapeutic experience.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-6 text-[#6A8EA0]">Our Therapy Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#6A8EA0]">
                <h3 className="font-bold text-xl mb-3">Individual Therapy</h3>
                <p className="text-gray-600">
                  One-to-one therapy sessions tailored to your specific needs, providing a confidential space to explore challenges, develop insights, and create meaningful change.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#6A8EA0]">
                <h3 className="font-bold text-xl mb-3">Trauma-Focused Therapy</h3>
                <p className="text-gray-600">
                  Specialized therapeutic approaches for processing and healing from traumatic experiences, with an emphasis on safety, stabilization, and integration.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#6A8EA0]">
                <h3 className="font-bold text-xl mb-3">Therapy for Anxiety & Depression</h3>
                <p className="text-gray-600">
                  Evidence-based approaches to help manage symptoms of anxiety and depression while addressing underlying patterns and developing new coping strategies.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#6A8EA0]">
                <h3 className="font-bold text-xl mb-3">Relationship Therapy</h3>
                <p className="text-gray-600">
                  Support for navigating relationship challenges, improving communication, and developing healthier patterns of connection with others.
                </p>
              </div>
            </div>
          </section>
          
          <section className="bg-[#D6E2EA]/20 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-[#6A8EA0] text-center">Ready to begin your therapeutic journey?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Taking the first step toward therapy can be challenging. We're here to make the process as comfortable as possible. Contact us to schedule an initial consultation and learn more about how our therapeutic approach can support your wellbeing.
            </p>
            <div className="text-center">
              <Link 
                href="/contact" 
                className="bg-[#6A8EA0] text-white px-8 py-3 rounded-full hover:bg-[#4A6E80] transition-colors inline-flex items-center"
              >
                Schedule a Consultation
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
