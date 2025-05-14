'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSection } from '@/components/HeroSection';
import { FiArrowRight, FiAward, FiUsers, FiHeart, FiCpu, FiBriefcase, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

function WhoWeAreContent() {
  const [activeTab, setActiveTab] = useState('alexander');
  const [showQualifications, setShowQualifications] = useState(false);
  const [showMemberships, setShowMemberships] = useState(false);
  const [showSuzanneQualifications, setShowSuzanneQualifications] = useState(false);

  const teamMembers = [
    {
      id: 'alexander',
      name: 'Alexander Church',
      role: 'Organisational & Business Consultant, Psychological Therapist & ADHD Coach ',
      image: '/images/meet-our-team/alex.webp',
     
      qualifications: [
        { title: 'Msc Psychology' },
        { title: 'Msc Forensic Psychology (Ongoing)' },
        { title: 'Msc Business and Organisational Psychology (Ongoing)' },
        { title: 'Diploma In Counselling' },
        { title: 'Diploma in Psychological Therapies'},
        { title: 'Diploma in Inner Child Therapy' },
        { title: 'EMDR Practitioner' },
        { title: 'Award & Certificate in ADHD Coaching'},
        { title: 'Understanding ADHD – Current Research & Practice',  },
        { title: 'Transaction Analysis 101' },
        { title: 'Level 2 and 3 Counselling Skills' },
        
      ],
      memberships:[
        {title: 'Accredited Member – British Association of Counselling & Psychotherapy (BACP)'},
        {title: 'Accredited Member – Association Psychological Therapies (APT)'}, 
        {title: 'Graduate Basis Member – British Psychological Society (BPS)'},
        {title: 'Member – EMDR Association UK'},
      ],


      bio: [
        "Alexander is a psychological therapist, ADHD coach, and an organisational and business consultant specialising in therapy, digital evolution and mentoring. With a deep understanding of human behaviour, Neurodiversity, and organisational systems, he helps both individuals and businesses break free from rigid frameworks, rethink challenges from first principles thinking, and build psychologically resilient, high performing environments.",
        "At the core of his work is a deep commitment to psychology, therapy, and human development. He works with individuals to navigate identity, impulsivity, and executive function challenges, offering structured support that blends psychological insight with practical, strengths-based mentoring." ,
        "A leader in digital health, transformation, and AI-driven strategy, Alexander has spearheaded large scale service redesigns across the public, private, and voluntary sectors, embedding data-driven decision-making and behavioural science into complex change processes. His expertise in bridging the gap between technology and people has led to the development of digital health platforms, AI-powered workforce solutions that are psychologically informed and human-centred.",
        "His approach is rooted in first principles thinking and behavioural science, ensuring that organisations, leadership teams, and individuals don't just react to change, but actively shape it. Whether advising boards on strategic decision-making, leading large-scale transformation, or working one-to-one in therapeutic practice, his focus remains on aligning growth, innovation, and resilience with the psychology of human behaviour."
      ]
    },
    {
      id: 'suzanne',
      name: 'Dr. Suzanne Heywood Everett',
      role: 'Chartered Consultant Clinical Psychologist & Organisational Innovator',
      image: '/images/meet-our-team/dr.webp',
      expertise: [
        { title: 'Clinical Psychology', icon: <FiHeart /> },
        { title: 'Neurodiversity', icon: <FiUsers /> },
        { title: 'Digital Evolution', icon: <FiCpu /> },
        { title: 'Leadership', icon: <FiAward /> },
        { title: 'Different Thinking', icon: <FiUsers /> }
      ],
      qualifications: [
        { title: 'Doctorate in Clinical Psychology' },
        { title: 'MSc - Psychology' },
        { title: 'ADHD Clinical Interviewer (Adults)' },
        { title: 'ADHD Diagnostic Interviewer' },
        { title: 'Autism Clinical Interviewer (Adults)' },
        { title: 'Diagnostic Interviewer for Social and Communication Disorders' }
      ],
      bio: [
        "Dr. Suzanne Heywood Everett is a Chartered Consultant Clinical Psychologist with over two decades of experience in both private practice and the NHS. Her career has spanned clinical leadership, service development, and staff wellbeing, working with individuals and teams across outpatient, inpatient, and high-complexity care settings. She has played a pivotal role in shaping innovative healthcare services, driving cultural change, and integrating evidence-based psychological frameworks into practice.",
        "Dr. Heywood Everett has a specialist interest in neurodiversity, particularly in how organisations can harness cognitive diversity to drive innovation and performance. She designs and delivers training programmes on neurodivergence, equipping leadership teams with the insights and practical strategies needed to create truly inclusive workplaces. As someone with an ADHD diagnosis, she brings a unique lived-experience perspective alongside her clinical expertise. This enables her to translate psychological research into actionable, real-world solutions that support both individual and organisational success.",
        "Beyond clinical psychology, Dr. Heywood Everett is passionate about leveraging digital technology to enhance workplace effectiveness, leadership decision-making, and psychological wellbeing. She works with organisations to ensure that technology adoption aligns with human behaviour, reducing resistance and embedding solutions that genuinely improve performance. Her interest in digital transformation extends to AI, workforce analytics, and the future of work, where she helps organisations navigate change without losing the human element.",
        "Dr. Heywood Everett served as the Lead Consultant Clinical Psychologist at a renowned NHS national specialist service in the North of England. She previously founded a Specialist Community Eating Disorder Team, shaping services at both a clinical and strategic level. Her clinical research includes the development of a treatment manual that was tested in a Randomized Controlled Trial (RCT), demonstrating measurable impact in real-world settings. She is actively engaged in national conferences, professional training, and media appearances, where her expertise has been sought after by television and radio as a leading psychological expert."
      ]
    }
  ];

  

  return (
    <div className="bg-background min-h-screen font-roboto">
      {/* Hero Section */}
      <HeroSection
        title="Meet Our Team"
        subtitle="Meet our team of psychology-driven innovators committed to transforming individuals and organizations through human-centered approaches."
        backgroundImage="/images/backgrounds/Who-we-are.JPG"
        height="medium"
        textPosition="left"
      />

    

      {/* Team Section with Tabs */}
      <section className="py-20 bg-[#D6E2EA]/20 px-10" >
        <div className="container-custom mx-auto">
        
          
          {/* Team Member Tabs */}
          <div className="flex justify-center mb-12 ">
            <div className="inline-flex bg-white rounded-full p-1 shadow-md mx-10">
              {teamMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setActiveTab(member.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === member.id ? 'bg-[#0B4073] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {member.name}
                </button>
              ))}
            </div>
          </div>

          {/* Team Member Content */}
          {teamMembers.map((member) => (
            <div key={member.id} className={`${activeTab === member.id ? 'block' : 'hidden'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                {/* Left Column - Photo and Quick Info */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="relative h-96 w-full">
                      <Image 
                        src={member.image} 
                        alt={member.name}
                        width={500}
                        height={600}
                        className={`object-cover w-full h-full${member.id === 'alexander' ? ' team-member-image' : ''}`}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-[#0B4073] mb-2">{member.name}</h3>
                      <p className="text-[#7094B7] font-medium mb-8">{member.role}</p>
                      
                      {/* Areas of Expertise */}
                   
                    
                      {member.id === 'alexander' && (
                        <div>
                          {/* Qualifications & Training */}
                          <div className="mt-10">
                            <button
                              onClick={() => setShowQualifications(!showQualifications)}
                              className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-md border border-[#D6E2EA] text-[#0B4073] font-semibold text-lg hover:bg-[#EEF5FA] transition-colors"
                            >
                              <span>Qualifications & Training</span>
                              <svg
                                className={`w-5 h-5 transform transition-transform duration-30 ${
                                  showQualifications ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="#0B4073"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: showQualifications ? 'auto' : 0, opacity: showQualifications ? 1 : 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-3 mt-4">
                                {member.qualifications?.map((item, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="flex items-start space-x-3 p-4 bg-white rounded-2xl shadow-sm border"
                                  >
                                    <span className="text-[#0B4073] text-xl leading-6 mt-1">•</span>
                                    <span className="text-[#0B4073] text-base font-medium">{item.title}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          </div>

                          {/* Professional Memberships */}
                          <div className="mt-10">
                            <button
                              onClick={() => setShowMemberships(!showMemberships)}
                              className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-md border border-[#D6E2EA] text-[#0B4073] font-semibold text-lg hover:bg-[#EEF5FA] transition-colors"
                            >
                              <span>Professional Memberships</span>
                              <svg
                                className={`w-5 h-5 transform transition-transform duration-30 ${
                                  showMemberships ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="#0B4073"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: showMemberships ? 'auto' : 0, opacity: showMemberships ? 1 : 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-3 mt-5">
                                {member.memberships?.map((item, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="flex items-start space-x-3 p-4 bg-white rounded-2xl shadow-sm border"
                                  >
                                    <span className="text-[#0B4073] text-xl leading-6 mt-1">•</span>
                                    <span className="text-[#0B4073] text-base font-medium">{item.title}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      )}

                      {member.id === 'suzanne' && (
                        <div>
                          {/* Qualifications & Training */}
                          <div className="mt-10">
                            <button
                              onClick={() => setShowSuzanneQualifications(!showSuzanneQualifications)}
                              className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-md border border-[#D6E2EA] text-[#0B4073] font-semibold text-lg hover:bg-[#EEF5FA] transition-colors"
                            >
                              <span>Qualifications & Training</span>
                              <svg
                                className={`w-5 h-5 transform transition-transform duration-30 ${
                                  showSuzanneQualifications ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="#0B4073"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: showSuzanneQualifications ? 'auto' : 0, opacity: showSuzanneQualifications ? 1 : 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-3 mt-4">
                                {member.qualifications?.map((item, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="flex items-start space-x-3 p-4 bg-white rounded-2xl shadow-sm border"
                                  >
                                    <span className="text-[#0B4073] text-xl leading-6 mt-1">•</span>
                                    <span className="text-[#0B4073] text-base font-medium">{item.title}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Bio */}
                <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-[#0B4073] mb-6">Biography</h3>
                  <div className="space-y-6">
                    {member.bio.map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                  
                  
                </div>
              </div>
            </div>
          ))}
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
        
        <div className="flex flex-col md:flex-row items-center container-custom mx-auto relative z-10 px-4 md:px-0">
          {/* Left Side (Text) */}
          <div className="w-full md:flex-1 text-center md:text-left mb-12 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
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
              { type: 'executive', title: 'Executive Mentoring & Boardroom Support' },
              { type: 'psychological', title: 'Psychological Therapy' },
              { type: 'thinking-different', title: 'Different Thinking For Different Thinkers' }
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

      <style jsx global>{`
        @media screen and (width: 1080px) {
          .team-member-image {
            width: 300px !important;
            height: 300px !important; 
            max-width: none !important;
            max-height: none !important;
          }
        }
        @media screen and (min-width: 1370px) and (max-width: 2000px) {
          .team-member-image {
            width: 500px !important;
            height: 500px !important;
            max-width: none !important;
            max-height: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function WhoWeAre() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-xl font-[Roboto]" style={{ color: '#7094B7' }}>Loading team information...</div>
    </div>}>
      <WhoWeAreContent />
    </Suspense>
  );
}
