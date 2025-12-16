import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Legacy', href: '#legacy' },
    { name: 'Gallery', href: '#' },
    { name: 'Our Team', href: '#team' },
    { name: 'Departments', href: '#departments' }
  ];

  // Constants
  const maxScroll = 500; // Slower scroll mapping

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const progress = Math.min(scrollTop / maxScroll, 1);
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const interpolate = (start, end, progress) => {
    return start + (end - start) * progress;
  };

  return (
    <header className={`px-6 lg:px-8 py-6 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'bg-transparent py-6'
      }`}>
      <nav className={`relative flex items-center justify-between max-w-7xl mx-auto transition-all duration-500 ${isScrolled ? 'px-8 py-3' : 'px-12 py-4'
        }`}>
        {/* Glass Background Layer - Absolute Positioned */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-0 h-3/4 bg-white/15 backdrop-blur-lg border border-white/30 shadow-lg shadow-black/10 transition-none ease-in-out"
          style={{
            // Interpolate width from 550px to 100% + 4rem (approx 100% + 64px to cover padding)
            // Using calc to mix units: `calc(550px + (100% + 64px - 550px) * progress)` is hard.
            // Simplification: We need strictly width. Let's assume container is relative.
            // Unscrolled: 550px. Scrolled: "110%" effectively or just enough to look "full".
            // Actually, `right-0` is anchored. Width growing will grow to the left.
            // Let's rely on pixel width + percentage mix if possible, or just strict pixels?
            // Relative percentage is safer for responsiveness.
            // Start: ~40% (guess for 550px on desktop) or just fixed 550px.
            // End: 108% (to cover padding).
            // Let's use string interpolation for width.
            width: scrollProgress === 0 ? '675px' : `calc(675px + (100% + 4rem - 675px) * ${scrollProgress})`,
            borderRadius: `${interpolate(8, 12, scrollProgress)}px`,
            right: `${interpolate(48, -32, scrollProgress)}px` // Move right anchor to match padding (48px) initially, then expand to -32px
          }}
        ></div>

        {/* Logo - Static and on top */}
        <div className="relative z-10 text-2xl font-bold text-white tracking-wide transition-all duration-300">
          TECHNOVATION
        </div>

        {/* Desktop Navigation - Static and on top */}
        <div className="hidden md:flex relative z-20 items-center w-[675px] justify-center">
          <div className="flex items-center w-full justify-between px-12 py-3 lg:px-16 lg:py-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-gray transition-colors duration-200 font-medium relative group py-1 text-sm lg:text-base whitespace-nowrap"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-gray-300 transition-colors duration-200 p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700">
          <div className="px-5 py-5 space-y-5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white hover:text-gray-300 transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
