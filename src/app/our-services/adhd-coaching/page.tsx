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
  const [isOpen, setIsOpen] = useState(false);
  const offerings = [
    {
      title: "Natural disruptors",
      description: "less influenced by social conformity",
      bgColor: "bg-blue-50"
    },
    {
      title: "Idea generators",
      description: "driven by deep interests and unconventional connections",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Problem solvers",
      description: "approaching challenges from unique cognitive angles",
      bgColor: "bg-purple-50"
    },
    {
      title: "Hyper-focused or hyper-curious",
      description: "unlocking creative insight others miss",
      bgColor: "bg-teal-50"
    }
  ];
  const packages = [
    {
      title: "Awareness Workshop (Half–Day or Full–Day)",
      description: "A highly interactive session designed to shift mindsets and bust myths.",
      features: [
        "Understand neurodiversity: ADHD, Autism, Dyslexia, and more",
        "Reframe “difference” as “competitive advantage”",
        "Explore how team structures and workplace norms unconsciously"
      ],
      buttonColor: "bg-[#E5ECF6]",
      textColor: "text-[#0B4073]"
    },
    {
      title: "Strategic Integration Programme (4–6 Weeks)",
      description: "For startups and growth-phase businesses ready to unlock team potential.",
      features: [
        "Audit of current team dynamics and inclusion barriers",
        "Role-based neurodiversity integration strategies",
        "Psychological safety, trust-building and innovation sprints",
        "Best practices for hiring, onboarding, and retaining neurodiverse talent"
      ],
      buttonColor: "bg-[#E5ECF6]",
      textColor: "text-[#0B4073]"
    },
    {
      title: "Innovation Through Neurodiversity (Custom Package)",
      description: "Ideal for forward-thinking organisations, incubators, or VCs.",
      features: [
        "Bespoke training, keynote, or facilitation",
        "Rapid idea incubation powered by neurodiverse teams",
        "1:1 coaching support for neurodiverse employees and team leaders"
      ],
      buttonColor: "bg-[#E5ECF6]",
      textColor: "text-[#0B4073]"
    }
  ];

  const dropdownData = [
    {
      id: 1,
      title: 'Identify Your Strengths & Challenges',
      content:
        'Understand how ADHD uniquely affects you and leverage your strengths to create practical strategies.',
    },
    {
      id: 2,
      title: 'Improve Emotional Regulation & Resilience',
      content:
        'Build skills to manage overthinking, rejection sensitivity, and emotional fluctuations.',
    },
    {
      id: 3,
      title: 'Increase Focus & Reduce Procrastination',
      content:
        'Discover tools and techniques to improve time management and task completion.',
    },
    {
      id: 4,
      title: 'Enhance Decision-Making & Self-Trust',
      content:
        'Learn to trust your own judgement, reduce reliance on external validation, and build self-confidence.',
    },
    {
      id: 5,
      title: 'Navigate Relationships & Boundaries',
      content:
        'Gain skills in communication, boundary-setting, and emotional balance in personal and professional relationships.',
    },
    {
      id: 6,
      title: 'Optimise Productivity & Motivation',
      content:
        'Find strategies to work with your ADHD brain rather than against it, increasing efficiency and satisfaction in your work or business.',
    },
  ];
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (id: number): void => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const [activeSection, setActiveSection] = useState('individual');

  // ADHD Coaching challenges with icons
  const challenges = [
    { text: "ing and getting lost in your thoughts?", icon: FiCpu },
    { text: "Do you frequently start tasks but abandon them halfway through?", icon: FiActivity },
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
  const neurodiversity = [
    "Is your organisation truly future-ready, or just diverse on paper?",
    "Do your innovation goals rely on people thinking outside the box – but your workplace rewards staying inside it?",
    "Have you ever stopped to consider that your most unconventional thinker might be your most valuable asset?",
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
    { title: "Natural disruptors" },
    { title: "Idea generators" },
    { title: "Problem solvers" },
    { title: "Hyper-focused or hyper-curious" },
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
        title="Neurodiversity as a strategic advantage" 
        subtitle="Unlock your potential with psychology-informed ADHD coaching"
        backgroundImage="/images/services/IMG_7552.jpg"
      />


<section className="relative pt-0 py-20 bg-gradient-to-br from-[#EFF6FB] pb-0  via-[#F7FAFC] to-white overflow-hidden">
        <div className="container-custom mx-auto pt-16">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/our-services" className="text-[#0B4073] hover:text-[#072e53] inline-flex items-center transition-colors duration-200">
              <FiArrowLeft className="mr-2" />
              Back to Our Services
            </Link>
          </div>
        </div>
      </section>
      
        {/* Section Toggle - Card Selection Style */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <button
              onClick={() => setActiveSection('individual')}
              className={`group p-6 rounded-xl transition-all duration-300 flex flex-col items-center text-center ${activeSection === 'individual'
                ? 'bg-[#0B4073] text-white shadow-lg'
                : 'bg-white hover:bg-[#D6E2EA]/30 text-gray-700 shadow-md hover:shadow-lg'
                }`}
            >
              <div className={`p-4 rounded-full mb-4 ${activeSection === 'individual' ? 'bg-white/20' : 'bg-[#D6E2EA]'}`}>
                <FiUsers className={`w-8 h-8 ${activeSection === 'individual' ? 'text-white' : 'text-[#0B4073]'}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">Individual ADHD Coaching</h3>
              <p className={`text-sm ${activeSection === 'individual' ? 'text-white/80' : 'text-gray-600'}`}>
                Personalized support for individuals with ADHD
              </p>
            </button>
            
            <button
              onClick={() => setActiveSection('business')}
              className={`group p-6 rounded-xl transition-all duration-300 flex flex-col items-center text-center ${activeSection === 'business'
                ? 'bg-[#0B4073] text-white shadow-lg'
                : 'bg-white hover:bg-[#D6E2EA]/30 text-gray-700 shadow-md hover:shadow-lg'
                }`}
            >
              <div className={`p-4 rounded-full mb-4 ${activeSection === 'business' ? 'bg-white/20' : 'bg-[#D6E2EA]'}`}>
                <FiBriefcase className={`w-8 h-8 ${activeSection === 'business' ? 'text-white' : 'text-[#0B4073]'}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">Neurodiversity for Business</h3>
              <p className={`text-sm ${activeSection === 'business' ? 'text-white/80' : 'text-gray-600'}`}>
                Strategic advantage through neurodiversity
              </p>
            </button>
          </div>
        {activeSection === 'individual' ? (
          /* Individual ADHD Coaching Content */
          <div className="individual-coaching-content">
            {/* Introduction Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Heading */}
          <div className="mb-20 text-center mt-20">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B4073] leading-tight">
            Unlock Your Potential with ADHD Coaching
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Are any of these challenges holding you back?
            </p>
          </div>

          {/* List of challenges */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
            {[
              "Do you struggle with 	overthinking and getting lost in your thoughts?",
              "Do you frequently start tasks but abandon them halfway through?",
              "Do you find it hard to relax or feel mentally exhausted all the time?",
              "Do you experience brain fog and struggle to think clearly?",
              "Are mornings difficult, leaving you groggy and unmotivated?",
              "Do you have trouble maintaining a consistent routine with diet, exercise, or self-care?",
              "Do you feel overly sensitive to criticism or fear rejection?",
              "Do you seek reassurance from others but struggle to trust your own decisions?",
              "Do you overcomplicate things, making it hard to follow through on your goals?",
              "Are you easily distracted by noise, visual stimuli, or your environment?",
              "Do you find it difficult to set and maintain personal boundaries?",
              "Do you struggle with emotional regulation, feeling intense highs and lows?",
              "Feel shame as you think you do not fit in and repeat cycles",
              "Do 	you analyse every interaction, worrying about how others perceive 	you?",
              "Do 	you often procrstinate?",
              "Have 	you felt stuck in unhealthy relationships, struggling to move on?",
              "Do 	you find you are overly sensitive to rejection.",
            ].map((question, idx) => (
              <div
                key={idx}
                className="flex items-start p-6 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-[#0B4073] mt-1 mr-4 shrink-0">
                  <div className="flex items-center space-x-3">
                    <img
                      src="/favicon.ico" // Replace this with your image path
                      alt="icon"
                      className="h-6 w-6 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-base font-medium group-hover:text-[#0B4073] transition-colors duration-200">
                    </span>
                  </div>
                </div>
                <p className="text-gray-800 text-lg leading-relaxed">{question}</p>
              </div>
            ))}

          </div>
          
              
          <div className="mt-20 text-center max-w-4xl mx-auto ">
            <p className="text-2xl md:text-2xl text-gray-700 leading-relaxed">
            Whilst some of the above is directly assocated with <span className="font-semibold text-[#0B4073]">ADHD</span>, <span className="font-semibold text-[#0B4073]">some of it may not be</span>, and <span className="font-semibold text-[#0B4073]">coaching will help you understand this better and develop a better understand</span> to help you move forwards with clarity.
            </p>
          </div>
           </div>
           <div className="mb-16 mt-20 mx-5">
           <div className="bg-[#7094B7] rounded-xl overflow-hidden shadow-md">
          <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="coachingForContent"
          className="w-full    text-left px-8 py-6 md:px-16 md:py-8 flex items-center justify-between text-[#0B4073] bg-[#7094B7] font-bold text-2xl md:text-4xl focus:outline-none transition-colors hover:bg-[#5f86ad]"
           >
            Who Is This ADHD Coaching For?
            <FiChevronDown
              className={`ml-4 text-3xl text-[#0B4073] transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

                <div
                  id="coachingForContent"
                  className={`transition-all duration-500 ease-in-out bg-[#7094B7] px-8 md:px-16 ${
                    isOpen ? 'max-h-[1000px] py-8 space-y-6' : 'max-h-0 overflow-hidden py-0'
                  }`}
                >
                  <p className="text-white leading-relaxed">
                    Whether you are an adult navigating ADHD in the workplace, a business owner struggling with focus and organisation,
                    a parent managing the complexities of family life, or someone looking to understand if they have ADHD and are unsure
                    what to do, this coaching is for you.
                  </p>

                  <p className="text-white leading-relaxed">
                    You may be struggling with focus, motivation, or feeling overwhelmed in your personal or professional life. Do you often
                    feel like your brain is working against you rather than with you? ADHD can impact various areas of life, from relationships
                    and career success to parenting and self-esteem. My coaching is designed to help you navigate these challenges, understand
                    yourself better, and create strategies that work for you.
                  </p>

                  <p className="text-white leading-relaxed">
                    I have ADHD myself and have real-world experience of many of the challenges associated with it. However, I also thrive in
                    equal measure, as I’ve learned how to make the most of the condition — and that’s what I’d like to help you do.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Together We Will Section */}
            <div className="mb-24">
                  <div className="bg-[#D6E2EA] rounded-2xl p-10 md:p-16 shadow-sm">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                      {/* Left - Text & Image */}
                      <div className="flex flex-col gap-6 p-8 bg-white rounded-2xl shadow transition-shadow hover:shadow-md">
                        <p className="text-gray-800 text-lg leading-relaxed">
                        I take a holistic, personalised approach to ADHD coaching, combining evidence-basedstrategies with real-world experience. Sessions are tailored to your unique needs, whether you are looking for structure in your daily life, better emotional regulation, or guidance in navigating relationships and career decisions. 
                        </p>

                        <div className="relative w-full h-[350px] overflow-hidden rounded-xl mt-4">
                          <Image
                            src="/images/services/adhd-coaching.jpg"
                            alt="Colorful forest view representing ADHD coaching"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-xl"
                          />
                        </div>
                      </div>

                      {/* Right - Heading & Dropdowns */}
                      <div className="flex flex-col gap-8">
                        <h3 className="text-4xl md:text-5xl font-extrabold text-[#0B4073] leading-snug text-left">
                          Together we will
                        </h3>

                        <div className="flex flex-col gap-6">
                          {dropdownData.map((item) => (
                            <div
                              key={item.id}
                              className="bg-white rounded-2xl shadow transition-shadow hover:shadow-md overflow-hidden"
                            >
                              <button
                                className="w-full px-6 py-5 flex items-center justify-between text-left text-[#0B4073] font-semibold text-lg focus:outline-none"
                                onClick={() => toggleDropdown(item.id)}
                                aria-expanded={openDropdown === item.id}
                                aria-controls={`dropdown-${item.id}`}
                              >
                                <span>{item.title}</span>
                                <FiChevronDown
                                  className={`text-xl transition-transform duration-300 ${
                                    openDropdown === item.id ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>
                              <div
                                id={`dropdown-${item.id}`}
                                className={`transition-all duration-300 ease-in-out text-gray-700 text-base ${
                                  openDropdown === item.id ? 'max-h-96 px-6 pb-6' : 'max-h-0 px-6 pb-0 overflow-hidden'
                                }`}
                              >
                                <p>{item.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            
                                {/* What You Can Expect to Achieve Section */}
                    <div className="mb-10 bg-[#0B4073] text-white rounded-xl p-16">
                      <h3 className="text-7xl font-bold mb-10 text-center">
                        What You Can Expect to Achieve
                      </h3>

                      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-32">
                        {/* Left: Image */}
                        <div className="flex-shrink-0 w-full lg:w-1/3 flex justify-center">
                          <img
                            src="/images/services/adhd-coaching.jpg" // Replace with your actual image path
                            alt="What You Can Expect"
                            className="w-full max-w-sm rounded-lg"
                          />
                        </div>

                        {/* Right: Bullet List */}
                        <div className="w-full lg:w-2/3 grid md:grid-cols-1 gap-11  mt-4">
                          {coachingOutcomes.map((outcome, index) => (
                            <div key={index} className="flex items-start">
                              <div className="flex-shrink-0 mr-3">
                                <img
                                  src="/favicon.ico" // Replace with your icon path
                                  alt="icon"
                                  className="h-6 w-6 group-hover:scale-110 transition-transform"
                                />
                              </div>
                              <p className="text-white">{outcome}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      </div>
                                <section className="mb-10 mt-20 text-center">
                                    <div className="max-w-3xl mx-auto">
                                    <h2 className="text-xl font-bold text-[#0B4073] mb-4"> ADHD doesn't have to hold you back. With the right strategies and support, you can thrive and achieve your goals in a way that works for you.</h2>
                                    </div>
                                </section>
                              
                                {/* Call to Action Section */}

     </div>

        ) : (
          /* Neurodiversity for Strategic Advantage Content */
          <div className="business-neurodiversity-content mt-20">
            {/* Introduction Section */}
           {/* What You Can Expect to Achieve Section */}
<div className="mb-16 bg-[#D7E3F3] rounded-xl p-8">
  <h3 className="text-4xl font-bold text-center text-[#0B4073] mb-16">
    Neurodiversity for Strategic Advantage <br />
    <span className="text-lg font-medium">
      (Training & Workshops for Businesses & Startups)
    </span>
  </h3>

  {/* Card Container */}
  <div className="bg-white rounded-2xl p-12 space-y-10 max-w-6xl mx-auto">
    {neurodiversity.map((outcome, index) => (
      <div key={index} className="flex justify-between items-start border-b last:border-b-0 pb-7">
        <p className="text-gray-800 text-xl">{outcome}</p>
        <img
          src="/favicon.ico" // Replace with your actual icon
          alt="icon"
          className="h-5 w-5 mt-1"
        />
      </div>
    ))}
  </div>
</div>
 <section className="py-20 px-5 bg-white pt-0">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-[#0B4073] mb-16 pt-6">Neurodivergent individuals are often:</h2>
  
            <div className="grid md:grid-cols-2 gap-8">
              {offerings.map((offering, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="transition-all duration-300"
                >
                  <div
                    className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-lg border border-[#D6E2EA] ${offering.bgColor}`}
                  >
                    <h3 className="text-2xl font-semibold text-[#0B4073] mb-4 border-b-2 border-[#D6E2EA] pb-2">
                      {offering.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {offering.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


            
{/* Training Foundations Section */}
<div className="bg-[#EAE9FB] py-16 px-6 rounded-xl">
  <h3 className="text-4xl font-bold text-center text-[#0B4073] mb-16">
    Our training is grounded in:
  </h3>

  <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
    
    {/* Left: Feature Cards */}
    <div className="space-y-6 w-full lg:w-1/2 max-w-md">
      {/* Card 1 */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
        <h4 className="text-xl font-semibold text-[#0B4073]">Psychology</h4>
        <p className="text-sm text-gray-700 mt-2">
          Understanding how neurodiverse brains process, create, and relate.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
        <h4 className="text-xl font-semibold text-[#0B4073]">First principles thinking</h4>
        <p className="text-sm text-gray-700 mt-2">
          Breaking down assumptions and rebuilding new mental models from the ground up.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
        <h4 className="text-xl font-semibold text-[#0B4073]">Real-world experience</h4>
        <p className="text-sm text-gray-700 mt-2">
          Delivering coaching and transformation in business environments.
        </p>
      </div>
    </div>

    {/* Right: Image */}
    <div className="w-full lg:w-1/2 flex justify-center">
  <img 
    src="/images/HomePage/dji_0355.jpg" 
    alt="Training visual" 
    className="rounded-2xl max-w-xl w-auto shadow-lg"
  />
</div>
  </div>
</div>



    
    <div className="w-full bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-center text-[#0B4073] mb-16">Packages Offered:</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
  {packages.map((pkg, index) => (
    <div
      key={index}
      className="rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white p-6 flex flex-col justify-between hover:scale-[1.02] transform transition-all ease-in-out"
    >
      <div>
        <h3 className={`text-2xl font-semibold mb-3 leading-snug  ${pkg.textColor}`}>
          {pkg.title}
        </h3>
        <p className="text-sm text-gray-600 mb-5 leading-relaxed">
          {pkg.description}
        </p>

        <h4 className="text-xs font-bold tracking-wider text-[#0B4073]  uppercase mb-2">
          Key Features:
        </h4>
        <ul className="list-disc list-outside pl-0 text-sm text-gray-800 space-y-2 leading-6">
          {pkg.features.map((feature, i) => (
            <li key={i} className="ml-5 text-left">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`mt-6 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${pkg.buttonColor} ${pkg.textColor} hover:opacity-90`}
      >
        Get Started
      </button>
    </div>
  ))}
</div>
      </div>
    </div>
    <div className="bg-[#D6E2EA] py-12 md:py-16 lg:py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-center text-[#0B4073] mb-16">
          Outcomes You Can Expect:
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-16">
          <div className="flex flex-col items-center">
            <div className="text-blue-500 text-4xl mb-2">
              {/* Replace with your actual icon or image */}
             <Image src="/favicon.ico" alt="icon" width={32} height={32} />
            </div>
            <p className="text-sm md:text-base text-gray-700 text-center w-32 md:w-40">
              A workforce that feels seen, empowered and enabled
            </p>
          </div>
          <div className="hidden md:block text-gray-400 text-2xl">&rarr;</div>
          <div className="flex flex-col items-center">
            <div className="text-blue-500 text-4xl mb-2">
              {/* Replace with your actual icon or image */}
              <Image src="/favicon.ico" alt="icon" width={32} height={32} />
            </div>
            <p className="text-sm md:text-base text-gray-700 text-center w-32 md:w-40">
              Increased psychological safety and reduced team friction
            </p>
          </div>
          <div className="hidden md:block text-gray-400 text-2xl">&rarr;</div>
          <div className="flex flex-col items-center">
            <div className="text-blue-500 text-4xl mb-2">
              {/* Replace with your actual icon or image */}
              <Image src="/favicon.ico" alt="icon" width={32} height={32} />
            </div>
            <p className="text-sm md:text-base text-gray-700 text-center w-32 md:w-40">
              Breakthrough ideas from non-traditional thinkers
            </p>
          </div>
          <div className="hidden md:block text-gray-400 text-2xl">&rarr;</div>
          <div className="flex flex-col items-center">
            <div className="text-blue-500 text-4xl mb-2">
              {/* Replace with your actual icon or image */}
              <Image src="/favicon.ico" alt="icon" width={32} height={32} />
            </div>
            <p className="text-sm md:text-base text-gray-700 text-center w-32 md:w-40">
              Real inclusion that drives real results
            </p>
          </div>
        </div>
        
      </div>
    </div>
          </div>
        )
        }
        </div>
     
         
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
              { type: 'adhd', title: 'ADHD Coaching' }
            ].map(({ type, title }) => (
              <Link 
                key={type} 
                href={`/book?type=${type}`} 
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

export default function ADHDCoachingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-xl text-gray-600 font-[Roboto]" style={{ color: '#7094B7' }}>Loading ADHD coaching resources...</div>
    </div>}>
      <ADHDCoachingContent />
    </Suspense>
  );
}
