import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Legacy', href: '#legacy' },
    { name: 'Gallery', href: '#' },
    { name: 'Our Team', href: '#team' },
    { name: 'Departments', href: '#departments' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Smooth animation over 400px of scrolling
      const progress = Math.min(scrollTop / 400, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Easing function for smoother animation
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const easedProgress = easeInOutCubic(scrollProgress);
  const isScrolled = scrollProgress > 0.5;

  // Calculate dynamic styles based on eased scroll progress
  const headerPadding = 6 - (easedProgress * 3); // 6 to 3
  const bgOpacity = easedProgress * 0.8; // 0 to 0.8
  const logoOpacity = 1 - easedProgress; // 1 to 0
  const logoScale = 1 - (easedProgress * 0.05); // 1 to 0.95
  const innerLogoOpacity = easedProgress; // 0 to 1
  const innerLogoScale = 0.95 + (easedProgress * 0.05); // 0.95 to 1

  return (
    <header 
      className="px-6 lg:px-8 fixed top-0 left-0 right-0 z-50"
      style={{
        paddingTop: `${headerPadding * 0.25}rem`,
        paddingBottom: `${headerPadding * 0.25}rem`,
        backgroundColor: `rgba(15, 23, 42, ${bgOpacity})`,
        backdropFilter: scrollProgress > 0.1 ? 'blur(12px)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo - Always present, just hidden when scrolled */}
        <div 
          className="text-2xl font-bold text-white tracking-wide overflow-hidden"
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            width: logoOpacity > 0.1 ? 'auto' : '0',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          TECHNOVATION
        </div>

        {/* Desktop Navigation */}
        <div 
          className="hidden md:flex items-center"
          style={{
            width: easedProgress > 0.3 ? '100%' : 'auto',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div 
            className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-lg px-8 py-3 lg:px-12 lg:py-3 shadow-lg shadow-black/10 flex items-center"
            style={{
              width: easedProgress > 0.3 ? '100%' : 'auto',
              justifyContent: easedProgress > 0.3 ? 'space-between' : 'center',
              borderRadius: easedProgress > 0.3 ? '0.75rem' : '0.5rem',
              backgroundColor: `rgba(255, 255, 255, ${0.15 + easedProgress * 0.05})`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Logo inside box when scrolled */}
            <div 
              className="text-xl lg:text-2xl font-bold text-white tracking-wide overflow-hidden"
              style={{
                opacity: innerLogoOpacity,
                transform: `scale(${innerLogoScale})`,
                width: innerLogoOpacity > 0.1 ? 'auto' : '0',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              TECHNOVATION
            </div>
            
            <div 
              className="flex items-center"
              style={{
                gap: easedProgress > 0.3 ? '2rem' : '3rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-orange-400 hover:scale-110 transition-all duration-300 ease-out font-medium relative group py-1 text-sm lg:text-base whitespace-nowrap hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 ease-out group-hover:w-full shadow-[0_0_8px_rgba(251,146,60,0.8)]"></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-orange-400 hover:scale-110 transition-all duration-300 ease-out p-2 hover:rotate-90"
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 animate-in slide-in-from-top duration-300">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white hover:text-orange-400 hover:translate-x-2 transition-all duration-300 ease-out font-medium py-2 relative group"
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out origin-top"></span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

