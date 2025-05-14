'use client';

import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  height?: 'small' | 'medium' | 'large';
  overlay?: boolean;
  textPosition?: 'center' | 'left';
  textColor?: string;
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  height = 'medium',
  overlay = true,
  textPosition = 'center',
  textColor = 'white'
}: HeroSectionProps) {
  // Use a default placeholder image if none is provided
  const imageUrl = backgroundImage || 'https://placehold.co/1920x1080/0B4073/D6E2EA?text=Falling+Upward';
  // Height classes based on the prop
  const heightClass = {
    small: 'h-[40vh] md:h-[40vh]',
    medium: 'h-[50vh] md:h-[75vh]',
    large: 'h-[60vh] md:h-screen'
  };

  // Text position classes
  const positionClass = {
    center: 'text-center justify-center',
    left: 'text-left justify-start'
  };

  return (
    <section className={`relative ${heightClass[height]} flex items-center overflow-hidden service-page-hero`}>
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${title} background image`}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-black opacity-50 z-0"></div>}

      {/* Content - Positioned at bottom of hero */}
      <div
        className={`
          absolute left-0 right-0 bottom-10 sm:bottom-12 md:bottom-16 lg:bottom-20 
          w-full max-w-7xl px-4 sm:px-6 lg:px-8 ml-4

          mx-auto
          flex flex-col items-start justify-end
          z-20
        `}
      >
        <div className={`max-w-4xl hero-content pl-0 ml-1 sm:ml-2 md:ml-3 lg:ml-4`}>
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-${textColor} font-roboto text-left`}
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
