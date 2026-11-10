import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Layers, Box } from 'lucide-react';

export interface ProjectData {
  number: string;
  category: string;
  title: string;
  images: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
  clientType: string;
  year?: string;
  deliverables?: string[];
  description?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onContactClick,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#D7E2EA]/30 bg-[#0E0F12] p-5 sm:p-8 text-[#D7E2EA] shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/10 pb-5 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-black text-[#BBCCD7]">
                  {project.number}
                </span>
                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-white/80">
                  {project.category}
                </span>
              </div>
              <h2
                id="project-modal-title"
                className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1"
              >
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close project view"
              className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="overflow-hidden rounded-2xl border border-white/10 group">
                <img
                  src={project.images.col1Top}
                  alt={`${project.title} render 1`}
                  className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 group">
                <img
                  src={project.images.col1Bottom}
                  alt={`${project.title} render 2`}
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-white/10 h-full min-h-[300px] group">
                <img
                  src={project.images.col2}
                  alt={`${project.title} hero showcase`}
                  className="w-full h-full min-h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Details & Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 mb-6 text-sm">
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#BBCCD7] mb-1 font-semibold">
                <Box className="w-4 h-4 text-[#B600A8]" /> Tools & Stack
              </div>
              <p className="text-white font-medium">Cinema 4D, Octane Render, Blender, Unreal Engine 5</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#BBCCD7] mb-1 font-semibold">
                <Layers className="w-4 h-4 text-[#7621B0]" /> Scope
              </div>
              <p className="text-white font-medium">Art Direction, 3D Assets, Lighting & Shaders, Motion</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#BBCCD7] mb-1 font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Resolution
              </div>
              <p className="text-white font-medium">4K Master Delivery, Real-time Optimized Meshes</p>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-xs text-white/60">
              Commissioned as a high-fidelity visual asset suite for brand launch.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  onClose();
                  onContactClick();
                }}
                className="rounded-full px-6 py-2.5 bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white text-xs uppercase font-medium tracking-widest hover:opacity-90 transition-opacity"
              >
                Inquire Similar Project
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
