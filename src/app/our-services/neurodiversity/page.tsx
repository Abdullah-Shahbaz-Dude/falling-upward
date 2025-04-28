"use client";
import { motion } from "framer-motion";
import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";
import { HeroSection } from "@/components/HeroSection";
import { CheckCircle } from "lucide-react";

function NeurodiversityContent() {
  // Neurodiversity advantages
  const advantages = [
    {
      title: "Independent thinking",
      description: "Less influenced by group norms or \"how it's always been done\"",
      bgColor: "bg-blue-50",
    },
    {
      title: "Creative insight",
      description: "Driven by hyperfocus, lateral thinking, and deep special interests",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Unique problem-solving",
      description: "Thriving in complexity, ambiguity, and edge-case scenarios",
      bgColor: "bg-purple-50",
    },
    {
      title: "Constructive disruption",
      description: "Challenging assumptions in ways that drive progress",
      bgColor: "bg-teal-50",
    },
  ];

  // Expected outcomes
  const outcomes = [
    "More original ideas and fewer \"safe\" defaults",
    "A culture that turns flexibility into strategic advantage",
    "Practical frameworks for inclusive hiring and development",
    "Teams that feel seen, trusted, and enabled",
    "Leaders who champion difference as a driver of transformation"
  ];

  // Key questions
  const keyQuestions = [
    "Is your workplace really designed for different minds — or just different personalities?",
    "Could your most unconventional thinkers be your most underutilised asset?",
    "In a world of rapid change, businesses can't afford to rely solely on conventional thinking."
  ];

  // Diagnostic tool features
  const diagnosticFeatures = [
    "Map neuro-cognitive strengths to task and team design",
    "Spot underused talent inside current teams or recruitment pools",
    "Align minds wired for patterning, logic, or disruption with AI, data, and systems innovation roles",
    "Inform hiring, adjustments and retention plans using real-world insights not stereotypes"
  ];

  // Use cases
  const useCases = [
    "Hiring at scale (e.g. apprenticeships, logistics teams, early-career tech pathways)",
    "Redesigning roles to retain neurodiverse employees",
    "Innovation team profiling to include unconventional thinkers",
    "HR support during performance or adjustments conversations"
  ];

  // Framework sources
  const frameworkSources = [
    "Frontline therapeutic and coaching work with neurodivergent people",
    "Employment pathway and training programmes",
    "Lived experience and organisational psychology methods"
  ];

  return (
    <div className="font-roboto">
      <HeroSection
        title="Neurodiversity for strategic advantage "
        subtitle="Innovation doesn't come from consensus; it comes from difference"
        backgroundImage="/images/services/IMG_7552.jpg"
        textPosition="left"
        height="medium"
      />

      <section className="relative pt-0 py-10 pb-0 bg-gradient-to-br from-[#EFF6FB] via-[#F7FAFC] to-white overflow-hidden">
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
      </section>

      <section className="bg-gradient-to-b from-[#eaf2fb] to-[#f4f8fc] py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between space-y-16 lg:space-y-0">

          {/* Left Side: Bold Questions */}
          <div className="flex flex-col space-y-8 text-center lg:text-left lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Is your workplace really designed for <span className="text-[#0B4073]">different minds</span> — or just different personalities?
            </h2>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Could your most <span className="text-[#0B4073]">unconventional thinkers</span> be your most underutilized asset?
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              In a world of rapid change, businesses can't afford to rely solely on conventional thinking.
            </p>
          </div>

          {/* Right Side: Core Beliefs */}
          <div className="lg:w-1/2 p-8 bg-white rounded-xl shadow-lg space-y-8 transform hover:scale-105 transition-all duration-300">
            <p className="text-xl md:text-2xl font-semibold text-gray-800">
              Neurodiversity can disrupt default patterns — and that's exactly what makes it valuable.
            </p>
            <p className="text-xl md:text-2xl font-semibold text-gray-800">
            We believe Innovation doesn’t come from consensus; it comes from <span className="text-[#0B4073]">difference</span>.
            </p>
            <p className="text-lg text-gray-600">
              Neurodivergent individuals challenge norms, question assumptions, and approach problems from unexpected angles. This can be essential for businesses that want to grow, adapt, and lead.
            </p>
          </div>
        </div>
      </section>


      <section className="relative bg-gradient-to-br from-[#F0F7FF] via-white to-[#E0ECF8] py-28 px-6 overflow-hidden">

        {/* Decorative Circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#D6E4F8] rounded-full opacity-40 blur-2xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Section Title */}
          <div className="text-center mb-20 px-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B4073] leading-tight mb-6">
              Why Neurodivergent Talent is a <span className="= text-[#0B4073]">Competitive Advantage</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              People with neurodivergences often bring:
            </p>
          </div>

          {/* Main Content: Text + Image */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-16 md:gap-24">

            {/* Text Box */}
            <div className="flex-1 bg-white rounded-3xl p-10 shadow-2xl space-y-10 transform hover:scale-[1.02] transition-transform duration-300">
              <ul className="space-y-6 text-gray-800 text-[17px] leading-relaxed">
                <li>
                  <strong className="text-[#0B4073]">Independent Thinking:</strong> Less influenced by group norms or “how it’s always been done.”
                </li>
                <li>
                  <strong className="text-[#0B4073]">Creative Insight:</strong> Driven by hyperfocus, lateral thinking, and deep special interests.
                </li>
                <li>
                  <strong className="text-[#0B4073]">Unique Problem-Solving:</strong> Thriving in complexity, ambiguity, and edge-case scenarios.
                </li>
                <li>
                  <strong className="text-[#0B4073]">Constructive Disruption:</strong> Challenging assumptions to drive innovation.
                </li>
              </ul>

              {/* Highlight Box */}
              <div className="bg-[#D6E2EA] p-6 rounded-xl border-l-4 border-blue-300 space-y-4">
                <p className="text-gray-800 text-[16px]">
                  Neurodivergent individuals often request <em>"reasonable adjustments"</em> — like flexible hours, alternative communication styles, or quieter workspaces. These aren't compromises — they're <strong className="text-[#0B4073]">strategic signals</strong> about what supports their success.
                </p>
                <p className="text-gray-800 text-[16px]">
                  We see these adjustments differently. They are <strong className="text-[#0B4073]">strategic signals</strong> — showing how to bring out the best in people who think differently. When embraced, they don't just support individuals; they enhance
                  <span className="font-medium text-[#0B4073]"> team performance</span>,
                  <span className="font-medium text-[#0B4073]"> retention</span>, and
                  <span className="font-medium text-[#0B4073]"> culture at scale</span>.
                </p>
              </div>

              <p className="text-xl text-[#0B4073] font-semibold mt-6">
                Our goal is to translate inclusion into actionable intelligence.
              </p>
            </div>

            {/* Image Box */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src="/images/services/IMG_7552.jpg"
                  alt="Neurodivergent Talent"
                  className="rounded-3xl shadow-2xl w-full object-cover"
                />
                {/* Floating Tag */}
                <div className="absolute -top-6 -left-6 bg-[#0B4073] text-white text-xs sm:text-sm px-4 py-2 rounded-full shadow-lg">
                  Different Minds Drive Innovation
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0B4073] mb-16">
            What We Offer
          </h2>

          <p className="text-xl text-center text-gray-800 mb-16 max-w-4xl mx-auto">
            We help businesses reframe neurodiversity from a workplace challenge into a strategic design principle.
          </p>

          <div className="bg-[#D6E2EA] rounded-xl p-8 mb-12">
            <h3 className="text-3xl font-semibold text-[#0B4073] mb-6">Data-Informed Inclusion</h3>
            <p className="text-gray-800 mb-6">
              We use a psychology and data-led approach to help businesses identify hidden neurodivergent strengths and systemic blind spots. From staff interviews to pulse surveys and culture diagnostics, we help uncover:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Image src="/favicon.ico" className="mx-2" alt="Neurodivergent Talent" width={20} height={20} />
                <p>Where barriers to neurodivergent performance exist</p>
              </li>
              <li className="flex items-start">
                <Image src="/favicon.ico" className="mx-2" alt="Neurodivergent Talent" width={20} height={20} />
                <p>What adjustments are already working (and why)</p>
              </li>
              <li className="flex items-start">
                <Image src="/favicon.ico" className="mx-2" alt="Neurodivergent Talent" width={20} height={20} />
                <p>How leaders can act on insights instead of assumptions</p>
              </li>
            </ul>
            <p className="text-gray-800 mb-6">
              Through psychology-led training, facilitation, and leadership advisory, we support:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Image src="/favicon.ico" className="mx-2" alt="Neurodivergent Talent" width={20} height={20} />
                <p>Business owners and senior leaders</p>
              </li>
              <li className="flex items-start">
                <Image src="/favicon.ico" className="mx-2" alt="Neurodivergent Talent" width={20} height={20} />
                <p>Innovation teams, startups, and scale-ups</p>
              </li>
              <li className="flex items-start">
                <Image src="/favicon.ico" className="mx-2" alt="Neurodivergent Talent" width={20} height={20} />
                <p>Organisations aiming to build cultures of deep inclusion and high performance</p>
              </li>
            </ul>
          </div>

          <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#B7C9E9] opacity-30 rounded-full blur-2xl"></div>

          <h3 className="text-3xl md:text-4xl font-bold text-[#0B4073] text-center mb-12 relative z-10">
            We work with you to:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {[
              "Reimagine recruitment, onboarding, and team design through a neuro-inclusive lens",
              "Audit invisible barriers to inclusion and innovation",
              "Turn \"reasonable adjustments\" into performance accelerators",
              "Build trust-rich, high-performing teams that thrive because of neurodivergent thinkers",
            ].map((text, index) => (
              <div
                key={index}
                className="group bg-white  p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
              >
                <div className="flex items-start">
                  <Image src="/favicon.ico" className="mx-2" alt="Neurodivergent Talent" width={40} height={40} />
                  <p className="text-gray-800 group-hover:text-[#0B4073] leading-relaxed text-[17px]">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ///////////// */}
      <section className="py-20 px-6 bg-[#D6E2EA]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B4073] mb-4">Outcomes You Can Expect</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-gray-800 mt-10">
              {[
                "More original ideas and fewer \"safe\" defaults",
                "A culture that turns flexibility into strategic advantage",
                "Practical frameworks for inclusive hiring and development",
                "Teams that feel seen, trusted, and enabled",
                "Leaders who champion difference as a driver of transformation",
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="text-[#0B4073] mt-1" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>



      {/* Why Neurodivergent Talent Section */}




      {/* Thinking Differently Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0B4073] mb-16">
            Thinking Differently About Different Thinkers
          </h2>

          <h3 className="text-2xl font-semibold text-[#0B4073] mb-8 text-center ">
            Data & Diagnostic Tool for Innovation-Driven Inclusion
          </h3>

          <div className="bg-[#D6E2EA] rounded-xl p-8 mb-16 ">
            <p className="text-gray-800 mb-6 text-lg">
              This offer was born out of years of working directly with neurodiverse individuals not just in
              theory, but in real life. As a psychological therapist and workplace practitioner, I’ve seen both
              the challenges neurodivergent people face and the brilliance they bring when placed in
              environments that truly understand and support how they think.
            </p>
            <p className="text-gray-800 mb-6 text-lg">
              Through delivering therapy, coaching, and employment readiness support, I’ve worked with
              over 1,000 neurodivergent individuals aged 18–40, many of whom are navigating work in
              healthcare, construction, logistics, and tech. I saw patterns emerge not just around what was
              missing in workplace support, but around where untapped cognitive strengths aligned
              perfectly with innovation, digital transformation, and systems thinking.
            </p>
            <p className="text-gray-800 text-lg">
              That insight became the foundation for Thinking Differently About Different Thinkers —
              a data-powered, psychology-led diagnostic and strategy tool designed for businesses ready to
              think bigger about inclusion.
            </p>
          </div>
          <div className="text-center mb-16">
            <h4 className="text-4xl font-extrabold text-[#0B4073] mb-4">What It Is</h4>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              This unique framework draws from:
            </p>
          </div>

          {/* Expertise Cards */}
          <div className="grid gap-12 md:grid-cols-3 mb-20">
            {[
              {
                title: "Frontline therapeutic and coaching work with neurodivergent people",
              },
              {
                title: "Employment pathway and training programmes",
              },
              {
                title: "Lived experience and organisational psychology methods",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white flex flex-col items-center text-center p-10 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-[#E0ECF8] p-4 rounded-full mb-6">
                  <Image
                    src="/favicon.ico"
                    alt="Icon"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <h5 className="text-xl font-semibold text-[#0B4073] leading-snug">
                  {item.title}
                </h5>
              </div>
            ))}
          </div>

          {/* Data-backed Features */}
          <div className="text-center mb-12">
            <p className="text-3xl md:text-4xl font-extrabold text-[#0B4073] mb-6 leading-relaxed max-w-4xl mx-auto">
              It’s backed by anonymised data and powered by an algorithmic model that helps businesses:  </p>
          </div>

          {/* Outcome Cards */}
          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
            {[
              "Map neuro-cognitive strengths to task and team design",
              "Spot underused talent inside current teams or recruitment pools",
              "Align minds wired for patterning, logic, or disruption with AI, data, and systems innovation roles",
              "Inform hiring, adjustments and retention plans using real-world insights not stereotypes",
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group flex items-start gap-5 p-6 bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#0B4073]"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E5F0FA] group-hover:bg-[#0B4073] transition-colors duration-300">
                  <CheckCircle className="text-[#0B4073] group-hover:text-white w-7 h-7" />
                </div>
                <p className="text-gray-800 text-base leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
          <h3 className="text-2xl font-semibold text-[#0B4073] mb-6 mt-20">
            Use Cases Include:
          </h3>
          <ul className="space-y-3 mb-10">
            {useCases.map((useCase, idx) => (
              <li key={idx} className="flex items-start ">
                <Image src="/favicon.ico" alt="Icon" width={32} height={32} className="flex-shrink-0 mr-2" />
                <p>{useCase}</p>
              </li>
            ))}
          </ul>

          <div className="bg-[#D7E3F3] rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-[#0B4073] mb-6">
              Why It Matters
            </h3>
            <p className="text-gray-800 mb-4">
            This isn’t about personality profiling. It’s about strategic inclusion. It helps leaders see what
they might be missing and do something about it.

By shifting from compliance-led adjustments to performance-led enablement, this offer
allows you to build teams that are diverse by design and stronger because of it.
            </p>
          
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
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
          {/* Text */}
          <div className="w-full text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Book a Free Consultation
            </h2>
            <p className="text-lg text-white opacity-80 max-w-2xl mx-auto">
            Take the first step towards leveraging neurodiversity as a strategic advantage.
            </p>
          </div>

          {/* Consultation Options */}
          <div className="w-full flex flex-col items-center space-y-4 md:space-y-6">
            <Link href="/book/neurodiversity" className="w-full max-w-md">
              <div className="bg-[#0B4073] text-white rounded-full py-4 px-8 flex items-center justify-between transition-all duration-300 hover:bg-[#0B4073]/90 group">
                <span className="font-medium text-lg">Neurodiversity for strategic advantage</span>
                <div className="bg-white rounded-full p-3 text-[#0B4073]">
                  <FiArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function NeurodiversityPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50"></div>
      }
    >
      <NeurodiversityContent />
    </Suspense>
  );
}
