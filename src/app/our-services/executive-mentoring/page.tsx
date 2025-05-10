"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCpu,
  FiHeart,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { FiBriefcase } from "react-icons/fi";
import { HeroSection } from "@/components/HeroSection";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Users,
  BarChart2,
  Link2,
  ClipboardCheck,
  Brain,
  LinkIcon,
} from "lucide-react";

const approachSections = [
  
  {
    title: "Bias & Decision-Making",
    icon: (
      <Image src="/favicon.ico" alt="Neurodiversity" width={32} height={32} />
    ),
    description: [
      "Boards function best when open 	dialogue and constructive challenge are embedded into 	decision-making. We help leadership teams create a psychologically 	safe environment, ensuring that all perspectives are heard.",
    ],
    reversed: true,
    img: "/images/executive/our-approch/image-2.png",
  },
  {
    title: "Personality & Leadership Profiling",
    icon: (
      <Image src="/favicon.ico" alt="Neurodiversity" width={32} height={32} />
    ),
    description:
      "Cognitive biases can silence 	innovation, reinforce outdated strategies, and limit organisational 	growth. We equip boards with tools to identify and mitigate 	unconscious bias, leading to more balanced, inclusive, and effective 	strategic choices.",
    reversed: false,
    img: "/images/executive/our-approch/image-3.png",
  },
  {
    title: "Bridging Leadership & Workforce Engagement",
    icon: (
      <Image src="/favicon.ico" alt="Neurodiversity" width={32} height={32} />
    ),
    description: [
      "Understanding individual 	personality traits, cognitive styles, and leadership tendencies is 	essential for building high-functioning boards. We use validated 	psychological profiling tools to help leaders:",
      "Identify 	their own leadership styles and how they interact with others.",
      "Enhance 	communication, collaboration, and decision-making within the board.",
      "Build 	a balanced, complementary leadership team that plays to individual 	strengths.",
    ],
    reversed: true,
    img: "/images/executive/our-approch/image-4.png",
  },
  {
    title: "Board-Level Culture Audits",
    icon: (
      <Image src="/favicon.ico" alt="Neurodiversity" width={32} height={32} />
    ),
    description:
      "Boards set the direction, but real change happens when leaders and employees move forward together. We help leadership teams align strategy with workforce psychology, ensuring that boardroom decisions resonate across all levels of the organisation.",
    reversed: false,
    img: "/images/executive/our-approch/image-5.png",
  },
 
];

const offers = [
  {
    title: "Psychology-informed thinking",
    description: `Grounded in organisational and behavioural psychology, we help you
    understand how your habits, thought patterns, and inner narratives
    influence your decision making and leadership.Using first principles
    thinking we strip away assumptions and offer solutions for any
    challenges you face.`,
    image: "/images/executive/what-we-offer/image-3.png",
    bg: "bg-indigo-100",
  },
  {
    title: "Therapeutic insight",
    description: `Therapeutic insight - sometimes, what blocks success isn't about skills or strategy. If needed, we integrate therapeutic support to address underlying barriers such burnout, rejection sensitivity, fear of failure, imposter syndrome, or past trauma that might be holding you back.`,
    image: "/images/executive/what-we-offer/image-2.png",
    bg: "bg-indigo-50",
  },
  {
    title: "System-aware mentoring",
    description: `We understand the complexities of systems, whether you're scaling a business, leading change, or juggling uncertainty. Our support meets you where you are.`,
    image: "/images/executive/what-we-offer/image-1.png",
    bg: "bg-indigo-100",
  },
];

