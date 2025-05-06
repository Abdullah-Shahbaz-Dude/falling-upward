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
      description: "less influenced by group norms or \"how it's always been done\"",
      bgColor: "bg-blue-50",
    },
    {
      title: "Creative insight",
      description: "driven by hyperfocus, lateral thinking, and deep special interests",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Unique problem-solving",
      description: "thriving in complexity, ambiguity, and edge-case scenarios",
      bgColor: "bg-purple-50",
    },
    {
      title: "Constructive disruption",
      description: "challenging assumptions in ways that drive progress",
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

  // Diagnostic tool features
  const diagnosticFeatures = [
    "Map neuro-cognitive strengths to task and team design",
    "Spot underused talent inside current teams or recruitment pools",
    "Align minds wired for patterning, logic, or disruption with AI, data, and systems innovation roles",
    "Inform hiring, adjustments and retention plans using real-world insights not stereotypes"
  ];

  return (
    <div className="font-roboto">
      <HeroSection
        title="Neurodiversity for strategic advantage"
        subtitle="Innovation doesn't come from consensus; it comes from difference"
        backgroundImage="/images/services/IMG_7552.jpg"
        textPosition="left"
        height="medium"
      />

      <section className="relative pt-0 py-10 pb-0 bg-gradient-to-br from-[#EFF6FB] via-[#F7FAFC] to-white overflow-hidden">
        <div className="container-custom mx-auto pt-16">
          {/* Breadcrumb */}
          <div className="mb-8 px-10">
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

      <section className="bg-[#F7FAFC] py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Modern asymmetrical layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left content - questions */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-xl">
              <div className="w-full h-2 bg-[#0B4073] mb-6"></div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B4073] mb-8">
                Is your workplace really designed for different minds —
                or just different personalities?
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B4073] mb-6">
                Could your most unconventional thinkers be your most underutilised asset?
              </h2>
              <p className="text-lg text-gray-800 mb-4">
                In a world of rapid change, businesses can't afford to rely solely on conventional thinking.
              </p>
              <div className="flex items-center space-x-4 mt-10">
                <div className="h-0.5 flex-grow bg-gray-200"></div>
                <span className="text-gray-500 font-medium">Rethink neurodiversity</span>
                <div className="h-0.5 flex-grow bg-gray-200"></div>
              </div>
              <div className="relative h-[180px] w-full mt-8 rounded-xl overflow-hidden">
                <Image
                  src="/images/services/IMG_7552.jpg"
                  alt="Different thinking approaches"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>

            {/* Right content - beliefs */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="bg-[#0B4073] text-white rounded-3xl p-8 sm:p-10 shadow-xl mb-6">
                <p className="text-2xl font-semibold mb-6 text-white">
                  Neurodiversity can disrupt default patterns and that's exactly what makes it valuable.
                </p>
                <p className="text-lg text-white">
                  We believe Innovation doesn't come from consensus; it comes from <span className="font-bold text-white">difference</span>.
                </p>
              </div>

              <div className="bg-[#E9F0F7] rounded-3xl p-8 sm:p-10 shadow-lg">
                <p className="text-gray-800">
                  Neurodivergent individuals challenge norms, question assumptions, and approach problems
                  from unexpected angles. This can be essential for businesses that want to grow, adapt, and
                  lead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B4073] leading-tight md:w-1/2">
              Why Neurodivergent Talent is a Competitive Advantage
            </h2>
            <p className="text-xl text-gray-600 md:w-1/2">
              People with neurodivergences often bring:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-[#0B4073] hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="bg-[#E9F0F7] p-3 rounded-xl mr-4">
                  <Image src="/favicon.ico" alt="Icon" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold text-[#0B4073]">Independent thinking</h3>
              </div>
              <p className="text-gray-700 pl-16">less influenced by group norms or "how it's always been done"</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-[#0B4073] hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="bg-[#E9F0F7] p-3 rounded-xl mr-4">
                  <Image src="/favicon.ico" alt="Icon" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold text-[#0B4073]">Creative insight</h3>
              </div>
              <p className="text-gray-700 pl-16">driven by hyperfocus, lateral thinking, and deep special interests</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-[#0B4073] hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="bg-[#E9F0F7] p-3 rounded-xl mr-4">
                  <Image src="/favicon.ico" alt="Icon" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold text-[#0B4073]">Unique problem-solving</h3>
              </div>
              <p className="text-gray-700 pl-16">thriving in complexity, ambiguity, and edge-case scenarios</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-[#0B4073] hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="bg-[#E9F0F7] p-3 rounded-xl mr-4">
                  <Image src="/favicon.ico" alt="Icon" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold text-[#0B4073]">Constructive disruption</h3>
              </div>
              <p className="text-gray-700 pl-16">challenging assumptions in ways that drive progress</p>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <div className="bg-[#D6E2EA] p-8 rounded-3xl shadow-lg">
                <p className="text-gray-800 text-lg mb-6">
                  Neurodivergent individuals often request "reasonable adjustments" — like flexible hours,
                  alternative communication styles, or quieter workspaces. These are often seen as
                  compromises.
                </p>
                <p className="text-gray-800 text-lg">
                  We see them differently. These adjustments are strategic signals. They show how to get the
                  best out of people who think differently — and when embraced, they don't just support
                  individuals, they enhance team performance, retention, and culture at scale.
                </p>
                <p className="text-gray-800 text-lg mt-6 font-semibold">
                  Our goal is to translate inclusion into actionable intelligence.
                </p>
              </div>
            </div>

            <div className="md:w-1/3">
              <img
                src="/images/services/IMG_7552.jpg"
                alt="Neurodivergent Talent"
                className="rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 px-4 sm:px-6 bg-[#F7FAFC]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl font-bold text-center text-[#0B4073] mb-6">
              What We Offer
            </h2>
            <p className="text-xl text-center text-gray-800 mb-4 max-w-3xl mx-auto">
              We help businesses reframe neurodiversity from a workplace challenge into a strategic design
              principle.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl mb-16">
            <div className="w-full h-2 bg-[#0B4073] mb-8"></div>

            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-2/5">
                <div className="sticky top-8">
                  <h3 className="text-3xl font-semibold text-[#0B4073] mb-6 pb-4 border-b-2 border-gray-200">Data-Informed Inclusion</h3>
                  <p className="text-gray-700 mb-6">
                    We use a psychology and data-led approach to help businesses identify hidden
                    neurodivergent strengths and systemic blind spots. From staff interviews to pulse surveys and
                    culture diagnostics.
                  </p>
                  <div className="relative h-[250px] w-full rounded-xl overflow-hidden shadow-lg mb-6">
                    <Image
                      src="/images/services/IMG_7552.jpg"
                      alt="Neurodiversity as a strategic advantage"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </div>
              </div>

              <div className="md:w-3/5">
                <div className="space-y-10">
                  <div>
                    <h4 className="text-xl font-semibold text-[#0B4073] mb-4">We help uncover:</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start bg-[#E9F0F7] p-4 rounded-lg">
                        <div className=" p-2 rounded-lg mr-3">
                          <Image src="/favicon.ico" alt="Neurodivergent Talent" width={20} height={20} />
                        </div>
                        <p className="text-gray-800">Where barriers to neurodivergent performance exist</p>
                      </li>
                      <li className="flex items-start bg-[#E9F0F7] p-4 rounded-lg">
                        <div className="bg-[#D6E2EA] p-2 rounded-lg mr-3">
                          <Image src="/favicon.ico" alt="Neurodivergent Talent" width={20} height={20} />
                        </div>
                        <p className="text-gray-800">What adjustments are already working (and why)</p>
                      </li>
                      <li className="flex items-start bg-[#E9F0F7] p-4 rounded-lg">
                        <div className="bg-[#D6E2EA] p-2 rounded-lg mr-3">
                          <Image src="/favicon.ico" alt="Neurodivergent Talent" width={20} height={20} />
                        </div>
                        <p className="text-gray-800">How leaders can act on insights instead of assumptions</p>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-[#0B4073] mb-4">Through psychology-led training, facilitation, and leadership advisory, we support:</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start bg-[#E9F0F7] p-4 rounded-lg">
                        <div className="bg-[#D6E2EA] p-2 rounded-lg mr-3">
                          <Image src="/favicon.ico" alt="Neurodivergent Talent" width={20} height={20} />
                        </div>
                        <p className="text-gray-800">Business owners and senior leaders</p>
                      </li>
                      <li className="flex items-start bg-[#E9F0F7] p-4 rounded-lg">
                        <div className="bg-[#D6E2EA] p-2 rounded-lg mr-3">
                          <Image src="/favicon.ico" alt="Neurodivergent Talent" width={20} height={20} />
                        </div>
                        <p className="text-gray-800">Innovation teams, startups, and scale-ups</p>
                      </li>
                      <li className="flex items-start bg-[#E9F0F7] p-4 rounded-lg">
                        <div className="bg-[#D6E2EA] p-2 rounded-lg mr-3">
                          <Image src="/favicon.ico" alt="Neurodivergent Talent" width={20} height={20} />
                        </div>
                        <p className="text-gray-800">Organisations aiming to build cultures of deep inclusion and high performance</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-center text-[#0B4073] mb-12">
            We work with you to:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                text: "Reimagine recruitment, onboarding, and team design through a neuro-inclusive lens"
              },
              {
                text: "Audit invisible barriers to inclusion and innovation"
              },
              {
                text: "Turn \"reasonable adjustments\" into performance accelerators"
              },
              {
                text: "Build trust-rich, high-performing teams that thrive because of neurodivergent thinkers"
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="bg-[#0B4073] p-3 rounded-full mr-4 flex-shrink-0">
                    <Image src="/favicon.ico" alt="Icon" width={24} height={24} />
                  </div>
                  <p className="text-[#0B4073] text-lg font-medium">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-20 px-4 sm:px-6 bg-[#0B4073]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-2/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Outcomes You Can Expect</h2>
              <div className="h-1 w-24 bg-white mb-8"></div>
              <div className="relative">
                <div className="relative z-10 h-[300px] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/services/IMG_7552.jpg"
                    alt="Neurodiversity outcomes"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-3/5">
              <ul className="space-y-6">
                {outcomes.map((item, index) => (
                  <li key={index} className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 bg-[#0A355F] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors duration-300">
                      <CheckCircle className={`w-6 h-6 text-white group-hover:text-[#0B4073]`} />
                    </div>
                    <div className="bg-[#0A355F] p-4 rounded-xl flex-grow group-hover:bg-[#052544] transition-colors duration-300">
                      <span className="text-lg text-white">{item}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Thinking Differently Section */}
      <section className="py-20 px-4 sm:px-6 bg-[#F7FAFC]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B4073] mb-3">
              Thinking Differently About Different Thinkers
            </h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#0B4073] mb-4">
              Data & Diagnostic Tool for Innovation-Driven Inclusion
            </h3>
            <div className="h-1 w-24 bg-[#0B4073] mx-auto"></div>
          </div>

        

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <p className="text-gray-800 text-lg mb-6">
                This offer was born out of years of working directly with neurodiverse individuals not just in
                theory, but in real life. As a psychological therapist and workplace practitioner, I've seen both
                the challenges neurodivergent people face and the brilliance they bring when placed in
                environments that truly understand and support how they think.
              </p>
              <p className="text-gray-800 text-lg">
                Through delivering therapy, coaching, and employment readiness support, I've worked with
                over 1,000 neurodivergent individuals aged 18–40, many of whom are navigating work in
                healthcare, construction, logistics, and tech.
              </p>
            </div>

            <div className="bg-[#D6E2EA] rounded-3xl p-8 shadow-xl">
              <p className="text-gray-800 text-lg mb-6">
                I saw patterns emerge not just around what was missing in workplace support, but around where untapped cognitive strengths aligned perfectly with innovation, digital transformation, and systems thinking.
              </p>
              <p className="text-gray-800 text-lg">
                That insight became the foundation for Thinking Differently About Different Thinkers —
                a data-powered, psychology-led diagnostic and strategy tool designed for businesses ready to
                think bigger about inclusion.
              </p>
            </div>
          </div>

          <div className="text-center mb-16">
            <h4 className="text-3xl md:text-4xl font-extrabold text-[#0B4073] mb-6">What It Is</h4>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
              This unique framework draws from:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-4 lg:gap-8">
              {frameworkSources.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative h-[180px] w-full">
                    <Image
                      src={`/images/services/IMG_7552.jpg`}
                      alt={item}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-[#0B4073]/80"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <div className="bg-white rounded-full p-2 inline-block">
                        <Image
                          src="/favicon.ico"
                          alt="Icon"
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h5 className="text-lg font-semibold text-[#0B4073] mb-2 line-clamp-2">
                      {item}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Features */}
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0B4073] mb-8 text-center">
              It's backed by anonymised data and powered by an algorithmic model<br />that helps businesses:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {diagnosticFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex gap-6 items-center p-4 rounded-2xl hover:bg-[#E9F0F7] transition-colors duration-300"
                >
                  <div className="relative h-20 w-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <Image
                      src={`/favicon.ico`}
                      alt={feature}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-800 text-lg">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-4 bg-[#0B4073] rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-semibold mb-6">
                Use Cases Include:
              </h3>
              <div className="h-1 w-16 bg-white mb-8"></div>
              <ul className="space-y-6">
                {useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="mr-4 mt-1 flex-shrink-0">
                      <Image src="/favicon.ico" alt="Icon" width={28} height={28} />
                    </div>
                    <p className="text-white">{useCase}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-8 bg-[#D6E2EA] rounded-3xl p-8">
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-[#0B4073] mb-6">
                  Why It Matters
                </h3>
                <div className="h-1 w-16 bg-[#0B4073] mb-8"></div>
                <p className="text-gray-800 text-lg mb-6">
                  This isn't about personality profiling. It's about strategic inclusion. It helps leaders see what
                  they might be missing and do something about it.
                </p>
               
                <p className="text-gray-800 text-lg">
                  By shifting from compliance-led adjustments to performance-led enablement, this offer
                  allows you to build teams that are diverse by design and stronger because of it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          {/* Text */}
          <div className="w-full text-center mb-12">
            <h2 className="text-2xl xs:text-3xl md:text-5xl font-bold text-white mb-4">
              Book a Free Consultation
            </h2>
            <p className="text-lg text-white opacity-80 max-w-2xl mx-auto">
              Select our services to book your free consultation with us.
            </p>
          </div>

          <Link href="/book/neurodiversity" className="w-full max-w-md">
            <div className="bg-[#0B4073] text-white rounded-full py-4 px-8 flex items-center justify-between transition-all duration-300 hover:bg-[#0B4073]/90 group">
              <span className="font-medium text-lg">
              Neurodiversity for strategic advantage</span>
              <div className="bg-white rounded-full p-3 text-[#0B4073]">
                <FiArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>
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
