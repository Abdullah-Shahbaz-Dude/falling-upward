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
    title: "Harnessing Neurodiversity for Strategic Change",
    icon: (
      <Image src="/favicon.ico" alt="Neurodiversity" width={32} height={32} />
    ),
    description: [
      "Many organisations overlook the 	strategic advantage that comes from diverse cognitive styles. We 	provide training and advisory support to help leadership teams:",
      "Recognise 	and leverage neurodivergent strengths in problem-solving, 	innovation, and decision-making.",
      "Create 	inclusive boardroom cultures where different ways of thinking lead 	to stronger, more creative strategies.",
      "Ensure 	that neurodiverse employees and leaders feel valued, improving 	engagement, retention, and overall performance.",
    ],
    reversed: false,
    img: "/images/executive/our-approch/image-1.png",
  },
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
  {
    title: "Harnessing Neurodiversity for Strategic Change",
    icon: (
      <Image src="/favicon.ico" alt="Neurodiversity" width={32} height={32} />
    ),
    description:
      "We train leadership teams to recognise and leverage neurodivergent strengths, foster inclusive boardroom cultures, and unlock innovation through diverse cognitive styles.",
    reversed: true,
    img: "/images/executive/our-approch/image-6.png",
  },
];

const offers = [
  {
    title: "Psychology-informed thinking",
    description: `Grounded in organisational and behavioural psychology, we help you
    understand how your habits, thought patterns, and inner narratives
    influence your decision making and leadership. First principles
    thinking – we strip away assumptions and offer solutions for any
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
  const [activeSection, setActiveSection] = useState("Mentoring ");
  return (
    <div className="font-roboto">
      {/* Hero Section */}
      <HeroSection
        title="Executive Mentoring & Boardroom Support"
        subtitle="We provide specialized mentoring and support for executives and board members, helping them navigate complex leadership challenges."
        backgroundImage="/images/services/executive-mentoring.jpg"
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
                onClick={() => setActiveSection("Mentoring ")}
                className={`group p-6 rounded-xl transition-all duration-300 flex flex-col items-center text-center ${
                  activeSection === "Mentoring "
                    ? "bg-[#0B4073] text-white shadow-lg"
                    : "bg-white hover:bg-[#D6E2EA]/30 text-gray-700 shadow-md hover:shadow-lg"
                }`}
              >
                <div
                  className={`p-4 rounded-full mb-4 ${
                    activeSection === "Mentoring "
                      ? "bg-white/20"
                      : "bg-[#D6E2EA]"
                  }`}
                >
                  <FiUsers
                    className={`w-8 h-8 ${
                      activeSection === "Mentoring "
                        ? "text-white"
                        : "text-[#0B4073]"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Mentoring </h3>
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
                <h3 className="text-xl font-bold mb-2">Boardroom Advisor </h3>
              </button>
            </div>
          </div>

          {/* Section Content */}
        </div>
      </section>
      {activeSection === "Mentoring " ? (
        <div className="max-w-7xl mx-auto px-0 md:px-12 mt-0">
          {/* List of challenges */}
          {/* Heading */}
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              For Individuals
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Do any of these sound familiar?
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 ">
            {[
              "Is masking, rejection sensitivity, or neurodivergent burnout a hidden challenge you're managing silently?",
              "Do you feel like your career or business vision has become unclear, and you need to reconnect with purpose?",
              "Are you feeling stuck, 	unmotivated or burnt out—despite 	being in a role you once wanted?",
              "Do 	you struggle to switch off, 	always carrying the weight of work?",
              "Are you experiencing imposter syndrome, perfectionism, or fear of failure that's hard to shake?",
              "Are you successful on paper but still feeling unfulfilled, overwhelmed, or lost?",
              "Do you find yourself emotionally triggered, reactive, or disconnected in your leadership role?",
              "Are youq navigating team conflict, people-pleasing, or boundary issues in the workplace?",
              "Are you avoiding difficult decisions, conversations, or growth opportunities because of inner blocks?",
              "Do you want to lead with more confidence, clarity, and authenticity—without the pressure to \"perform\"?",
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
                    <span className="text-base font-medium group-hover:text-[#0B4073] transition-colors duration-200"></span>
                  </div>
                </div>
                <p className="text-gray-800 text-lg leading-relaxed">
                  {question}
                </p>
              </div>
            ))}
          </div>
          {/* Closing message */}
          <div className="mt-20 text-center max-w-4xl mx-auto mb-20">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Our mentoring combines
              <span className="font-semibold text-[#0B4073]">
                {" "}
                strategic thinking
              </span>
              ,
              <span className="font-semibold text-[#0B4073]">
                {" "}
                first principles problem-solving
              </span>
              , and
              <span className="font-semibold text-[#0B4073]">
                {" "}
                applied psychology{" "}
              </span>
              to support you in making lasting progress, professionally and
              personally.
            </p>
          </div>
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {offers.map((item, index) => (
              <React.Fragment key={index}>
                {/* Image Section with Motion */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover rounded-md"
                  />
                </motion.div>

                {/* Text Section with Motion */}
                <motion.div
                  className={`${item.bg} p-6 rounded-md flex flex-col justify-center`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                >
                  <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-500 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </React.Fragment>
            ))}
          </div>

          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-[#0B4073] mb-16">
              Who It's For
            </h2>

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
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Heading */}
            <div className="mb-20 text-center">
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Boardroom Support
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Do any of these sound familiar?
              </p>
            </div>

            {/* List of challenges */}
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 ">
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
                  className="flex items-start p-6 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group "
                >
                  <div className="text-[#0B4073] mt-1 mr-4 shrink-0">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/favicon.ico" // Replace this with your image path
                        alt="icon"
                        className="h-6 w-6 group-hover:scale-110 transition-transform"
                      />
                      <span className="text-base font-medium group-hover:text-[#0B4073] transition-colors duration-200"></span>
                    </div>
                  </div>
                  <p className="text-gray-800 text-lg leading-relaxed">
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
                  src="/images/executive/how.jpg"
                  alt="Team discussion"
                  className="rounded-lg shadow-md w-full object-cover h-full max-h-[450px]"
                />
              </div>

              {/* Right: Text */}
              <div className="w-full md:w-1/2 text-white text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  How We Help?
                </h2>
                <p className="text-lg md:text-xl leading-relaxed">
                  True leadership excellence isn't just about processes and
                  expertise — it's about people, behaviour, and decision-making
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

          <h2 className="text-4xl font-bold text-center text-[#0B4073] mb-16">
            Our Approach
          </h2>
          <div className="space-y-16 px-10">
            {approachSections.map((section, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="transition-all duration-300"
              >
                <div
                  className={`flex flex-col ${
                    section.reversed ? "md:flex-row-reverse" : "md:flex-row"
                  } gap-8 items-center`}
                >
                  <div className="flex-1">
                    <div className="bg-white shadow-sm rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 border border-[#D6E2EA]">
                      <div className="flex items-center mb-4">
                        <div className="mr-4 p-3 rounded-full bg-[#D6E2EA]">
                          {section.icon}
                        </div>
                        <h3 className="text-2xl font-semibold text-[#0B4073]">
                          {section.title}
                        </h3>
                      </div>
                      <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
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
                    <div className="relative rounded-xl overflow-hidden shadow-sm bg-gradient-to-br from-[#D6E2EA]/20 to-[#D6E2EA]/10 aspect-video flex items-center justify-center">
                      <Image
                        src={section.img} // The path from your data
                        alt={section.title}
                        fill // Makes the image fill the parent div
                        className="object-cover" // Controls how the image scales
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optional: Helps optimize image loading based on viewport size
                        priority={idx < 2} // Optional: Prioritize loading the first couple of images
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
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
           
              { type: 'executive', title: 'Executive Mentoring & Boardroom Support' },
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
