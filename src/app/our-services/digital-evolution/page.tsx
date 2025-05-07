'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { HeroSection } from '@/components/HeroSection';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const accordionItems = [
  {
    title: 'Bottom-Up Change That Works',
    content: 'Digital transformation isn\'t just about software—it\'s about people. We engage employees from the start, ensuring AI adoption is driven by real needs rather than imposed solutions.',
  },
  {
    title: 'Workforce-Led Digital Maturity Audits Before implementing AI',
    content: 'We assess existing workflows, data use, and employee attitudes to identify practical opportunities for human-centric AI integration.',
  },
  {
    title: 'Psychological Insights & Thematic Analysis',
    content: 'We engage employees at all levels, uncovering key resistance points and opportunities for cultural change. Our reports translate workforce insights into actionable AI adoption strategies.',
  },
  {
    title: 'Bespoke AI Implementation Roadmaps',
    content: ' Rather than prescribing generic AI solutions, we develop tailored roadmaps that align technology with workforce needs, business goals, and long-term sustainability.',
  },
  {
    title: 'Strategic Change Management & Training',
    content: 'We design bespoke training and support plans that help employees transition smoothly into AI-enhanced ways of working—building trust, competence, and digital confidence.',
  },
];


const sections = [
  {
    imageSrc: '/images/shutterstock_2228606361.jpg', // Replace with your actual image path
    imageAlt: 'Hands typing on a laptop with AI interface overlay',
    title: 'Human-Centred AI Adoption',
    description: 'AI should enhance work, not replace people. We align AI solutions with human psychology, ensuring teams feel empowered rather than displaced.',
    imageLeft: true,
  },
  {
    imageSrc: '/images/real-estate-agents-are-holding-a-housing-model-of-2023-11-27-05-04-20-utc 1.png', // Replace with your actual image path
    imageAlt: 'Business meeting with a model house',
    title: 'Overcoming Digital Resistance',
    description: 'Change often triggers fear and uncertainty. We apply organisational psychology to help employees move past resistance, fostering confidence, curiosity, and digital competence.',
    imageLeft: false, // Image will be on the right
  },
  {
    imageSrc: '/images/a-person-spreads-a-small-umbrella-on-a-piggy-bank-2023-11-27-05-27-24-utc 1.png', // Replace with your actual image path
    imageAlt: 'Piggy bank under an umbrella protecting coins',
    title: 'Building Psychological Safety in Tech Adoption',
    description: 'For AI adoption to succeed, people must feel safe to learn and experiment. We help organisations create a culture of trust, where AI becomes a tool for growth, not job loss.',
    imageLeft: true,
  },
];
export default function DigitalEvolutionPage() {

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
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
      <section className="relative pt-0 py-20 bg-gradient-to-br from-[#EFF6FB] pb-0  via-[#F7FAFC] to-white overflow-hidden">
        <div className="container-custom mx-auto pt-16">
          {/* Breadcrumb */}
          <div className="mb-8 px-10">
            <Link href="/our-services" className="text-[#0B4073] hover:text-[#072e53] inline-flex items-center transition-colors duration-200">
              <FiArrowLeft className="mr-2" />
              Back to Our Services
            </Link>
          </div>
        </div>
      </section>

      <div className=" mt-16">
        {/* Introduction Section */}
        <div className="px-4 sm:px-6 md:px-12 py-10">
  {/* Heading Container */}
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#0B4073] leading-tight">
      Are you facing any of these challenges?
    </h2>
  </div>
</div>


<div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-7xl mx-auto px-6 md:px-0 mt-16 ">
  {[
            "Do you want to develop AI solutions but 	struggle to know where to start?",
            "Have 	you invested in AI or digital technology, only to find it remains 	unused by staff?",
            "Are 	you collecting vast amounts of data but unsure if you're leveraging 	it effectively?",
            "Do 	your employees see AI as a threat rather than a tool for 	empowerment?",
            "Are 	frontline staff disengaged because they feel technology is being 	imposed rather than designed with them in mind?",
            "Have 	previous digital transformation projects failed due to a lack of 	workforce buy in?",
            "Are 	you looking for an approach that works with human behaviour rather 	than against it?",
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

        <div className="w-full bg-[#6A90B5] py-20 mt-20  min-h-[0px] flex items-center">
          <div className="max-w-screen-xl mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 rounded-md">

            {/* Left: Image */}
          <div className="w-full md:w-1/2 px-4 md:px-0">
  <img
    src="/images/executive/how.jpg"
    alt="Team discussion"
    className="rounded-lg shadow-md w-full object-cover h-full max-h-[450px]"
  />
</div>

            {/* Right: Text */}
            <div className="w-full md:w-1/2 text-white text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Help?</h2>
              <p className="text-lg md:text-xl leading-relaxed">
                Too often, digital transformation is approached as a technical challenge when, in reality, it's a psychological one. AI initiatives fail not because the technology is flawed, but because the human foundation isn't solid.
                <br /><br />
                At Falling Upwards, we don't believe in digital transformation we believe in digital evolution. Transformation suggests disruption; evolution is about building sustainable, people-centred change from the ground up. Our psychology-driven approach ensures AI and digital adoption feel like a natural progression, not an imposed upheaval.
              </p>
            </div>

          </div>
        </div>




        <div className="bg-gray-100 min-h-screen  p-6 pt-0 md:p-12 font-sans "> {/* Light background, padding */}
          <div className="max-w-6xl mx-auto pb-16"> {/* Max width container */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#0B4073] leading-snug mb-8 md:mb-12 text-left pt-16">
              Our Approach: <br />
              Psychology-Driven Digital Evolution
            </h1>

            {/* Sections Container - Using space-y for vertical spacing between items */}
            <div className="space-y-10 md:space-y-16">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${section.imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-10 items-center`}
                >
                  {/* Image Section */}
                  <div className="w-full md:w-1/2 flex-shrink-0">
                    <img
                      src={section.imageSrc}
                      alt={section.imageAlt}
                      className="rounded-lg shadow-md object-cover w-full h-auto max-h-[350px]" // Added max-h for consistency if needed
                    />
                  </div>

                  {/* Text Section */}
                  <div className="w-full md:w-1/2">
                    <h2 className="text-xl md:text-2xl font-semibold text-[#0B4073] mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {/* Using a simple span for the arrow, you could use an SVG icon */}
                      <span className="mr-2 text-blue-900 font-semibold">↳</span>
                      {section.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>






        <div className="bg-gray-50 p-8 md:p-12 font-sans">
          <div className="max-w-4xl mx-auto">
            {/* Main Title */}
            <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#0B4073] mb-6 md:mb-8 text-center">
              What Makes Falling Upwards Different?
            </h2>

            {/* Accordion Items */}
            <div className="space-y-4 mt-10">
              {accordionItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#D6E2EA] rounded-xl shadow transition-all duration-300 ease-in-out"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex justify-between items-center p-10 text-left focus:outline-none focus:ring-2 focus:ring-[#E5ECF6] rounded-t-xl"
                    aria-expanded={openIndex === index}
                    aria-controls={`accordion-content-${index}`}
                  >
                    <span className="text-lg font-semibold text[#D6E2EA]">
                      {item.title}
                    </span>
                    <motion.div
                      initial={false}
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDownIcon className="w-6 h-6 text-sky-600" />
                    </motion.div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        id={`accordion-content-${index}`}
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { height: "auto", opacity: 1 },
                          collapsed: { height: 0, opacity: 0 },
                        }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-2 text-[#072e53] leading-relaxed border-t border-sky-200">
                          {item.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-8 md:p-12 lg:p-16 font-sans"> {/* Light background, padding */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

            {/* --- Left Column: Text Content --- */}
            <div className="md:col-span-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B4073] mb-4 md:mb-6 leading-tight">
                Turning AI Into a Tool for Empowerment, Not Displacement
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                By focusing on human behaviour, cognition, and trust, we bridge the gap between technological advancements and real-world usability.
              </p>
            </div>

            {/* --- Right Column: Image and Caption --- */}
            <div className="md:col-span-1 flex flex-col items-center md:items-start"> {/* Stack image and text vertically */}
              <img
                src="/images/Image.png" // <-- Replace with your actual image path
                alt="Aerial view of forest meeting a coastline"
                className="rounded-lg shadow-md w-full h-auto object-cover mb-4 md:mb-6 max-w-lg" // Added max-w-lg for potentially better control
              />
              <p className="text-base text-gray-600 text-center md:text-left max-w-lg"> {/* Matched max-w */}
                If you want to introduce AI without resistance, fear, or disengagement, we can help you get it right from the start.
              </p>
            </div>

          </div>
        </div>

        {/* Content Sections */}
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

        <div className="flex flex-col md:flex-row items-center container-custom mx-auto relative z-10 px-4 md:px-0 min-h-[300px]">
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
