"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const offersRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
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
          icon: "🌐",
        },
        {
          name: "Executive Mentoring & Boardroom Support",
          href: "/our-services/executive-mentoring",
          icon: "👔",
        },
        {
          name: "Psychological Therapy & ADHD Coaching",
          href: "/our-services/psychological-therapy",
          icon: "🧠",
        },
        {
          name: "Neurodiversity as a strategic advantage",
          href: "/our-services/neurodiversity",
          icon: "🔍",
        },
      ],
    },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Determine if navbar should be visible on all pages
  const shouldShowNavbar = !isHeroVisible || isScrolled;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-6" : "bg-transparent py-10"
      } ${
        isHeroVisible && !isScrolled
          ? "absolute top-0"
          : shouldShowNavbar
          ? "fixed top-0"
          : "fixed -top-24"
      }`}
    >
      <div className="container-custom mx-auto flex justify-between items-center bg-transparent">
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          {isScrolled ? (
            <Image
              src="/images/logo.png"
              alt="Falling Upward Logo"
              width={60}
              height={60}
              className="h-60 w-auto sm:h-60 max-h-[70px] sm:max-h-[80px]"
            />
          ) : (
            <Image
              src="/images/logo.png"
              alt="Falling Upward Logo"
              width={80}
              height={80}
              className="h-50 w-auto sm:h-50 max-h-[70px] sm:max-h-[130px]"
            />
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
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
                ? "btn-primary bg-[#7094B7] hover:bg-[#0B4073] text-white"
                : "btn-outline border-white text-white hover:bg-white/10"
            } mr-4`}
          >
            Book a Consultation
          </Link>
          <Link
            href="/login"
            className={`${
              isScrolled
                ? "btn-primary bg-[#0B4073] hover:bg-[#083258] text-white"
                : "btn-outline border-white text-white hover:bg-white/10"
            }`}
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden focus:outline-none ${
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
          <div className="container-custom mx-auto py-4 flex flex-col space-y-4">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name} className="flex flex-col">
                  <div
                    className={`font-medium px-4 py-3 rounded-md transition-colors flex justify-between items-center ${
                      pathname.includes(link.href)
                        ? "text-[#0B4073] bg-[#D6E2EA]"
                        : "text-gray-700 hover:text-[#0B4073] hover:bg-gray-100"
                    }`}
                    onClick={() => setIsOffersOpen(!isOffersOpen)}
                  >
                    {link.name}
                    <FiChevronDown
                      className={`transition-transform duration-300 ${
                        isOffersOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {isOffersOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 mt-2 border-l-2 border-[#7094B7] pl-4 py-2">
                          <h3 className="text-xs font-semibold text-gray-500 px-4 pb-2">
                            Our Services
                          </h3>
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center px-4 py-3 text-gray-700 hover:text-[#0B4073] hover:bg-gray-50 rounded-md transition-colors"
                              onClick={closeMenu}
                            >
                              <span className="text-lg mr-3">{item.icon}</span>
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium px-4 py-2 rounded-md transition-colors ${
                    isActive(link.href)
                      ? "text-[#0B4073] bg-[#D6E2EA]"
                      : "text-gray-700 hover:text-[#0B4073] hover:bg-gray-100"
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              )
            )}

            <Link
              href="/book"
              className="btn-primary mx-4 bg-[#7094B7] hover:bg-[#0B4073] text-white"
              onClick={closeMenu}
            >
              Book a Consultation
            </Link>
            <Link
              href="/login"
              className="btn-primary mx-4 bg-[#0B4073] hover:bg-[#083258] text-white"
              onClick={closeMenu}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
