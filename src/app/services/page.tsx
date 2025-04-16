'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { HeroSection } from '@/components/HeroSection';

const servicesData = [
  {
    id: 'digital-evolution',
    title: 'Digital Evolution and AI Adoption',
    description: 'We help organizations navigate the complex landscape of digital transformation and AI integration, ensuring technology serves human needs and enhances wellbeing rather than creating additional stress.',
    image: '/images/services/digital-evolution.jpg',
    benefits: [
      'Human-centered digital transformation strategies',
      'Ethical AI implementation and governance',
      'Managing digital change with psychological insights',
      'Building digital resilience in teams and leadership',
      'Reducing technology-related stress and burnout'
    ],
    link: '/services/digital-evolution'
  },
  {
    id: 'executive-mentoring',
    title: 'Executive Mentoring & Boardroom Support',
    description: 'We provide specialized mentoring and support for executives and board members, helping them navigate complex leadership challenges with psychological insights and evidence-based approaches.',
    image: '/images/services/executive-mentoring.jpg',
    benefits: [
      'One-to-one executive mentoring',
      'Board development and effectiveness',
      'Leadership team dynamics and conflict resolution',
      'Strategic decision-making with psychological awareness',
      'Building psychological safety in leadership teams'
    ],
    link: '/services/executive-mentoring'
  },
  {
    id: 'psychological-therapy',
    title: 'Psychological Therapy',
    description: 'Our psychological therapy services provide a safe, confidential space for individuals to explore challenges, process difficult experiences, and develop strategies for positive change and growth.',
    image: '/images/services/psychological-therapy.jpg',
    benefits: [
      'Evidence-based therapeutic approaches',
      'Trauma-informed care',
      'Support for anxiety, stress, and depression',
      'Relationship and interpersonal challenges',
      'Life transitions and identity exploration'
    ],
    link: '/services/psychological-therapy'
  },
  {
    id: 'adhd-coaching',
    title: 'ADHD Coaching',
    description: 'Our specialized ADHD coaching services help individuals harness their unique cognitive style, develop effective strategies, and thrive in both personal and professional environments.',
    image: '/images/services/adhd-coaching.jpg',
    benefits: [
      'Personalized strategies for executive functioning',
      'Work and study environment optimization',
      'Harnessing ADHD strengths and managing challenges',
      'Building sustainable routines and habits',
      'Developing self-advocacy skills'
    ],
    link: '/services/adhd-coaching'
  }
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(servicesData[0]);

  return (
    <div className="font-roboto">
      {/* Hero Section */}
      <HeroSection
        title="Our Services"
        subtitle="We offer a range of psychology-driven services to help individuals and organizations thrive"
        backgroundImage="/images/backgrounds/Digital-Evolution -Ai-Adoption.JPG"
        height="medium"
        textPosition="left"
      />
      
      <div className="py-16">
        <div className="container-custom mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/" className="text-[#6A8EA0] hover:text-[#4A6E80] inline-flex items-center">
              <FiArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {servicesData.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                    activeService.id === service.id
                      ? 'bg-[#6A8EA0] text-white'
                      : 'bg-[#D6E2EA]/30 text-gray-700 hover:bg-[#D6E2EA]/50'
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#6A8EA0] mb-4">{activeService.title}</h2>
                  <p className="text-gray-600 mb-6">{activeService.description}</p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Focus Areas:</h3>
                  <ul className="space-y-2 mb-6">
                    {activeService.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-[#6A8EA0] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <Link 
                    href={activeService.link} 
                    className="bg-[#6A8EA0] text-white px-6 py-3 rounded-full hover:bg-[#4A6E80] transition-colors inline-flex items-center"
                  >
                    Learn more <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
              <div className="h-64 md:h-auto">
                <div className="w-full h-full relative">
                  <Image 
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#D6E2EA]/20 rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-[#6A8EA0] mb-4">Not sure which service you need?</h2>
              <p className="text-gray-600 mb-8">
                We offer a complimentary initial consultation to understand your needs and recommend the most appropriate approach for your situation.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-[#6A8EA0] text-white px-8 py-3 rounded-full hover:bg-[#4A6E80] transition-colors"
              >
                Contact us for guidance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
