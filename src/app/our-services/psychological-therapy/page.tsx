'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { HeroSection } from '@/components/HeroSection';
import { FaBrain,  FaHeart, FaLeaf, FaLightbulb, FaWalking } from 'react-icons/fa';

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
          <Link href="/our-offers" className="text-[#6A8EA0] hover:text-[#4A6E80] inline-flex items-center">
            <FiArrowLeft className="mr-2" />
            Back to Our Offers
          </Link>
        </div>


      </div>
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mt-10 mx-8">
        {/* Individual */}
        <div className="group bg-white p-10 md:p-12 rounded-3xl shadow-md border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-0">
            <div className=" text-white p-4 rounded-full text-2xl group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/favicon.ico"
                alt="icon"
                width={50}
                height={50}
                className="group-hover:scale-110 transition-transform"
              />
            </div>

          </div>

          <p className="text-gray-700 text-lg leading-relaxed">
            A space to feel seen, understood, and supported—whoever you are, wherever you're starting from.
          </p>
        </div>

        {/* Organisation */}
        <div className="group bg-white p-10 md:p-12 rounded-3xl shadow-md border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-0">
            <div className=" text-white p-4 rounded-full text-2xl group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/favicon.ico"
                alt="icon"
                width={50}
                height={50}
                className="group-hover:scale-110 transition-transform"
              />
            </div>

          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            You live for around 3 billion seconds. How many of those are you spending worried, disconnected or weighed down by things that no longer serve you?
          </p>
        </div>
      </div>



      <div className="bg-[#D6E2EA] py-20 mt-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/Image (1).png" // Replace with your actual image path
                alt="Therapy Room"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-gray-700">

              <p className="text-lg md:text-xl leading-relaxed md:leading-loose text-gray-800 mb-6">
                At <span className="font-semibold text-[#0B4073]">Falling Upwards</span>, we believe therapy should be&nbsp;
                <span className="font-semibold text-[#0B4073]">human, not clinical</span>.
                It's about <span className="italic">connection</span>, <span className="italic">understanding</span>, and gently exploring
                the experiences that shape how we think, feel, and move through the world.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#7094B7] py-8 mt-10 shadow-md ">
          <div className="text-white text-center px-6">
            <p className="text-2xl md:text-3xl leading-relaxed">
              We want to help you make the most of your time here, free from
              unhelpful thoughts, unresolved experiences, and inner cycles that
              keep repeating.
            </p>
          </div>
        </div>
      </div>
      {/* List of challenges */}
      {/* Heading */}
      <div className="mb-20 text-center mt-16 ">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
          How are things for you?
        </h2>
      </div>
      <div className='max-w-7xl mx-auto px-6 md:px-12 '>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
          {[
            "Do you feel lost, different, or excluded from the world around you?",
            "Do you struggle with your identity and sense of belonging?",
            "Do you carry unresolved pain, trauma or buried memories?",
            "Are relationships hard to build or maintain?",
            "Do you feel like you're living life for everyone but yourself?",
            "Do impulsive thoughts, overwhelming emotions, or cycles of behaviour keep pulling you off track?",
            "Are you masking who you really are to get through each day?",
            "Do you feel lonely, misunderstood, or unbalanced?",
            "Are you facing a major life change or living with grief that feels hard to name?",
          ].map((question, idx) => (
            <div
              key={idx}
              className="flex min-h-[120px] items-start p-6  bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
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
              <p className="text-gray-800 text-lg leading-relaxed h-">{question}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#7094B7] py-8 mt-16 shadow-md ">
        <div className="text-white text-center px-6">
          <p className="text-xl md:text-2xl leading-relaxed">
            Whilst some of the above is directly assocated with ADHD, some of it may not be and coaching will help you understand this better and develop a better understand to help you move forwards with clarity.
          </p>
        </div>
      </div>
      <div className="relative bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:px-8">
        {/* Header section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B4073] mb-4">
            <span className="block text-6xl mb-6">Walking Therapy:</span>
            <span className="text-[#0B4073]">A Different Way to Talk</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0B4073] to-[#0B4073] mx-auto mt-6"></div>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column - Description */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="prose prose-lg text-gray-700">
              <p>
                As an alternative to face-to-face or online therapy, Walking Therapy offers something a little different. Sometimes, stepping outside can help us connect more deeply, both with ourselves and with the world around us.
              </p>
              <p className="mt-6">
                Walking Therapy blends gentle movement with conversation, allowing the rhythm of walking and the presence of nature to support the therapeutic process. For many people, walking side-by-side makes it easier to talk, with words and feelings flowing more naturally in the open air.
              </p>
            </div>
          </div>

          {/* Right column - Benefits */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#D6E2EA] to-[#D6E2EA] rounded-2xl shadow-lg p-8 border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                The Benefits of Walking Therapy
              </h2>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4 text-blue-500">
                   <img src="/favicon.ico" alt="icon" className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Connection with nature</h3>
                    <p className="text-gray-600 mt-1">Supporting emotional regulation, reducing stress, and offering a grounded sense of presence.</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4 text-blue-500">
                  <img src="/favicon.ico" alt="icon" className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Movement and Mindfulness</h3>
                    <p className="text-gray-600 mt-1">Engaging the body can foster mindfulness, release endorphins, and promote a sense of vitality.</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4 text-blue-500">
                  <img src="/favicon.ico" alt="icon" className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Ease and Flow</h3>
                    <p className="text-gray-600 mt-1">Walking often makes difficult conversations feel lighter and less intense, helping emotional processing unfold more organically.</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4 text-blue-500">
                  <img src="/favicon.ico" alt="icon" className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Creativity and Insight</h3>
                    <p className="text-gray-600 mt-1">Natural environments have been shown to boost creative thinking and emotional exploration.</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4 text-blue-500">
                  <img src="/favicon.ico" alt="icon" className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Support for mood</h3>
                    <p className="text-gray-600 mt-1">Regular time in nature has been associated with reduced symptoms of depression and anxiety.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="bg-white py-16 px-6 sm:px-8 lg:px-12">
  <div className="max-w-7xl mx-auto border border-blue-200 rounded-2xl p-6 sm:p-8 md:p-12 bg-white shadow-xl">
    {/* Main Title */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#0B4073] mb-6">
      How therapy can support you
    </h2>

    {/* Subtitle */}
    <p className="text-center text-gray-700 max-w-3xl mx-auto mb-8 sm:mb-10 text-lg sm:text-xl leading-relaxed">
      Our sessions offer a safe, non-judgemental space to explore what's going on, where it comes from, and how to move through it—with empathy, not pressure.
    </p>

    {/* Help Box */}
    <div className="bg-[#D6E2EA] rounded-2xl p-8 sm:p-12 md:p-16 space-y-6 border border-blue-100 shadow-inner">
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-[#0B4073] mb-6">
        We can help you:
      </h3>

      <ul className="space-y-4">
        {[
          "Feel listened to, validated and genuinely seen",
          "Make sense of your inner world and life experiences",
          "Break free from patterns that no longer serve you",
          "Feel more grounded, calm, and in control",
          "Be kinder to yourself and reconnect with your values",
          "Begin to accept, integrate and heal",
          "Move towards the life you want—not the one you've been surviving",
        ].map((item, index) => (
          <li
            key={index}
            className="bg-white flex items-center text-gray-800 min-h-[80px] sm:min-h-[90px] md:min-h-[100px] text-base sm:text-lg md:text-xl leading-snug rounded-xl px-4 sm:px-5 md:px-6 py-4 sm:py-5 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition duration-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>


      <section className="bg-[#D6E2EA] px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">

          {/* Left Side */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B4073] mb-6">
              Book a Free Consultation
            </h2>

            <ul className="space-y-4 text-gray-800 mb-6">
              <li className="flex items-center gap-3">
                <span className="text-xl">
                  <Image
                    src="/favicon.ico" // Update path if needed
                    alt="icon"
                    width={24}
                    height={24}
                    className="group-hover:scale-110 transition-transform"
                  />
                </span>
                <span>Whether you're at breaking point</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl"><img
                  src="/favicon.ico" // Replace this with your image path
                  alt="icon"
                  className="h-6 w-6 group-hover:scale-110 transition-transform"
                /></span>
                <span>somewhere in the fog</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">
                  <Image
                    src="/favicon.ico" // Update path if needed
                    alt="icon"
                    width={24}
                    height={24}
                    className="group-hover:scale-110 transition-transform"
                  />
                </span>
                <span>Or just starting to wonder</span>
              </li>
            </ul>

            <p className="text-gray-700 mb-8">
              You're welcome here. Let's talk—without pressure or commitment.
            </p>

            <div className="bg-[#7094B7] rounded-md px-6 py-4 text-white font-semibold flex items-center justify-center gap-3 text-lg">
              <span className="text-xl">
                <Image
                  src="/favicon.ico" // Update path if needed
                  alt="icon"
                  width={24}
                  height={24}
                  className="group-hover:scale-110 transition-transform"
                />
              </span>
              <span>In-person and online sessions available</span>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative flex-1 max-w-md w-full">
            <Image
              src="/images/image 16.png" // <- Put your image in /public
              alt="Consultation"
              width={400}
              height={300}
              className="rounded-xl object-cover w-full h-auto shadow-md"
            />

            {/* Floating text box */}
            <div className="absolute top-1/4 left-[10%] transform -translate-y-1/2 bg-[#7094B7] text-white px-5 py-2 text-sm rounded-md shadow-md">
              "is this it?"
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
              
              { type: 'psychological', title: 'Psychological Therapy' },
             
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
