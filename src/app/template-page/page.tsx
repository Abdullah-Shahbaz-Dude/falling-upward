import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/HeroSection';

export default function TemplatePage() {
  return (
    <div className="bg-background min-h-screen font-roboto">
      {/* Hero Section */}
      <HeroSection
        title="Page Title"
        subtitle="This is a template page with a hero section that can be customized for each page of the website."
        backgroundImage="/images/backgrounds/template-hero.jpg"
        height="medium"
        textPosition="left"
      />

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#0B4073]">Main Section Title</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-[#D6E2EA]/20 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#0B4073]">Content Section</h3>
              <p className="text-gray-700 mb-4">
                This is a template section that can be customized with your content. 
                Replace this text with your actual content.
              </p>
              <p className="text-gray-700">
                You can add multiple paragraphs, images, or other components as needed.
              </p>
            </div>
            
            <div className="bg-[#7094B7]/10 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#0B4073]">Another Section</h3>
              <p className="text-gray-700 mb-4">
                This is another template section that can be customized with your content.
                Replace this text with your actual content.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Feature or point one</li>
                <li>Feature or point two</li>
                <li>Feature or point three</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-[#0B4073] text-white">
        <div className="container-custom mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Contact us today to learn more about our services and how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-[#0B4073] font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link 
              href="/book" 
              className="bg-[#7094B7] text-white font-medium py-3 px-6 rounded-md hover:bg-[#7094B7]/90 transition-colors"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
