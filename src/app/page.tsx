"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiCheck,
  FiUsers,
  FiAward,
  FiActivity,
  FiMail,
  FiPhone,
  FiHeart,
  FiBriefcase,
  FiStar,
  FiCpu,
  FiChevronDown,
  FiChevronUp,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
} from "react-icons/fi";

// Logo Slider Component
function LogoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // We have 3 slides with 5 logos each (15 logos total)
  const [isHovering, setIsHovering] = useState(false);

  // Auto transition effect - pauses on hover
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isHovering, totalSlides]);

  // Organization logos data - using actual provided logos
  const allLogos = [
    // First slide
    [
      { name: "Organization 1", src: "/images/logos/OIP.png" },
      { name: "Organization 2", src: "/images/logos/OIP-2.png" },
      { name: "Organization 3", src: "/images/logos/OIP-3.png" },
      { name: "Organization 5", src: "/images/logos/OIP-5.png" },
      { name: "Organization 6", src: "/images/logos/OIP-6.png" },
    ],
    // Second slide
    [
      { name: "Organization 7", src: "/images/logos/OIP-7.png" },
      { name: "Organization 8", src: "/images/logos/OIP-8.png" },
      { name: "Organization 9", src: "/images/logos/OIP-9.png" },
      { name: "Organization 10", src: "/images/logos/download.png" },
      { name: "Organization 11", src: "/images/logos/download-1.png" },
    ],
    // Third slide
    [
      { name: "Organization 12", src: "/images/logos/download-1-1.png" },
      { name: "Organization 13", src: "/images/logos/download-11.png" },
      { name: "Organization 14", src: "/images/logos/thumbnail_image001.png" },
      { name: "Organization 15", src: "/images/logos/thumbnail_image002.png" },
    ],
  ];

  return (
    <div
      className="relative py-16 md:py-20"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Logo Slides Container */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
            }
            className="absolute left-4 md:left-8 z-20 w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-all"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="text-[#6A8EA0] text-3xl" />
          </button>

          {/* Logo Slides */}
          <div className="w-full overflow-hidden">
            {allLogos.map((logoGroup, groupIndex) => (
              <div
                key={groupIndex}
                className={`transition-all duration-700 ${currentSlide === groupIndex ? "block" : "hidden"}`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center px-4 md:px-8">
                  {logoGroup.map((logo, logoIndex) => (
                    <div
                      key={logoIndex}
                      className="flex flex-col justify-center items-center py-6 px-4 transition-all duration-300 group"
                    >
                      <div className="relative h-28 md:h-36 w-full mb-4 flex items-center justify-center">
                        <Image
                          src={logo.src}
                          alt={logo.name}
                          width={500}
                          height={500}
                          className="object-contain max-h-24 max-w-40 transition-all duration-300"
                          priority={groupIndex === 0}
                        />
                      </div>
                      <div className="text-center text-sm font-medium text-gray-700 mt-2"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
            className="absolute right-4 md:right-8 z-20 w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-all"
            aria-label="Next slide"
          >
            <FiChevronRight className="text-[#6A8EA0] text-3xl" />
          </button>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-10 space-x-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${index === currentSlide ? "w-8 h-8 bg-[#6A8EA0] rounded-full" : "w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"}`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="text-white font-medium">{index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Accordion Item Component
function AccordionItem({
  title,
  content,
  isOpen = false,
}: {
  title: string;
  content: React.ReactNode;
  isOpen?: boolean;
}) {
  const [expanded, setExpanded] = useState(isOpen);

  return (
    <div className="border-b border-[#D6E2EA]">
      <button
        className="w-full py-4 px-5 flex justify-between items-center bg-[#D6E2EA]/30 rounded-lg hover:bg-[#D6E2EA]/40 transition-colors"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="font-medium text-left text-[#18425e]">{title}</span>
        <div className="w-8 h-8 flex items-center justify-center text-[#7094B7] rounded-full">
          {expanded ? (
            <FiChevronUp className="text-lg" />
          ) : (
            <FiChevronDown className="text-lg" />
          )}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-40 py-4 px-5" : "max-h-0"}`}
        aria-hidden={!expanded}
      >
        {content}
      </div>
    </div>
  );
}

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Demo background images - replace these with your actual images
  const backgroundImages = [
    "/images/HomePage/IMG_7551.webp",
    "/images/HomePage/IMG_7552.webp",
    "/images/HomePage/IMG_7553.webp",
    "/images/HomePage/IMG_7554.webp",
  ];

  // Create refs for all images
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // Set up the initial zoom animation for the first image
    // Use a small timeout to ensure the ref is populated
    const initialZoomTimeout = setTimeout(() => {
      if (imageRefs.current[0]) {
        const firstImage = imageRefs.current[0];

        // Apply initial styles before animation
        firstImage.style.transition = "none";
        firstImage.style.transform = "scale(1)";

        // Force a reflow
        firstImage.getBoundingClientRect();

        // Start the animation
        firstImage.style.transition =
          "transform 7s cubic-bezier(0.25, 0.1, 0.25, 1)";
        firstImage.style.transform = "scale(1.25)";
      }
    }, 50);

    // Rotate through images every 6 seconds (4s zoom + 2s still)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % backgroundImages.length;

        // Set up animation for the next image
        if (imageRefs.current[nextIndex]) {
          const nextImage = imageRefs.current[nextIndex];
          nextImage.style.transition = "none";
          nextImage.style.transform = "scale(1)";

          // Force a reflow
          nextImage.getBoundingClientRect();

          // Start the animation
          setTimeout(() => {
            nextImage.style.transition =
              "transform 7s cubic-bezier(0.25, 0.1, 0.25, 1)";
            nextImage.style.transform = "scale(1.25)";
          }, 100); // Small delay to ensure opacity transition has started
        }

        return nextIndex;
      });
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialZoomTimeout);
    };
  }, []);

  return (
    <div className="font-roboto ">
      {/* Hero Section with Rotating Background */}
      <section className="hero-section relative h-screen min-h-[500px] flex items-center overflow-hidden">
        {/* Background Images with Transitions and Zoom Effect */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-300 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
          >
            <div
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="absolute inset-0 bg-cover bg-center transform-gpu"
              style={{
                backgroundImage: `url(${image})`,
                willChange: "transform",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
              aria-hidden={index !== currentImageIndex ? "true" : "false"}
              role="img"
              aria-label={`Hero image ${index + 1}`}
            ></div>
          </div>
        ))}

        {/* Overlay with slightly reduced opacity for better text contrast */}
        <div className="absolute inset-0 bg-black opacity-45 z-0"></div>

        {/* Positioned at the left bottom corner with enhanced text styling */}
        <div className="absolute bottom-20 left-[1.5rem] sm:left-[2rem] md:left-[3rem] lg:left-[4rem] z-10 w-[90vw] sm:w-[85vw] md:max-w-2xl px-1 sm:px-2">
          <h1 className="text-4xl sm:text-4xl md:text-7xl lg:text-8xl text-white font-bold tracking-tight leading-tight">
            Falling Upwards
          </h1>
          <p className="text-white/95 text-xl md:text-2xl mt-4 tracking-wide">
            Psychological Therapy, Mentoring, Coaching and Business Consultancy
          </p>
          <div className="mt-6 w-32 h-1 bg-white/50 rounded-full"></div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-10 right-0 transform -translate-x-1/2 flex space-x-2 z-20 max-w-full overflow-x-auto pb-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? "bg-teal-400 w-8" : "bg-white/50"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Why Falling Upwards Exists Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#EFF6FB] via-[#F7FAFC] to-white overflow-hidden">
        <div className="container mx-auto px-6 sm:px-10 lg:px-20">
          {/* Title + Subtitle */}
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl sm:text-6xl font-bold text-[#0B4073] leading-tight mb-6">
              Why Falling Upwards Exists
            </h2>
          </div>

          {/* First paragraph */}
          <div className="max-w-3xl mx-auto text-center px-4 mb-10">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-500">
              <p className="text-lg sm:text-xl text-gray-800 leading-relaxed">
                <span >Falling Upwards</span> exists to
                help individuals and organisations define a vision and direction
                shaped by who they truly are and what they value. The only
                certainty in life is that we move forwards. If we're lucky, we
                have around{" "}
                <span>3 billion seconds</span> on this
                earth to make that journey count.
              </p>
            </div>
          </div>

          {/* Full Width Image Strip */}
          <div className="w-full my-12">
            <div
              className="rounded-xl overflow-hidden shadow-lg"
              style={{ height: "300px" }}
            >
              {" "}
              {/* Adjust height as needed */}
              <Image
                src="/images/HomePage/dji_0355.webp"
                alt="Falling Upwards"
                width={1920} // Larger width for full-width display
                height={200} // Matches the container height
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          {/* Dual Cards */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mt-10">
            {/* Individual */}
            <div className="group bg-white p-10 md:p-12 rounded-3xl shadow-md border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#0B4073] text-white p-4 rounded-full text-2xl group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/favicon.ico"
                    alt="icon"
                    width={24}
                    height={24}
                    className="h-6 w-6 group-hover:scale-110 transition-transform"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#0B4073]">
                  For Individuals
                </h3>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                We aspire that you don't just wake up to repeat yesterday, or
                live a life built around who others want you to be but instead
                live each day with a sense of momentum, clarity, and connection.
              </p>
            </div>

            {/* Organisation */}
            <div className="group bg-white p-10 md:p-12 rounded-3xl shadow-md border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#0B4073] text-white p-4 rounded-full text-2xl group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/favicon.ico"
                    alt="icon"
                    width={24}
                    height={24}
                    className="h-6 w-6 group-hover:scale-110 transition-transform"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#0B4073]">
                  For Organisations
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                We help navigate change in a human-centred way. Using
                psychology, we aim to build meaningful connection between people
                and technology, creating a relationship with AI and automation
                that feels collaborative, not imposed, and works for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Falling Upwards Section - Clean, Polished, and Consistent */}
      <section className="section bg-white relative overflow-hidden py-20">
        <div className="container-custom mx-auto relative z-10 px-2 sm:px-4 md:px-6">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#0B4073] mb-10 sm:mb-14 leading-tight break-words"
            style={{ wordBreak: "break-word" }}
          >
            Why Choose Falling Upwards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-8 sm:gap-y-10 items-start">
            {/* Left side - Image */}
            <div className="flex justify-center items-center mb-6 md:mb-0">
              <div className="rounded-3xl overflow-hidden w-full max-w-[320px] sm:max-w-[400px] h-[180px] sm:h-[250px] md:w-[500px] md:h-[500px] shadow-xl border border-gray-200 transition-shadow duration-500 hover:shadow-2xl">
                <Image
                  src="/images/HomePage/aerial-beach.webp"
                  alt="Aerial view of a beach"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-3xl"
                  priority={false}
                />
              </div>
            </div>

            {/* Right side - Accordion */}
            <div className="w-full max-w-full space-y-4 sm:space-y-6">
              <AccordionItem
                title="Psychology at the Core"
                isOpen={false}
                content={
                  <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-2">
                    <p>
                      We ground all our work in evidence-based psychological
                      principles, from therapy to team development, strategy to
                      AI. We have a deep commitment to understanding people,
                      behaviour, systems, and creating meaningful change.
                    </p>
                  </div>
                }
              />

              <AccordionItem
                title="Compassionate and People Centred"
                content={
                  <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-2">
                    <p>
                      We are unapologetically person-centred and compassionate.
                      We listen, build, challenge, and design. Whether working
                      with individuals or organisations, we hold space for
                      vulnerability, curiosity, and meaningful growth.
                    </p>
                  </div>
                }
              />

              <AccordionItem
                title="Different Thinking"
                content={
                  <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-2">
                    <p>
                      We see neurodiversity as a strategic and creative
                      advantage, not something to be "managed," but understood,
                      embraced, and leveraged. Our work helps individuals thrive
                      as they are, and helps organisations create strategic
                      advantage from Neurodiverse thinking.
                    </p>
                  </div>
                }
              />

              <AccordionItem
                title="Human Centred AI & Data Principles"
                content={
                  <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-2">
                    <p>
                      We develop AI and data efficiency from the ground up,
                      starting with people, not platforms. Using first
                      principles thinking and psychology we help solve problems
                      and support organisations think forwards in a simple and
                      understandable way.
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </div>
        <style jsx global>{`
          @media (max-width: 400px) {
            .section h2 {
              font-size: 1.5rem !important;
              margin-bottom: 1.5rem !important;
            }
            .section .text-base,
            .section .text-sm {
              font-size: 0.95rem !important;
            }
            .section .leading-relaxed {
              line-height: 1.5 !important;
            }
            .section .rounded-3xl {
              border-radius: 1rem !important;
            }
            .section .p-4,
            .section .p-6 {
              padding: 0.75rem !important;
            }
          }

          /* Custom resolution for 2049x992 */
          @media screen and (width: 2049px) and (height: 992px) {
            .container-custom {
              max-width: 1800px !important;
              padding-left: 2rem !important;
              padding-right: 2rem !important;
            }
            
            .hero-section {
              height: 80vh !important;
            }

            .hero-section h1 {
              font-size: 6rem !important;
            }

            .hero-section p {
              font-size: 1.5rem !important;
            }

            /* Adjust grid layouts */
            .grid {
              gap: 1.5rem !important;
            }

            /* Adjust card sizes */
            .rounded-xl {
              max-width: 400px !important;
            }

            /* Adjust logo sizes */
            .max-w-40 {
              max-width: 32px !important;
            }
          }
        `}</style>
      </section>
      {/* What we offer? Section - Improved UI & UX */}
      <section className="section bg-white relative overflow-hidden py-20 px-10 border-t border-b border-[#D6E2EA]/30">
        <div className="container-custom mx-auto relative z-10 px-6">
          {/* Section Title */}
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0B4073]">
              What we offer?
            </h2>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Digital Evolution and AI Adoption */}
            <div className="flex flex-col items-center bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <Link
                href="/our-services/digital-evolution"
                className="group w-full"
              >
                <div className="w-full aspect-square relative overflow-hidden">
                  <Image
                    src="/images/services/digital-evolution.webp"
                    alt="Digital evolution and AI adoption"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-center font-medium text-gray-800 text-lg">
                    Digital Evolution & AI Adoption
                  </h3>
                </div>
              </Link>
            </div>

            {/* Executive Mentoring & Boardroom Support */}
            <div className="flex flex-col items-center bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <Link
                href="/our-services/psychological-therapy"
                className="group w-full"
              >
                <div className="w-full aspect-square relative overflow-hidden">
                  <Image
                    src="/images/services/psychological-therapy.webp"
                    alt="Executive Mentoring & Boardroom Support"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-center font-medium text-gray-800 text-lg">
                    Psychological Therapy & ADHD Coaching
                  </h3>
                </div>
              </Link>
            </div>

            {/* Psychological Therapy */}
            <div className="flex flex-col items-center bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <Link
                href="/our-services/executive-mentoring"
                className="group w-full"
              >
                <div className="w-full aspect-square relative overflow-hidden">
                  <Image
                    src="/images/services/executive-mentoring.webp"
                    alt="Executive Mentoring & Boardroom Support"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-center font-medium text-gray-800 text-lg">
                    Executive Mentoring & Board Room Support
                  </h3>
                </div>
              </Link>
            </div>

            {/* neurodiversity */}
            <div className="flex flex-col items-center bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <Link
                href="/our-services/thinking-different"
                className="group w-full"
              >
                <div className="w-full aspect-square relative overflow-hidden">
                  <Image
                    src="/images/services/adhd-coaching.webp"
                    alt="neurodiversity"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-center font-medium text-gray-800 text-lg">
                    Different Thinking For Different Thinkers{" "}
                  </h3>
                </div>
              </Link>
            </div>
          </div>

          {/* See More Button */}
          {/* <div className="text-center mt-12">
            <Link
              href="/our-services"
              className="inline-flex items-center text-[#0B4073] bg-[#D6E2EA]/30 px-6 py-3 rounded-full hover:bg-[#D6E2EA]/50 transition-colors duration-300 font-medium"
            >
              <span>See More</span>
            </Link>
          </div> */}
        </div>
      </section>

      {/* Organizations We've Worked With */}
      <section className="section bg-[#F0F5F8] py-24 md:py-32">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-bold mb-6 text-[#0B4073]">
              Who we have worked with
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#0B4073] to-[#7094B7] mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 md:p-12 max-w-7xl mx-auto">
            <LogoSlider />
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
              { type: "digital", title: "Digital Evolution & AI Adoption" },
              {
                type: "executive",
                title: "Executive Mentoring & Boardroom Support",
              },
              {
                type: "psychological",
                title: "Psychological Therapy & ADHD Coaching",
              },
              {
                type: "neurodiversity",
                title: "Different Thinking For Different Thinkers",
              },
            ].map(({ type, title }) => (
              <Link key={type} href={`/book/${type}`} className="group w-full">
                <div className="bg-[#0B4073]/90 backdrop-blur-sm hover:bg-[#0B4073] text-white rounded-full py-3 md:py-5 px-5 md:px-8 flex items-center justify-between transition-all duration-300 w-full">
                  <span className="font-medium text-base md:text-lg">
                    {title}
                  </span>
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