const offerings = [
  {
    title: "Executives and Senior Leaders",
    description:
      "Executives and Senior Leaders wanting space to reflect and refine their leadership style.",
    bgColor: "bg-blue-50",
  },
  {
    title: "Founders & Entrepreneurs",
    description:
      "Founders & Entrepreneurs navigating growth, funding pressures, or team dynamics.",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Managers stepping into bigger roles",
    description:
      "Managers 	stepping into bigger roles who 	want to lead with clarity and emotional intelligence.",
    bgColor: "bg-purple-50",
  },
  {
    title: "Professionals feeling stuck",
    description:
      "Professionals 	feeling stuck in 	high-functioning roles but not thriving beneath the surface.",
    bgColor: "bg-teal-50",
  },
];

export default function ExecutiveMentoringPage() {
  const [activeSection, setActiveSection] = useState("For Individuals ");
  return (
    <div className="font-roboto">
      {/* Hero Section */}
      <HeroSection
        title="Executive Mentoring & Boardroom Support"
        subtitle="We provide specialized mentoring and support for executives and board members, helping them navigate complex leadership challenges."
        backgroundImage="/images/services/executive-mentoring.webp"
        height="medium"
        textPosition="left"
      />

      <section className="relative pt-0 py-20 bg-gradient-to-br from-[#EFF6FB] via-[#F7FAFC] to-white overflow-hidden">
        <div className="container-custom mx-auto pt-16">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/our-services"
              className="text-[#0B4073] hover:text-[#072e53] inline-flex items-center transition-colors duration-200"
            >
              <FiArrowLeft className="mr-2" />
              Back to Our Services
            </Link>
          </div>
        </div>
        <div className="container mx-auto px-0 py-16 mt-0 pt-6 max-w-7xl pb-3">
          {/* Section Toggle - Card Selection Style */}
          <div className="mb-0">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <button
                onClick={() => setActiveSection("For Individuals ")}
                className={`group p-6 rounded-xl transition-all duration-300 flex flex-col items-center text-center ${
                  activeSection === "For Individuals "
                    ? "bg-[#0B4073] text-white shadow-lg"
                    : "bg-white hover:bg-[#D6E2EA]/30 text-gray-700 shadow-md hover:shadow-lg"
                }`}
              >
                <div
                  className={`p-4 rounded-full mb-4 ${
                    activeSection === "For Individuals "
                      ? "bg-white/20"
                      : "bg-[#D6E2EA]"
                  }`}
                >
                  <FiUsers
                    className={`w-8 h-8 ${
                      activeSection === "For Individuals "
                        ? "text-white"
                        : "text-[#0B4073]"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">For Individuals </h3>
              </button>

              <button
                onClick={() => setActiveSection("Boardroom")}
                className={`group p-6 rounded-xl transition-all duration-300 flex flex-col items-center text-center ${
                  activeSection === "Boardroom"
                    ? "bg-[#0B4073] text-white shadow-lg"
                    : "bg-white hover:bg-[#D6E2EA]/30 text-gray-700 shadow-md hover:shadow-lg"
                }`}
              >
                <div
                  className={`p-4 rounded-full mb-4 ${
                    activeSection === "Boardroom"
                      ? "bg-white/20"
                      : "bg-[#D6E2EA]"
                  }`}
                >
                  <FiBriefcase
                    className={`w-8 h-8 ${
                      activeSection === "Boardroom"
                        ? "text-white"
                        : "text-[#0B4073]"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">For Boards </h3>
              </button>
            </div>
          </div>

          {/* Section Content */}
        </div>
      </section>
      {activeSection === "For Individuals " ? (
        <div className="max-w-7xl mx-auto px-0 md:px-12 mt-0">
          {/* List of challenges */}
          {/* Heading */}
          <div className="mb-20 text-center">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Do any of these sound familiar?
            </h2>
          </div>

          <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {[
             
              "Do you feel like your career or business vision has become unclear, and you need to reconnect with purpose?",
              "Are you feeling stuck, 	unmotivated or burnt out—despite 	being in a role you once wanted?",
              "Do 	you struggle to switch off, 	always carrying the weight of work?",
              "Are you experiencing imposter syndrome, perfectionism, or fear of failure that's hard to shake?",
              "Are you successful on paper but still feeling unfulfilled, overwhelmed, or lost?",
              "Do you find yourself emotionally triggered, reactive, or disconnected in your leadership role?",
              "Are you navigating team conflict, people-pleasing, or boundary issues in the workplace?",
              "Are you avoiding difficult decisions, conversations, or growth opportunities because of inner blocks?",
              "Do you want to lead with more confidence, clarity, and authenticity—without the pressure to \"perform\"?",
            ].map((question, idx) => (
              <div
                key={idx}
                className="flex items-start p-4 sm:p-6 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-[#0B4073] mt-1 mr-3 sm:mr-4 shrink-0">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <img
                      src="/favicon.ico"
                      alt="icon"
                      className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform"
                    />
                  </div>
                </div>
                <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                  {question}
                </p>
              </div>
            ))}
          </div>
          {/* Closing message */}
          <div className="mt-20 text-center max-w-4xl mx-auto mb-20">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Our mentoring combines
              <span >
                {" "}
                strategic thinking
              </span>
              ,
              <span >
                {" "}
                first principles problem-solving
              </span>
              , and
              <span >
                {" "}
                applied psychology{" "}
              </span>
              to support you in making lasting progress, professionally and
              personally.
            </p>
          </div>
          <h2 className="text-3xl xs:text-3xl sm:text-4xl font-bold text-center text-[#0B4073] mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-20">
            {offers.map((item, index) => (
              <React.Fragment key={index}>
                {/* Image Section with Motion */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] relative rounded-md overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="w-full h-full object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>

                {/* Text Section with Motion */}
                <motion.div
                  className={`${item.bg} p-4 sm:p-6 rounded-md flex flex-col justify-center`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                >
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#0B4073] mb-3 sm:mb-4 pb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </React.Fragment>
            ))}
          </div>

          <div className="container mx-auto px-6">
            <h2 className="text-3xl xs:text-3xl sm:text-4xl font-bold text-center text-[#0B4073] mb-16">
              Who It's For
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {offerings.map((offering, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="transition-all duration-300"
                >
                  <div
                    className={`bg-white p-5 sm:p-8 rounded-xl shadow-sm hover:shadow-lg border border-[#D6E2EA] ${offering.bgColor}`}
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#0B4073] mb-3 sm:mb-4 border-b-2 border-[#D6E2EA] pb-2">
                      {offering.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                      {offering.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Heading */}
            <div className="mb-20 text-center">
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Do any of these sound familiar?
              </h2>
            </div>

            {/* List of challenges */}
            <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {[
                "Are your board meetings 	dominated by a few voices, leaving others hesitant to speak up?",
                "Do unconscious biases impact decision-making, leading to missed opportunities or unseen risks?",
                "Are 	strategic discussions based on assumptions rather than data-driven 	behavioural insights?",
                "Do 	you want to create a culture where challenge and constructive 	dissent are encouraged rather than avoided?",
                "Does 	your leadership team struggle to balance long-term vision with the 	psychological realities of workforce engagement?",
                "Are 	board-level decisions disconnected from how change is experienced on 	the ground?",
                "Do 	you want to harness individual strengths within your leadership team 	to improve performance and decision-making?",
              ].map((question, idx) => (
                <div
                  key={idx}
                  className="flex items-start p-4 sm:p-6 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="text-[#0B4073] mt-1 mr-3 sm:mr-4 shrink-0">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <img
                        src="/favicon.ico"
                        alt="icon"
                        className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform"
                      />
                    </div>
                  </div>
                  <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full bg-[#6A90B5] py-20 mt-20 mb-24 min-h-[0px] flex items-center">
            <div className="max-w-screen-xl mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 rounded-md">
              {/* Left: Image */}
              <div className="w-full md:w-1/2">
                <img
                  src="/images/services/IMG_8401.webp"
                  alt="Team discussion"
                  className="rounded-lg shadow-md w-full object-cover h-full max-h-[450px]"
                />
              </div>

              {/* Right: Text */}
              <div className="w-full md:w-1/2 text-white text-center md:text-left">
                <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold mb-6">
                  How We Help?
                </h2>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                  True leadership excellence isn't just about processes and
                  expertise it's about people, behaviour, and decision-making
                  at the highest levels. Boards shape the direction of an
                  organisation, but fear, bias, and resistance to challenge can
                  often limit progress.
                  <br />
                  <br />
                  We use organisational and business psychology to help
                  leadership teams create high-performing boards. By
                  understanding how different personalities, cognitive styles,
                  and biases influence boardroom dynamics, we help leaders
                  create an open, high-performance culture where decisions are
                  informed, inclusive, and strategically sound.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl xs:text-3xl sm:text-4xl font-bold text-center text-[#0B4073] mb-16">
            Our Approach
          </h2>
          <div className="space-y-12 sm:space-y-16 px-4 sm:px-10">
            {approachSections.map((section, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="transition-all duration-300"
              >
                <div
                  className={`flex flex-col ${
                    section.reversed ? "md:flex-row-reverse" : "md:flex-row"
                  } gap-6 sm:gap-8 items-center`}
                >
                  <div className="flex-1">
                    <div className="bg-white shadow-sm rounded-xl p-5 sm:p-8 hover:shadow-lg transition-shadow duration-300 border border-[#D6E2EA]">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className="mr-3 sm:mr-4 p-2 sm:p-3 rounded-full bg-[#D6E2EA]">
                          {section.icon}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-[#0B4073]">
                          {section.title}
                        </h3>
                      </div>
                      <ul className="list-disc pl-4 sm:pl-6 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed space-y-1 sm:space-y-2">
                        {Array.isArray(section.description) ? (
                          section.description.map((point, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              {point}
                            </motion.li>
                          ))
                        ) : (
                          <motion.li
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            {section.description}
                          </motion.li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="relative rounded-xl overflow-hidden shadow-sm bg-gradient-to-br from-[#D6E2EA]/20 to-[#D6E2EA]/10 aspect-video h-[150px] xs:h-[200px] sm:h-[250px] md:h-[300px] w-full">
                      <Image
                        src={section.img}
                        alt={section.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={idx < 2}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}



<section className="relative py-20 md:py-24 px-4 xs:px-6 sm:px-10 mt-20 min-h-[500px]">
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
          {/* Text */}
          <div className="w-full text-center mb-12">
            <h2 className="text-2xl xs:text-3xl md:text-5xl font-bold text-white mb-4">
              Book a Free Consultation
            </h2>
            <p className="text-base sm:text-lg text-white opacity-80 max-w-2xl mx-auto">
              Select one of our services to book your free consultation with us.
            </p>
          </div>

          {/* Consultation Options */}
          <div className="w-full flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6">
            <Link href="/book/executive" className="w-full max-w-xs sm:max-w-sm md:max-w-md">
              <div className="bg-[#0B4073] text-white rounded-full py-3 sm:py-4 px-5 sm:px-8 flex items-center justify-between transition-all duration-300 hover:bg-[#0B4073]/90 group">
                <span className="font-medium text-base sm:text-lg">Executive Mentoring</span>
                <div className="bg-white rounded-full p-2 sm:p-3 text-[#0B4073]">
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </Link>

            <Link href="/book/boardroom" className="w-full max-w-xs sm:max-w-sm md:max-w-md">
              <div className="bg-[#0B4073] text-white rounded-full py-3 sm:py-4 px-5 sm:px-8 flex items-center justify-between transition-all duration-300 hover:bg-[#0B4073]/90 group">
                <span className="font-medium text-base sm:text-lg">Boardroom Support</span>
                <div className="bg-white rounded-full p-2 sm:p-3 text-[#0B4073]">
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </Link>

           
          </div>
        </div>
      </section>
  
    </div>
  );
}
