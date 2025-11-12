
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const useLenis = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const lenis = new Lenis({
        wrapper: ref.current,
        duration: 1.8,
        easing: (t) => 1 - Math.pow(1 - t, 5), // easeOutQuint
        smoothTouch: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    
    return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
    }
  }, [ref]);
};

export default useLenis;