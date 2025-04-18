'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { HeroSection } from '@/components/HeroSection';

const offersData = [
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
    link: '/our-services/digital-evolution'
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
    link: '/our-services/executive-mentoring'
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
    link: '/our-services/psychological-therapy'
  },
  {
    id: 'neurodiversity',
    title: 'Neurodiversity as a strategic advantage',
    description: 'Our specialized ADHD coaching services help individuals harness their unique cognitive style, develop effective strategies, and thrive in both personal and professional environments.',
    image: '/images/services/adhd-coaching.jpg',
    benefits: [
      'Personalized strategies for executive functioning',
      'Work and study environment optimization',
      'Harnessing ADHD strengths and managing challenges',
      'Building sustainable routines and habits',
      'Developing self-advocacy skills'
    ],
    link: '/our-services/neurodiversity'
  }
];

export default function OurOffersPage() {
  const [activeOffer, setActiveOffer] = useState(offersData[0]);

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
            <Link href="/" className="text-[#072E53] hover:text-[#4A6E80] inline-flex items-center">
              <FiArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {offersData.map((offer) => (
                <button
                  key={offer.id}
                  onClick={() => setActiveOffer(offer)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                    activeOffer.id === offer.id
                      ? 'bg-[#7094B7] text-white'
                      : 'bg-[#D6E2EA]/30 text-gray-700 hover:bg-[#D6E2EA]/50'
                  }`}
                >
                  {offer.title}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#6A8EA0] mb-4">{activeOffer.title}</h2>
                  <p className="text-gray-600 mb-6">{activeOffer.description}</p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Focus Areas:</h3>
                  <ul className="space-y-2 mb-6">
                    {activeOffer.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-[#6A8EA0] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <Link 
                    href={activeOffer.link} 
                    className="bg-[#6A8EA0] text-white px-6 py-3 rounded-full hover:bg-[#4A6E80] transition-colors inline-flex items-center"
                  >
                    Learn more <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
              <div className="h-64 md:h-auto">
                <div className="w-full h-full relative">
                  <Image 
                    src={activeOffer.image}
                    alt={activeOffer.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
         {/* Consultation Booking Section - Refined Design */}
  <section className="relative py-20 md:py-24 px-10">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/backgrounds/consultation-bg.jpg" 
            alt="Consultation Background" 
            fill 
            className="object-cover brightness-[0.3]" 
            priority
          />
        </div>
        
        <div className="flex flex-col md:flex-row items-center container-custom mx-auto relative z-10 px-4 md:px-0">
          {/* Left Side (Text) */}
          <div className="w-full md:flex-1 text-center md:text-left mb-12 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Book a Free Consultation
            </h2>
            <p className="text-lg text-white opacity-80 max-w-2xl mx-auto md:mx-0">
              Select one of our services to book your free consultation with us.
            </p>
          </div>
          
          {/* Right Side (Consultation Options) */}
          <div className="w-full md:w-auto flex flex-col space-y-4 md:space-y-6 md:ml-10">
            {[
              { type: 'digital', title: 'Digital Evolution & AI Adoption' },
              { type: 'executive', title: 'Executive Mentoring & Boardroom Support' },
              { type: 'psychological', title: 'Psychological Therapy' },
              { type: 'neurodiversity', title: 'Neurodiversity as a strategic advantage' }
            ].map(({ type, title }) => (
              <Link 
                key={type} 
                href={`/book/${type}`} 
                className="group w-full"
              >
                <div className="bg-[#0B4073]/90 backdrop-blur-sm hover:bg-[#0B4073] text-white rounded-full py-3 md:py-5 px-5 md:px-8 flex items-center justify-between transition-all duration-300 w-full">
                  <span className="font-medium text-base md:text-lg">{title}</span>
                  <div className="bg-[#D6E2EA] rounded-full p-2 md:p-3 ml-2 md:ml-4 flex-shrink-0 text-[#0B4073] group-hover:bg-[#D6E2EA]/90 transition-all">
                    <FiArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
