"use client";

// Smooth scroll to an element with offset for fixed header
export const smoothScrollTo = (id: string, offset = 100) => {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = offset;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

// Check if element is in viewport
export const isInViewport = (element: HTMLElement, offset = 0) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top + offset >= 0 &&
    rect.left >= 0 &&
    rect.bottom - offset <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Throttle function for scroll events
export const throttle = <F extends (...args: unknown[]) => unknown>(
  func: F,
  limit: number
): ((...args: Parameters<F>) => void) => {
  let inThrottle = false;
  return function (this: unknown, ...args: Parameters<F>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Debounce function for scroll events
export const debounce = <F extends (...args: unknown[]) => unknown>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeout: NodeJS.Timeout;
  return function (this: unknown, ...args: Parameters<F>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Add smooth scrolling to all anchor links
export const initSmoothScrolling = () => {
  if (typeof window === 'undefined') return;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        smoothScrollTo(targetId.substring(1));
      }
    });
  });
};

// Initialize scroll-based animations
export const initScrollAnimations = () => {
  if (typeof window === 'undefined') return;

  const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(element => {
      if (isInViewport(element as HTMLElement, 50)) {
        element.classList.add('animate-in');
      }
    });
  };

  // Initial check
  animateOnScroll();
  
  // Throttled scroll event
  const throttledScroll = throttle(animateOnScroll, 100);
  window.addEventListener('scroll', throttledScroll, { passive: true });
  
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', throttledScroll);
  };
};
