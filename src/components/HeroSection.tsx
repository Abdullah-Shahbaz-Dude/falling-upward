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
    small: 'h-[40vh]',
    medium: 'h-[75vh]',
    large: 'h-screen'
  };

  // Text position classes
  const positionClass = {
    center: 'text-center justify-center left-2',
    left: 'text-left justify-start pl-2 md:pl-2'
  };

  return (
   <section className={`relative ${heightClass[height]} flex items-center overflow-hidden`}>
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

  {/* Content */}
  <div
    className={`
      container-custom relative z-10 
      mx-4 md:mx-[35px] 
      mt-10 md:mt-[300px] 
      text-center md:text-left 
      flex flex-col items-center md:items-start
    `}
  >
    <div className="space-y-6 max-w-4xl">
      <h1
        className={`text-3xl md:text-5xl font-bold text-${textColor} font-roboto`}
      >
        {title}
      </h1>
    </div>
  </div>
</section>
  );
}
