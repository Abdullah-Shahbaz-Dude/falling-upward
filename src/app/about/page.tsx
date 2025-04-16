'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const teamMembers = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Lead Physiotherapist',
    bio: 'Dr. Sarah has over 15 years of experience in physiotherapy with specializations in sports rehabilitation and chronic pain management. She holds a Doctorate in Physical Therapy from Stanford University.',
    image: '/images/team-1.jpg'
  },
  {
    name: 'Michael Chen',
    role: 'Sports Rehabilitation Specialist',
    bio: 'Michael has worked with professional athletes across multiple sports. His approach combines traditional physiotherapy with cutting-edge techniques to optimize performance and recovery.',
    image: '/images/team-2.jpg'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Neurological Rehabilitation Expert',
    bio: 'Emma specializes in rehabilitation for patients with neurological conditions. Her compassionate approach and expertise help patients regain independence and improve quality of life.',
    image: '/images/team-3.jpg'
  },
  {
    name: 'James Wilson',
    role: 'Pediatric Physiotherapist',
    bio: 'James focuses on physiotherapy for children and adolescents. His playful approach makes therapy engaging for young patients while delivering effective treatment outcomes.',
    image: '/images/team-4.jpg'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container-custom mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Falling Upward</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to helping you overcome physical challenges and achieve optimal health through expert physiotherapy care.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-gray-200 h-80 md:h-auto rounded-lg overflow-hidden">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/clinic.jpg')" }}>
              {/* Placeholder for clinic image */}
            </div>
          </div>
          <div className="animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Falling Upward was founded in 2010 by Dr. Sarah Johnson with a simple mission: to provide personalized, evidence-based physiotherapy care that empowers patients to take control of their recovery and health.
            </p>
            <p className="text-gray-600 mb-4">
              The name "Falling Upward" reflects our philosophy that setbacks and challenges can become opportunities for growth and transformation. We believe that with the right support and guidance, patients can not only recover from injuries but emerge stronger than before.
            </p>
            <p className="text-gray-600 mb-4">
              Over the years, we've grown from a small practice to a comprehensive physiotherapy center, but our commitment to individualized care and patient empowerment remains unchanged.
            </p>
          </div>
        </div>

        {/* Our Approach Section */}
        <div className="bg-teal-50 rounded-lg p-8 md:p-12 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Approach</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-teal-600 text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Assessment</h3>
                <p className="text-gray-600">
                  We begin with a thorough evaluation to understand your condition, history, and goals before developing a personalized treatment plan.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-teal-600 text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Evidence-Based Treatment</h3>
                <p className="text-gray-600">
                  Our treatments combine proven techniques with the latest research to deliver effective care tailored to your specific needs.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-teal-600 text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ongoing Support</h3>
                <p className="text-gray-600">
                  We provide education, home exercise programs, and continuous guidance to support your long-term health and prevent future issues.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 bg-gray-200">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${member.image})` }}>
                    {/* Placeholder for team member image */}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-teal-600 mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-teal-600 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Patient-Centered Care</h3>
                <p className="text-gray-600">
                  We put your needs, goals, and preferences at the center of everything we do.
                </p>
              </div>
              <div className="border-l-4 border-teal-600 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Excellence</h3>
                <p className="text-gray-600">
                  We strive for the highest standards in clinical practice, continuing education, and patient outcomes.
                </p>
              </div>
              <div className="border-l-4 border-teal-600 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Compassion</h3>
                <p className="text-gray-600">
                  We approach each patient with empathy, understanding, and genuine care for their wellbeing.
                </p>
              </div>
              <div className="border-l-4 border-teal-600 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Empowerment</h3>
                <p className="text-gray-600">
                  We educate and equip you with the knowledge and tools to actively participate in your recovery.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 bg-gray-200 h-80 md:h-auto rounded-lg overflow-hidden">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/values.jpg')" }}>
              {/* Placeholder for values image */}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're recovering from an injury, managing chronic pain, or looking to optimize your physical performance, we're here to help you achieve your goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book" className="btn-primary flex items-center">
              Book an Appointment <FiArrowRight className="ml-2" />
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
