import React, { useEffect, useRef, useState } from 'react';
import { calculateScrollOffset } from '../utils/motion';

const ROW1_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
];

const ROW2_IMAGES = [
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

// Tripled lists for seamless horizontal infinite illusion
const ROW1_TRIPLED = [...ROW1_IMAGES, ...ROW1_IMAGES, ...ROW1_IMAGES];
const ROW2_TRIPLED = [...ROW2_IMAGES, ...ROW2_IMAGES, ...ROW2_IMAGES];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const offset = calculateScrollOffset(
        window.scrollY,
        sectionTop,
        window.innerHeight,
        0.3
      );
      setScrollOffset(offset);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  // Base shift puts the visible window into the middle set of tripled items (11 * 432px = 4752px)
  // Row 1 moves RIGHT on scroll: translateX(offset - 200)
  // Row 2 moves LEFT on scroll: translateX(-(offset - 200))
  const delta = scrollOffset - 200;
  const row1Transform = `translate3d(${-3200 + delta}px, 0, 0)`;
  const row2Transform = `translate3d(${-2200 - delta}px, 0, 0)`;

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none"
      aria-label="3D and Motion Highlights Marquee"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          className="flex gap-3"
          style={{
            transform: row1Transform,
            willChange: 'transform',
            transition: 'transform 0.1s cubic-bezier(0, 0, 0.2, 1)',
          }}
        >
          {ROW1_TRIPLED.map((src, i) => (
            <div
              key={`r1-${i}`}
              className="w-[420px] h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#18181b] shadow-lg border border-white/5"
            >
              <img
                src={src}
                alt={`Motion showcase ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover pointer-events-none select-none hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          className="flex gap-3"
          style={{
            transform: row2Transform,
            willChange: 'transform',
            transition: 'transform 0.1s cubic-bezier(0, 0, 0.2, 1)',
          }}
        >
          {ROW2_TRIPLED.map((src, i) => (
            <div
              key={`r2-${i}`}
              className="w-[420px] h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#18181b] shadow-lg border border-white/5"
            >
              <img
                src={src}
                alt={`Motion project showcase ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover pointer-events-none select-none hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
