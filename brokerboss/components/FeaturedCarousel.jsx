'use client';

import { useRef, useState, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export default function FeaturedCarousel({ children }) {
  const scrollRef = useRef(null);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    // Check if we need to show controls (i.e., if content is scrollable)
    const checkScrollable = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        setShowControls(scrollWidth > clientWidth);
      }
    };
    
    // Slight delay to allow images/fonts to load and affect layout
    const timer = setTimeout(checkScrollable, 100);
    window.addEventListener('resize', checkScrollable);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScrollable);
    };
  }, [children]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
      >
        {children}
      </div>

      {/* Navigation Buttons (Desktop/Tablet only) */}
      {showControls && (
        <>
          <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-border rounded-full shadow-lg items-center justify-center text-primary z-10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 focus:outline-none"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="w-4 h-4 pr-0.5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-border rounded-full shadow-lg items-center justify-center text-primary z-10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 focus:outline-none"
            aria-label="Scroll right"
          >
            <FaChevronRight className="w-4 h-4 pl-0.5" />
          </button>
        </>
      )}
    </div>
  );
}
