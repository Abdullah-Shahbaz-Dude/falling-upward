"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const offersRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      // Get the hero section height based on the page
      // For home page, use full viewport height. For other pages, use a smaller height
      const isHomePage = pathname === "/";
      const heroHeight = isHomePage
        ? window.innerHeight
        : window.innerHeight * 0.75; // 75vh for other pages

      // For all pages, determine if we're in the hero section
      if (window.scrollY > heroHeight - 100) {
        setIsHeroVisible(false);
        setIsScrolled(true);
      } else {
        setIsHeroVisible(true);
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        offersRef.current &&
        !offersRef.current.contains(event.target as Node)
      ) {
        setIsOffersOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Meet Our Team", href: "/meet-our-team" },
    {
      name: "Our Services",
      href: "/our-services",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Digital evolution and AI adoption",
          href: "/our-services/digital-evolution",

        },
        {
          name: "Executive Mentoring & Boardroom Support",
          href: "/our-services/executive-mentoring",
          
        },
        {
          name: "Psychological Therapy & ADHD Coaching",
          href: "/our-services/psychological-therapy",
          
        },
        {
          name: "Different Thinking For Different Thinkers",
          href: "/our-services/thinking-different",
         
        },
      ],
    },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Determine if navbar should be visible on all pages
  const shouldShowNavbar = !isHeroVisible || isScrolled;

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3 md:py-4 lg:py-6" : "bg-transparent py-4 md:py-6 lg:py-8"
      } ${
        isHeroVisible && !isScrolled
          ? "absolute top-0"
          : shouldShowNavbar
          ? "fixed top-0"
          : "fixed -top-24"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start">
          <div className="flex items-start pl-0 ml-0">
            <Link href="/" className="flex items-start p-0" onClick={closeMenu}>
              {isScrolled ? (
                <Image
                  src="/images/logo.png"
                  alt="Falling Upward Logo"
                  width={100}
                  height={100}
                  className="h-[50px] w-auto xs:h-[55px] sm:h-[60px] md:h-[70px] lg:h-[80px] navbar-logo-img"
                  priority
                />
              ) : (
                <Image
                  src="/images/logo.png"
                  alt="Falling Upward Logo"
                  width={130}
                  height={130}
                  className="h-[60px] w-auto xs:h-[70px] sm:h-[80px] md:h-[90px] lg:h-[100px] navbar-logo-img"
                  priority
                />
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center mt-3 space-x-4 lg:space-x-8 navbar-nav">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.name}
                  className="relative"
                  ref={offersRef}
                  onMouseEnter={() => setIsOffersOpen(true)}
                  onMouseLeave={() => setIsOffersOpen(false)}
                >
                  <div
                    className={`flex items-center cursor-pointer font-medium transition-colors ${
                      isActive(link.href) || pathname.includes(link.href)
                        ? isScrolled
                          ? "text-[#0B4073] border-b-2 border-[#7094B7]"
                          : "text-[#D6E2EA] border-b-2 border-[#D6E2EA]"
                        : isScrolled
                        ? "text-gray-700 hover:text-[#0B4073]"
                        : "text-white hover:text-[#D6E2EA]"
                    }`}
                  >
                    {link.name}
                    <FiChevronDown
                      className={`ml-1 transition-transform duration-300 ${
                        isOffersOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {isOffersOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl py-3 z-50 overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#0B4073] to-[#7094B7]"></div>

                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="group flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsOffersOpen(false)}
                          >
                            <div>
                              <span className="font-medium group-hover:text-[#0B4073] transition-colors">
                                {item.name}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    isActive(link.href)
                      ? isScrolled
                        ? "text-[#0B4073] border-b-2 border-[#7094B7]"
                        : "text-[#D6E2EA] border-b-2 border-[#D6E2EA]"
                      : isScrolled
                      ? "text-gray-700 hover:text-[#0B4073]"
                      : "text-white hover:text-[#D6E2EA]"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}

            <Link
              href="/book"
              className={`${
                isScrolled
                  ? "bg-[#7094B7] hover:bg-[#0B4073] text-white"
                  : "border border-white text-white hover:bg-white/10"
              } py-2 px-4 rounded-md transition-colors mr-4 font-medium`}
            >
              Book a Consultation
            </Link>
            <Link
              href="/login"
              className={`${
                isScrolled
                  ? "bg-[#0B4073] hover:bg-[#083258] text-white"
                  : "border border-white text-white hover:bg-white/10"
              } py-2 px-4 rounded-md transition-colors font-medium`}
            >
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden focus:outline-none flex items-center h-full mt-2 ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl md:hidden z-50 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-3 space-y-3">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.name} className="flex flex-col pl-0">
                    <button
                      onClick={() => setIsOffersOpen(!isOffersOpen)}
                      className="flex items-center justify-between text-left font-medium text-gray-800 hover:text-[#0B4073] transition-colors py-2"
                    >
                      {link.name}
                      <FiChevronDown
                        className={`ml-1 transition-transform duration-300 ${
                          isOffersOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOffersOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-0 mb-2 flex flex-col space-y-2 overflow-hidden"
                        >
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="text-gray-600 hover:text-[#0B4073] transition-colors py-2 pl-4 border-l-2 border-gray-200"
                              onClick={closeMenu}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-medium text-gray-800 hover:text-[#0B4073] transition-colors py-2"
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                )
              )}

              <div className="pt-2 space-y-3">
                <Link
                  href="/book"
                  className="block w-full bg-[#7094B7] hover:bg-[#0B4073] text-white py-3 px-4 rounded-md transition-colors font-medium text-center"
                  onClick={closeMenu}
                >
                  Book a Consultation
                </Link>
                <Link
                  href="/login"
                  className="block w-full bg-[#0B4073] hover:bg-[#083258] text-white py-3 px-4 rounded-md transition-colors font-medium text-center"
                  onClick={closeMenu}
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        @media screen and (width: 2049px) and (height: 1152px) {
          .navbar-logo-img {
            width: 150px !important;
            height: 150px !important;
            max-width: none !important;
            max-height: none !important;
          }
          .navbar-nav {
            margin-top: 10px !important;
          }
        }
        @media screen and (width: 1080px) {
          .navbar-logo-img {
            width: 120px !important;
            height: 120px !important;
            max-width: none !important;
            max-height: none !important;
          }
        }
      `}</style>
    </header>
  );
}
