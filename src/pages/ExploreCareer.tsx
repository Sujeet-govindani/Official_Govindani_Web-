"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CareerForm from "@/pages/CareerForm"; // adjust import path as needed

// ─── Social Icons from Footer ────────────────────────────────────────────────
const IconFacebook = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>;
const IconLinkedin = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>;
const IconInsta = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
const IconYoutube = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z" /></svg>;

// ─── Main Page ────────────────────────────────────────────────────────────────
const ExploreCareer = () => {
  return (
    <div className="career-page min-h-screen bg-black text-white overflow-x-hidden">

      {/* ── Get in Touch + Apply Form ─────────────────────────────────────── */}
      <section
        id="apply"
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 relative overflow-hidden scroll-mt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-[#d4af37] via-[#f4e5b8] to-[#d4af37] bg-clip-text text-transparent px-2 heading-font"
            style={{ WebkitBoxDecorationBreak: "clone" }}
          >
            Get in touch
          </motion.h1>

          {/* ── TWO-COLUMN: Form  |  Social + Follow ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {/* LEFT Career Application Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <CareerForm />
            </motion.div>

            {/* RIGHT Follow Us + Social icons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 sm:gap-8"
            >
              {/* Follow card */}
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#c9a961] flex items-center justify-center mb-4 sm:mb-6">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 heading-font">
                  Follow Us
                </h3>
                <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 body-font">
                  Stay connected and follow us on social media for the latest
                  updates.
                </p>

                <div className="flex gap-3 sm:gap-4 flex-wrap">
                  {[
                    { icon: <IconLinkedin />, href: "https://www.linkedin.com/company/govindani-infotech/?viewAsMember=true" },
                    { icon: <IconInsta />, href: "https://www.instagram.com/govindani_infotech_pvt_ltd/" },
                    { icon: <IconFacebook />, href: "https://www.facebook.com/people/Govindani-Infotech/100089453446845/" },
                    { icon: <IconYoutube />, href: "https://www.youtube.com/channel/UCMPVJv_auCr-TAQiPFX1KZg" },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Info card why apply */}
              <div className="bg-white/[0.02] border border-[#d4af37]/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
                <h4 className="text-lg font-bold text-[#d4af37] mb-4 tracking-wide uppercase text-xs heading-font">
                  Why join us?
                </h4>
                <ul className="space-y-3">
                  {[
                    "Competitive salary & performance bonuses",
                    "Flexible & hybrid work culture",
                    "Fast-track career growth",
                    "Mentorship from industry experts",
                    "Health benefits & paid leave",
                  ].map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-sm text-gray-300 body-font"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-[#d4af37]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`

        :root {
          --gold-bright:  #d4af37;
          --white:        #ffffff;
          --border-gold:  rgba(212,175,55,0.18);
        }

        /* Social icon ring */
        .social-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 50%;
          border: 1px solid var(--border-gold);
          color: #0a0a0a;
          background: linear-gradient(135deg, #d4af37 0%, #ffffff 100%);
          transition: border-color 0.25s, color 0.25s, transform 0.25s;
          text-decoration: none; font-size: 0.8rem;
        }
        .social-btn:hover {
          border-color: var(--white);
          color: #0a0a0a;
          background: linear-gradient(135deg, #ffffff 0%, #d4af37 100%);
          transform: translateY(-2px);
        }

        .career-page * { padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #000;
          color: #fff;
        }

::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #d4af37, #c9a961);
          border-radius: 5px;
        }

        /* Baskerville for all headings */
        .heading-font {
          font-family: 'Libre Baskerville', 'Baskerville', 'Times New Roman', Georgia, serif !important;
        }

        /* Inter for body content */
        .body-font {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        }

        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          padding: 0.1em 0;
          display: inline-block;
        }

        h1, h2, h3, h4 {
          font-family: 'Libre Baskerville', 'Baskerville', 'Times New Roman', Georgia, serif;
          overflow: visible;
        }

        p, li, a, span, button, input, textarea, select, label {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
          .career-page section:first-of-type {
    margin-top: var(--header-offset) !important;
    padding-top: 0 !important;
}
      `}</style>
    </div>
  );
};

export default ExploreCareer;