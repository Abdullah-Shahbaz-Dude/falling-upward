'use client';
import { motion } from 'framer-motion';
import React, { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiArrowLeft, FiCheck, FiUsers, FiAward, FiActivity, FiMail, FiPhone, FiHeart, FiBriefcase, FiStar, FiCpu,
  FiChevronDown, FiChevronLeft, FiChevronRight, FiCalendar, FiTarget, FiBarChart2, FiZap, FiEye, FiSmile, FiShield,
  FiTrendingUp, FiMessageCircle, FiInfo, FiArrowRight
} from 'react-icons/fi';
import { HeroSection } from '@/components/HeroSection';
import { BarChart2, Brain, ClipboardCheck, Lightbulb, Link2, Users } from 'lucide-react';

function ADHDCoachingContent() {
  const [activeSection, setActiveSection] = useState('individual');

  // ADHD Coaching challenges with icons
  const challenges = [
    { text: "Do you struggle with overthinking and getting lost in your thoughts?", icon: FiCpu },
    { text: "start tasks but abandon them halfway through?", icon: FiActivity },
    { text: "Do you find it hard to relax or feel mentally exhausted all the time?", icon: FiZap },
    { text: "Do you experience brain fog and struggle to think clearly?", icon: FiEye },
    { text: "Are mornings difficult, leaving you groggy and unmotivated?", icon: FiCalendar },
    { text: "Do you have trouble maintaining a consistent routine with diet, exercise, or self-care?", icon: FiHeart },
    { text: "Do you feel overly sensitive to criticism or fear rejection?", icon: FiShield },
    { text: "Do you seek reassurance from others but struggle to trust your own decisions?", icon: FiUsers },
    { text: "Do you overcomplicate things, making it hard to follow through on your goals?", icon: FiCpu },
    { text: "Are you easily distracted by noise, visual stimuli, or your environment?", icon: FiBarChart2 },
    { text: "Do you find it difficult to set and maintain personal boundaries?", icon: FiTarget },
    { text: "Do you struggle with emotional regulation, feeling intense highs and lows?", icon: FiTrendingUp },
    { text: "Feel shame as you think you do not fit in and repeat cycles?", icon: FiSmile },
    { text: "Do you analyse every interaction, worrying about how others perceive you?", icon: FiMessageCircle },
    { text: "Do you often procrastinate?", icon: FiChevronRight },
    { text: "Have you felt stuck in unhealthy relationships, struggling to move on?", icon: FiHeart },
    { text: "Do you find you are overly sensitive to rejection?", icon: FiShield },
  ];

  // ADHD Coaching approach
  const coachingApproach = [
    { title: "Identify Your Strengths & Challenges", description: "Understand how ADHD uniquely affects you and leverage your strengths to create practical strategies." },
    { title: "Develop Systems & Routines That Work for You", description: "Learn how to set up realistic routines that help you stay on track without feeling overwhelmed." },
    { title: "Improve Emotional Regulation & Resilience", description: "Build skills to manage overthinking, rejection sensitivity, and emotional fluctuations." },
    { title: "Increase Focus & Reduce Procrastination", description: "Discover tools and techniques to improve time management and task completion." },
    { title: "Enhance Decision-Making & Self-Trust", description: "Learn to trust your own judgement, reduce reliance on external validation, and build self-confidence." },
    { title: "Navigate Relationships & Boundaries", description: "Gain skills in communication, boundary-setting, and emotional balance in personal and professional relationships." },
    { title: "Optimise Productivity & Motivation", description: "Find strategies to work with your ADHD brain rather than against it, increasing efficiency and satisfaction in your work or business." },
  ];

  // ADHD Coaching outcomes
  const coachingOutcomes = [
    "A clearer understanding of how your ADHD affects you",
    "Reduced stress, anxiety, and emotional overwhelm",
    "Increased self-awareness and self-acceptance",
    "Better habits and routines that support your energy levels",
    "Improved relationships through stronger communication and boundary-setting",
    "A more structured approach to work, career growth, or parenting",
    "A sense of empowerment and control over your life"
  ];

  // Neurodiversity business advantages
  const neuroDiversityAdvantages = [
    { title: "Independent thinking", description: "Less influenced by group norms or 'how it's always been done'" },
    { title: "Creative insight", description: "Driven by hyperfocus, lateral thinking, and deep special interests" },
    { title: "Unique problem-solving", description: "Thriving in complexity, ambiguity, and edge-case scenarios" },
    { title: "Constructive disruption", description: "Challenging assumptions in ways that drive progress" },
  ];

  // Neurodiversity business offerings
  const businessOfferings = [
    { title: "Reimagine recruitment, onboarding, and team design through a neuro-inclusive lens" },
    { title: "Audit invisible barriers to inclusion and innovation" },
    { title: "Turn 'reasonable adjustments' into performance accelerators" },
    { title: "Build trust-rich, high-performing teams that don't just include neurodivergent thinkers—they thrive because of them" },
  ];

  // Neurodiversity business outcomes
  const businessOutcomes = [
    "More original ideas and fewer 'safe' defaults",
    "A culture that turns flexibility into strategic advantage",
    "Practical frameworks for inclusive hiring and development",
    "Teams that feel seen, trusted, and enabled",
    "Leaders who champion difference as a driver of transformation"
  ];

  return (
    <div className="min-h-screen bg-[#F9FBFD]">
      <HeroSection 
        title="ADHD Coaching" 
        subtitle="Unlock your potential with psychology-informed ADHD coaching"
        backgroundImage="/images/services/IMG_7552.jpg"
      />
      
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Section Toggle */}
        <div className="mb-10">
          <div className="flex justify-center space-x-4 bg-white rounded-full p-2 shadow-md max-w-3xl mx-auto">
            <button 
              onClick={() => setActiveSection('individual')}
              className={`px-6 py-3 rounded-full transition-all ${
                activeSection === 'individual' 
                  ? 'bg-[#0B4073] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Individual ADHD Coaching
            </button>
            <button 
              onClick={() => setActiveSection('business')}
              className={`px-6 py-3 rounded-full transition-all ${
                activeSection === 'business' 
                  ? 'bg-[#0B4073] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Neurodiversity for Business
            </button>
          </div>
        </div>

        {activeSection === 'individual' ? (
          /* Individual ADHD Coaching Content */
          <div className="individual-coaching-content">
            {/* Introduction Section */}
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B4073] mb-6">Unlock Your Potential with ADHD Coaching</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                ADHD coaching provides personalized support to help you harness your unique brain wiring. 
                Whether you're seeking diagnosis clarity, struggling with executive function, or looking to 
                optimize your productivity, our coaching helps you build strategies that work with your brain, not against it.
              </p>
            </div>
            
            {/* Do Any of These Sound Familiar? Section */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-16">
              <h3 className="text-2xl font-bold text-[#0B4073] mb-6 text-center">Do Any of These Sound Familiar?</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start p-3 rounded-lg hover:bg-[#F0F5F8] transition-colors">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <challenge.icon className="text-[#6A8EA0] text-xl" />
                    </div>
                    <p className="text-gray-700">{challenge.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-700 italic">
                  Whilst some of the above is directly associated with ADHD, some of it may not be. 
                  Coaching will help you understand this better and develop a clearer path forward.
                </p>
              </div>
            </div>

            {/* Who Is This Coaching For? Section */}
            <div className="mb-16">
              <div className="bg-[#F0F5F8] rounded-xl p-8">
                <h3 className="text-2xl font-bold text-[#0B4073] mb-6">Who Is This Coaching For?</h3>
                
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    Whether you are an adult navigating ADHD in the workplace, a business owner struggling with focus and organisation, 
                    a parent managing the complexities of family life, or someone looking to understand if they have ADHD and are unsure what to do, 
                    this coaching is for you.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Are you struggling with focus, motivation, or feeling overwhelmed in your personal or professional life? 
                    Do you often feel like your brain is working against you rather than with you? ADHD can impact various areas of life, 
                    from relationships and career success to parenting and self-esteem. My coaching is designed to help you navigate these challenges, 
                    understand yourself better, and create strategies that work for you.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">
                    I have ADHD myself and have real world experience of a lot of the challenges associated with ADHD, 
                    however I also thrive with in equal measure as I have learnt how to make the most of the condition. 
                    Which Is what I would like to help you do.
                  </p>
                </div>
              </div>
            </div>
            
            {/* How I Work Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-[#0B4073] mb-6 text-center">How I Work</h3>
              
              <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
                I take a holistic, personalised approach to ADHD coaching, combining evidence-based strategies with real-world experience. 
                Sessions are tailored to your unique needs, whether you're looking for structure in your daily life, better emotional regulation, 
                or guidance in navigating relationships and career decisions. Together, we will:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {coachingApproach.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 mr-4 bg-[#D6E2EA] p-3 rounded-full">
                      <FiCheck className="text-[#0B4073] text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0B4073] mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* What You Can Expect to Achieve Section */}
            <div className="mb-16 bg-[#0B4073] text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">What You Can Expect to Achieve</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coachingOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <FiCheck className="text-teal-300 text-xl" />
                    </div>
                    <p>{outcome}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-lg font-medium">
                  ADHD doesn't have to hold you back. With the right strategies and support, you can thrive and achieve your goals in a way that works for you.
                </p>
              </div>
            </div>

            {/* Call to Action Section */}
            <section className="mb-16 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-[#0B4073] mb-4">Ready to Start Your Journey?</h2>
                <p className="text-lg text-gray-700 mb-8">
                  Book a free consultation to discuss how ADHD coaching can help you unlock your potential and thrive.
                </p>
                <Link 
                  href="/book?type=adhd" 
                  className="inline-flex items-center bg-[#0B4073] text-white px-8 py-3 rounded-full hover:bg-[#083258] transition-colors"
                >
                  <span>Book a Free Consultation</span>
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </section>
          </div>
        ) : (
          /* Neurodiversity for Strategic Advantage Content */
          <div className="business-neurodiversity-content">
            {/* Introduction Section */}
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B4073] mb-6">Neurodiversity for Strategic Advantage</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Training & Strategic Workshops for Businesses and Startups
              </p>
            </div>
            
            {/* Main Concept Section */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-16">
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-[#0B4073] font-medium mb-4 text-center">
                  Neurodiversity can disrupt default thinking. and that's exactly what makes it valuable.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Innovation doesn't come from consensus; it comes from difference. Neurodivergent
                  individuals can challenge norms, question assumptions, and approach problems from
                  unexpected angles. This can be essential for businesses that want to grow, adapt, and lead.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  In environments where innovation and adaptability are vital, neurodiverse teams consistently
                  deliver more original thinking. They are people wired to push beyond conventional patterns.
                  They don't just solve problems. They solve problems differently.
                </p>
              </div>
            </div>
            
            {/* Why Neurodivergent Talent is a Competitive Advantage */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-[#0B4073] mb-6 text-center">Why Neurodivergent Talent is a Competitive Advantage</h3>
              
              <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
                People with ADHD, Autism, Dyslexia, and other neurodivergences often bring:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {neuroDiversityAdvantages.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-[#0B4073] mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-[#F0F5F8] p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  Their strengths often become most visible when the environment meets them halfway.
                  In many cases, neurodivergent individuals may request "reasonable adjustments" to how they
                  work, whether that's flexible hours, different communication styles, or a quieter workspace.
                  Too often, these adjustments can be seen as exceptions or compromises.
                </p>
                
                <p className="text-gray-700 leading-relaxed mt-4 font-medium">
                  We see them differently.
                </p>
                
                <p className="text-gray-700 leading-relaxed mt-4">
                  These adjustments are strategic clues. They reveal how to get the best out of people who
                  think differently. When embraced, they don't just support individuals, they improve team
                  performance, employee retention, and culture at large.
                </p>
              </div>
            </div>
            
            {/* What We Offer Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-[#0B4073] mb-6 text-center">What We Offer</h3>
              
              <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
                We help businesses reframe neurodiversity from a workplace challenge to a strategic design
                principle.
              </p>
              
              <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
                Through psychology-led training, facilitation and leadership advisory, we support:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                  <h4 className="font-semibold text-[#0B4073] mb-2">Business owners and senior leaders</h4>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                  <h4 className="font-semibold text-[#0B4073] mb-2">Innovation teams, startups, and scale-ups</h4>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                  <h4 className="font-semibold text-[#0B4073] mb-2">Organisations aiming to build cultures of deep inclusion and high performance</h4>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
                We work with you to:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {businessOfferings.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 mr-4 bg-[#D6E2EA] p-3 rounded-full">
                      <FiCheck className="text-[#0B4073] text-xl" />
                    </div>
                    <p className="text-gray-700">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Outcomes You Can Expect Section */}
            <div className="mb-16 bg-[#0B4073] text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Outcomes You Can Expect</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <FiCheck className="text-teal-300 text-xl" />
                    </div>
                    <p>{outcome}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action Section */}
            <section className="mb-16 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-[#0B4073] mb-4">Ready to Harness Neurodiversity?</h2>
                <p className="text-lg text-gray-700 mb-8">
                  Book a free consultation to discuss how our neurodiversity training and workshops can benefit your organization.
                </p>
                <Link 
                  href="/book?type=neurodiversity" 
                  className="inline-flex items-center bg-[#0B4073] text-white px-8 py-3 rounded-full hover:bg-[#083258] transition-colors"
                >
                  <span>Book a Free Consultation</span>
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ADHDCoachingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-xl text-gray-600 font-[Roboto]" style={{ color: '#7094B7' }}>Loading ADHD coaching resources...</div>
    </div>}>
      <ADHDCoachingContent />
    </Suspense>
  );
}
