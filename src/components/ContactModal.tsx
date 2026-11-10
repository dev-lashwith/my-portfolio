import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Mail, ExternalLink } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '3D Modeling',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after success or keep open
    }, 2000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', service: '3D Modeling', message: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl border border-[#D7E2EA]/20 bg-[#121214] p-6 sm:p-8 text-[#D7E2EA] shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-5 top-5 p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                  Message Sent!
                </h3>
                <p className="text-sm text-[#D7E2EA]/70 max-w-xs mx-auto">
                  Thank you for reaching out, {formData.name}. Jack will review your project details and get back within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="rounded-full px-6 py-2.5 border border-[#D7E2EA]/40 text-xs uppercase tracking-widest font-medium hover:bg-white/10 transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
                    Get In Touch
                  </span>
                  <h3
                    id="contact-modal-title"
                    className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1"
                  >
                    Start a 3D Project
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/70 mt-1">
                    Have an upcoming game, brand visual, or motion design concept? Let's bring it to life.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/80 mb-1 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Morgan"
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/80 mb-1 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/80 mb-1 font-medium">
                      Service Needed
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-xl bg-[#1d1d21] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#B600A8]"
                    >
                      <option value="3D Modeling">01 - 3D Modeling</option>
                      <option value="Rendering">02 - High-End Rendering</option>
                      <option value="Motion Design">03 - Motion Design</option>
                      <option value="Branding">04 - 3D Branding & Identity</option>
                      <option value="Web Design">05 - 3D Interactive Web Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/80 mb-1 font-medium">
                      Project Details
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell Jack about timeline, references, deliverables..."
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background:
                        'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow:
                        '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                    }}
                    className="w-full rounded-xl py-3 text-sm font-medium uppercase tracking-widest text-white flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" /> Send Request
                  </button>
                </form>

                {/* Direct info footer */}
                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#D7E2EA]/60">
                  <a
                    href="mailto:jack@creator3d.studio"
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" /> jack@creator3d.studio
                  </a>
                  <div className="flex gap-3">
                    <span className="hover:text-white cursor-pointer transition-colors">ArtStation</span>
                    <span className="hover:text-white cursor-pointer transition-colors">X / Twitter</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
