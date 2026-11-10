import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { calculateStackScale } from '../utils/motion';
import { ProjectData } from './ProjectModal';

export const PROJECTS_DATA: ProjectData[] = [
  {
    number: '01',
    category: 'Client',
    title: 'Nextlevel Studio',
    clientType: 'Commercial Studio',
    year: '2025',
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    },
  },
  {
    number: '02',
    category: 'Personal',
    title: 'Aura Brand Identity',
    clientType: 'Exploration Lab',
    year: '2025',
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    },
  },
  {
    number: '03',
    category: 'Client',
    title: 'Solaris Digital',
    clientType: 'FinTech Platform',
    year: '2026',
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    },
  },
];

interface CardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onOpenProject: (project: ProjectData) => void;
}

const ProjectCard: React.FC<CardProps> = ({
  project,
  index,
  totalCards,
  onOpenProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = calculateStackScale(totalCards, index, 0.03);
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] min-h-[600px] flex items-start justify-center sticky top-24 md:top-32"
      style={{
        top: `${80 + index * 28}px`,
      }}
    >
      <motion.article
        style={{
          scale,
        }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden flex flex-col justify-between"
      >
        {/* Top Row: Number, Category, Title, Live Project ghost button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#D7E2EA]/20">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
              className="font-black text-[#D7E2EA] leading-none select-none tracking-tighter"
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#BBCCD7] font-medium">
                {project.category}
              </span>
              <h3
                style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.4rem)' }}
                className="font-medium uppercase tracking-tight text-[#D7E2EA]"
              >
                {project.title}
              </h3>
            </div>
          </div>

          <LiveProjectButton onClick={() => onOpenProject(project)} />
        </div>

        {/* Bottom Row: Two-column image grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-3 sm:gap-4 pt-4 sm:pt-6 items-stretch">
          {/* Left Column (40% width): 2 stacked images */}
          <div className="md:col-span-4 flex flex-col gap-3 sm:gap-4">
            <div
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden border border-white/10 group cursor-pointer"
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.images.col1Top}
                alt={`${project.title} asset top`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden border border-white/10 group cursor-pointer"
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.images.col1Bottom}
                alt={`${project.title} asset bottom`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Column (60% width): 1 tall image */}
          <div className="md:col-span-6 flex">
            <div
              className="w-full min-h-[280px] h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden border border-white/10 group cursor-pointer"
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.images.col2}
                alt={`${project.title} primary hero visual`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

interface ProjectsSectionProps {
  onOpenProject: (project: ProjectData) => void;
  onContactClick: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenProject,
  onContactClick,
}) => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-4 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-32"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading: "Project" (singular) using .hero-heading gradient */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-20 md:mb-28">
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
          >
            Project
          </h2>
        </FadeIn>

        {/* Sticky-stacking project cards */}
        <div className="relative flex flex-col pb-20">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={PROJECTS_DATA.length}
              onOpenProject={onOpenProject}
            />
          ))}
        </div>

        {/* Bottom CTA & Footer */}
        <div id="contact" className="pt-24 text-center flex flex-col items-center">
          <FadeIn delay={0.1} y={30} className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#BBCCD7]">
              Ready to collaborate?
            </span>
            <h3
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              className="font-black uppercase tracking-tight text-white"
            >
              Let&apos;s Create Something Epic
            </h3>
            <p className="max-w-md mx-auto text-sm sm:text-base text-[#D7E2EA]/70 leading-relaxed pb-4">
              Open for freelance contracts, full 3D direction, character & environment visualization, and brand motion.
            </p>
            <div>
              <button
                type="button"
                onClick={onContactClick}
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  boxShadow:
                    '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                  outline: '2px solid white',
                  outlineOffset: '-3px',
                }}
                className="rounded-full px-10 py-4 text-sm sm:text-base text-white font-medium uppercase tracking-widest cursor-pointer hover:shadow-[0_0_30px_rgba(182,0,168,0.7)] transition-shadow"
              >
                Contact Me
              </button>
            </div>
          </FadeIn>

          <footer className="w-full mt-24 pt-8 border-t border-[#D7E2EA]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D7E2EA]/60 gap-4">
            <span>© {new Date().getFullYear()} Jack. All rights reserved.</span>
            <div className="flex gap-6 uppercase tracking-wider font-light">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <button onClick={onContactClick} className="hover:text-white transition-colors cursor-pointer">Contact</button>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};
