"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Role {
  id: number;
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  icon: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const roles: Role[] = [
  {
    id: 1,
    title: "Python Developer",
    department: "Engineering",
    type: "Full-Time",
    location: "Hybrid · Pune",
    experience: "1–3 Years",
    skills: ["Python", "Django", "REST APIs", "PostgreSQL", "Docker"],
    description:
      "Build scalable backend systems and automation tools that power our digital products.",
    responsibilities: [
      "Design and maintain robust Python-based backend services",
      "Build and integrate RESTful APIs",
      "Collaborate with frontend teams on data contracts",
      "Write clean, testable, well-documented code",
      "Participate in code reviews and agile sprints",
    ],
    icon: "🐍",
  },
  {
    id: 2,
    title: "Java Developer",
    department: "Engineering",
    type: "Full-Time",
    location: "Hybrid · Pune",
    experience: "2–4 Years",
    skills: ["Java", "Spring Boot", "Microservices", "MySQL", "AWS"],
    description:
      "Architect and deliver enterprise-grade Java applications with a focus on performance and scalability.",
    responsibilities: [
      "Develop microservices using Spring Boot",
      "Design database schemas and optimize queries",
      "Implement security best practices",
      "Mentor junior developers",
      "Contribute to system architecture decisions",
    ],
    icon: "☕",
  },
  {
    id: 3,
    title: "Frontend Developer",
    department: "Engineering",
    type: "Full-Time",
    location: "Hybrid · Pune",
    experience: "1–3 Years",
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Figma"],
    description:
      "Craft pixel-perfect, highly interactive user interfaces that delight our clients and their customers.",
    responsibilities: [
      "Build reusable React component libraries",
      "Implement responsive, accessible UI designs",
      "Optimize performance and Core Web Vitals",
      "Collaborate closely with UI/UX designers",
      "Integrate frontend with backend APIs",
    ],
    icon: "🎨",
  },
  {
    id: 4,
    title: "Backend Developer",
    department: "Engineering",
    type: "Full-Time",
    location: "Hybrid · Pune",
    experience: "2–4 Years",
    skills: ["Node.js", "Express", "MongoDB", "Redis", "GraphQL"],
    description:
      "Power our platforms with robust server-side logic, APIs, and data pipelines.",
    responsibilities: [
      "Build and maintain server-side applications",
      "Design scalable database architectures",
      "Develop and document REST/GraphQL APIs",
      "Ensure application security and data integrity",
      "Monitor and optimize server performance",
    ],
    icon: "⚙️",
  },
  {
    id: 5,
    title: "WordPress Developer",
    department: "Web",
    type: "Full-Time",
    location: "On-site · Pune",
    experience: "1–3 Years",
    skills: ["WordPress", "PHP", "WooCommerce", "Elementor", "ACF"],
    description:
      "Create high-performance WordPress websites and custom plugins for clients across industries.",
    responsibilities: [
      "Build custom WordPress themes and plugins",
      "Set up and manage WooCommerce stores",
      "Optimise page speed and SEO",
      "Maintain and update existing WordPress sites",
      "Collaborate with designers on layout implementation",
    ],
    icon: "🔷",
  },
  {
    id: 6,
    title: "Shopify Developer",
    department: "Web",
    type: "Full-Time",
    location: "Hybrid · Pune",
    experience: "1–3 Years",
    skills: ["Shopify", "Liquid", "JavaScript", "Shopify APIs", "CSS"],
    description:
      "Build and customise Shopify storefronts that convert visitors into loyal customers.",
    responsibilities: [
      "Develop custom Shopify themes using Liquid",
      "Build and integrate Shopify apps",
      "Implement conversion-optimised product pages",
      "Set up payment gateways and checkout flows",
      "Troubleshoot and resolve storefront issues",
    ],
    icon: "🛍️",
  },
  {
    id: 7,
    title: "Full Stack Developer",
    department: "Engineering",
    type: "Full-Time",
    location: "Hybrid · Pune",
    experience: "2–5 Years",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    description:
      "Own products end-to-end from database design to pixel-perfect UI across our entire tech stack.",
    responsibilities: [
      "Develop full-stack features independently",
      "Design system architecture for new products",
      "Lead technical discussions with clients",
      "Write end-to-end automated tests",
      "Mentor and support junior team members",
    ],
    icon: "🚀",
  },
  {
    id: 8,
    title: "Social Media Manager",
    department: "Marketing",
    type: "Full-Time",
    location: "On-site · Pune",
    experience: "1–3 Years",
    skills: ["Content Strategy", "Meta Ads", "Canva", "Analytics", "Copywriting"],
    description:
      "Drive brand growth and community engagement across all social media platforms for our clients.",
    responsibilities: [
      "Plan and execute monthly content calendars",
      "Create and schedule engaging posts across platforms",
      "Run and optimize paid social campaigns",
      "Analyse performance metrics and prepare reports",
      "Stay ahead of platform algorithm changes",
    ],
    icon: "📱",
  },
];

const departments = ["All", "Engineering", "Web", "Marketing"];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Role Card ────────────────────────────────────────────────────────────────
const RoleCard = ({
  role,
  index,
  onOpen,
}: {
  role: Role;
  index: number;
  onOpen: (role: Role) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(role)}
      className="relative cursor-pointer group"
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(0,0,0,0) 100%)"
          : "rgba(255,255,255,0.015)",
        border: hovered
          ? "1px solid rgba(212,175,55,0.45)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "28px 28px 24px",
        transition: "all 0.35s ease",
        boxShadow: hovered ? "0 0 32px rgba(212,175,55,0.10)" : "none",
      }}
    >
      {/* Glow line on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-6 right-6 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{
              background: "rgba(212,175,55,0.10)",
              border: "1px solid rgba(212,175,55,0.25)",
            }}
          >
            {role.icon}
          </div>
          <div>
            <h3
              className="text-white font-semibold leading-tight"
              style={{
                fontFamily: "'Libre Baskerville', 'Baskerville', Georgia, serif",
                fontSize: "18px",
                background: hovered ? "linear-gradient(90deg, #f4e5b8, #d4af37)" : "none",
                WebkitBackgroundClip: hovered ? "text" : "unset",
                WebkitTextFillColor: hovered ? "transparent" : "white",
                transition: "all 0.3s ease",
              }}
            >
              {role.title}
            </h3>
            <p
              className="text-xs mt-0.5"
              style={{ color: "rgba(212,175,55,0.7)", fontFamily: "'Inter', sans-serif" }}
            >
              {role.department}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.25 }}
          className="text-[#d4af37] text-lg flex-shrink-0"
        >
          →
        </motion.div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
        {[role.type, role.location, role.experience].map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.18)",
              color: "rgba(245,240,232,0.65)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-5"
        style={{ color: "rgba(245,240,232,0.5)", fontFamily: "'Inter', sans-serif" }}
      >
        {role.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {role.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2.5 py-1 rounded-md"
            style={{
              background: "rgba(212,175,55,0.06)",
              color: "#d4af37",
              fontFamily: "'Inter', sans-serif",
              border: "1px solid rgba(212,175,55,0.15)",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Role Detail Modal ─────────────────────────────────────────────────────────
const RoleModal = ({
  role,
  onClose,
  onApply,
}: {
  role: Role;
  onClose: () => void;
  onApply: () => void;
}) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 99999,
        isolation: "isolate",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl"
        style={{
          marginTop: "60px",
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
          background: "linear-gradient(160deg, #111 0%, #0d0d0d 60%, #0a0a0a 100%)",
          border: "1px solid rgba(212,175,55,0.28)",
          boxShadow:
            "0 0 0 1px rgba(212,175,55,0.06), 0 8px 32px rgba(0,0,0,0.7), 0 0 80px rgba(212,175,55,0.10)",
        }}
      >
        {/* Decorative top glow line */}
        <div
          className="absolute top-0 left-10 right-10 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
          }}
        />

        {/* Subtle corner accent */}
        <div
          className="absolute top-0 right-0 w-32 h-32 pointer-events-none rounded-tr-3xl overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="p-8 sm:p-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "rgba(245,240,232,0.55)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              cursor: "pointer",
              zIndex: 10,
            }}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Icon + Title */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background: "rgba(212,175,55,0.10)",
                border: "1px solid rgba(212,175,55,0.30)",
              }}
            >
              {role.icon}
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "'Libre Baskerville', 'Baskerville', Georgia, serif",
                  fontSize: "22px",
                  background: "linear-gradient(90deg, #f4e5b8, #d4af37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {role.title}
              </h2>
              <p
                className="text-sm mt-1"
                style={{
                  color: "rgba(212,175,55,0.65)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {role.department} · {role.type}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="mb-6"
            style={{ height: "1px", background: "rgba(212,175,55,0.10)" }}
          />

          {/* Meta tags */}
          <div
            className="flex flex-wrap gap-2 mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {[role.type, role.location, role.experience].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.20)",
                  color: "rgba(245,240,232,0.70)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p
            className="text-base leading-relaxed mb-7"
            style={{
              color: "rgba(245,240,232,0.62)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {role.description}
          </p>

          {/* Responsibilities */}
          <div className="mb-7">
            <h4
              className="mb-4 flex items-center gap-2"
              style={{
                fontFamily: "'Libre Baskerville', 'Baskerville', Georgia, serif",
                fontSize: "17px",
                color: "#d4af37",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "2px",
                  background: "#d4af37",
                  borderRadius: "2px",
                }}
              />
              Key Responsibilities
            </h4>
            <ul className="space-y-3">
              {role.responsibilities.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm"
                  style={{
                    color: "rgba(245,240,232,0.60)",
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(212,175,55,0.12)",
                      border: "1px solid rgba(212,175,55,0.30)",
                      color: "#d4af37",
                      fontSize: "10px",
                    }}
                  >
                    ✓
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h4
              className="mb-4 flex items-center gap-2"
              style={{
                fontFamily: "'Libre Baskerville', 'Baskerville', Georgia, serif",
                fontSize: "17px",
                color: "#d4af37",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "2px",
                  background: "#d4af37",
                  borderRadius: "2px",
                }}
              />
              Skills Required
            </h4>
            <div className="flex flex-wrap gap-2">
              {role.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm px-3 py-1.5 rounded-lg"
                  style={{
                    background: "rgba(212,175,55,0.08)",
                    color: "#d4af37",
                    fontFamily: "'Inter', sans-serif",
                    border: "1px solid rgba(212,175,55,0.22)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            className="mb-7"
            style={{ height: "1px", background: "rgba(212,175,55,0.10)" }}
          />

          {/* Apply CTA */}
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 40px rgba(212,175,55,0.40)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onApply}
            className="w-full py-4 rounded-2xl font-semibold text-base relative overflow-hidden"
            style={{
              background: "linear-gradient(90deg, #d4af37 0%, #e8c84a 50%, #c9a961 100%)",
              color: "#000",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.02em",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 24px rgba(212,175,55,0.28)",
            }}
          >
            Apply for this Role →
          </motion.button>

          {/* Fine print */}
          <p
            className="text-center mt-4 text-xs"
            style={{
              color: "rgba(245,240,232,0.28)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Takes less than 5 minutes · No account required
          </p>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────
const TechRoles = () => {
  const navigate = useNavigate();
  const [activeDept, setActiveDept] = useState("All");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const filtered =
    activeDept === "All"
      ? roles
      : roles.filter((r) => r.department === activeDept);

  const handleApply = () => {
    setSelectedRole(null);
    navigate("/explore-career");
  };

  return (
    <div
      className="min-h-screen text-white overflow-x-hidden"
      style={{ background: "#000" }}
    >
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      {/*
        FIX: Increased top padding on mobile from pt-[160px] to pt-[220px]
        so the heading never hides under the fixed navbar on small screens.
        sm breakpoint steps it down, md brings it back to the original value.
      */}
      <section
        className="relative overflow-hidden pt-[280px] sm:pt-[200px] md:pt-[120px]"
        style={{ paddingBottom: "80px" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 text-center">
          {/*
            FIX: h1 font-size — clamp floor raised to 48px so the heading
            is never too small on 360-px-wide phones.  7vw at 360px = ~25px
            which would be tiny; the 48px floor prevents that.
          */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: "'Libre Baskerville', 'Baskerville', Georgia, serif",
              fontSize: "clamp(48px, 7vw, 84px)",
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: "20px",

            }}
          >
            <span className="block text-white" style={{ marginTop: "100px" }}>Open</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(90deg, #f4e5b8 0%, #d4af37 50%, #c9a961 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tech Roles
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(15px, 2vw, 20px)",
              color: "rgba(245,240,232,0.55)",
            }}
          >
            Join the team at Govindani Infotech that builds, ships, and scales
            digital products across marketing, development, and beyond.
          </motion.p>

          {/*
            FIX: Stats row — flex-col on mobile so the three pills stack
            vertically instead of overflowing or wrapping awkwardly on 360px.
            Switches back to flex-row at sm breakpoint.
          */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mt-10"
          >
            {[
              { val: `${roles.length}`, label: "Open Roles" },
              { val: "On-site" },
              { val: "Pune" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl w-full sm:w-auto justify-center"
                style={{
                  background: "rgba(212,175,55,0.05)",
                  border: "1px solid rgba(212,175,55,0.15)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Libre Baskerville', 'Baskerville', Georgia, serif",
                    fontSize: "22px",
                    color: "#d4af37",
                    fontWeight: 700,
                  }}
                >
                  {s.val}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    color: "rgba(245,240,232,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FILTER TABS ─────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "10px clamp(16px, 5vw, 80px) 20px",
          borderTop: "1px solid rgba(212,175,55,0.08)",
          borderBottom: "1px solid rgba(212,175,55,0.08)",
          background: "rgba(212,175,55,0.018)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
          {departments.map((dept) => (
            <motion.button
              key={dept}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveDept(dept)}
              style={{
                padding: "8px 22px",
                borderRadius: "100px",
                border:
                  activeDept === dept
                    ? "1px solid #d4af37"
                    : "1px solid rgba(212,175,55,0.25)",
                background:
                  activeDept === dept
                    ? "linear-gradient(90deg, #d4af37, #c9a961)"
                    : "transparent",
                color: activeDept === dept ? "#000" : "rgba(212,175,55,0.7)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {dept}
              <span className="ml-2 text-xs opacity-70">
                {dept === "All"
                  ? roles.length
                  : roles.filter((r) => r.department === dept).length}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── ROLES GRID ──────────────────────────────────────────────────── */}
      <section style={{ padding: "20px clamp(16px, 5vw, 80px) 20px" }}>
        <div className="max-w-7xl mx-auto">
          <motion.p
            key={activeDept}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.28)",
            }}
          >
            {filtered.length} role{filtered.length !== 1 ? "s" : ""}{" "}
            {activeDept !== "All" ? `in ${activeDept}` : "available"}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDept}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
            >
              {filtered.map((role, i) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  index={i}
                  onOpen={setSelectedRole}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── PERKS ───────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "20px clamp(16px, 5vw, 80px) 20px",
          background: "rgba(212,175,55,0.018)",
          borderTop: "1px solid rgba(212,175,55,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10"
            style={{
              fontFamily: "'Libre Baskerville', 'Baskerville', Georgia, serif",
              fontSize: "18px",
              background: "linear-gradient(90deg, #f4e5b8, #d4af37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Why Build Here?
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                icon: "💰",
                title: "Competitive Pay",
                body: "Market-leading salaries with performance bonuses tied to impact.",
              },
              {
                icon: "🏡",
                title: "Hybrid Flexibility",
                body: "Work from office or home — we trust you to deliver your best.",
              },
              {
                icon: "📈",
                title: "Fast-Track Growth",
                body: "Clear promotion paths with quarterly reviews and mentorship.",
              },
              {
                icon: "🧠",
                title: "Continuous Learning",
                body: "Company-sponsored certifications, courses, and tech conferences.",
              },
              {
                icon: "🤝",
                title: "Expert Mentorship",
                body: "Learn from industry veterans with decades of combined experience.",
              },
              {
                icon: "🌍",
                title: "Real-World Impact",
                body: "Your code reaches thousands of users across multiple industries.",
              },
            ].map((perk, i) => (
              <motion.div
                key={perk.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="p-6 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  border: "1px solid rgba(212,175,55,0.10)",
                  transition: "border-color 0.3s",
                }}
                whileHover={{
                  borderColor: "rgba(212,175,55,0.35)",
                  background: "rgba(212,175,55,0.04)",
                }}
              >
                <div className="text-2xl mb-3">{perk.icon}</div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "'Libre Baskerville', 'Baskerville', Georgia, serif",
                    fontSize: "18px",
                    color: "#d4af37",
                  }}
                >
                  {perk.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    color: "rgba(245,240,232,0.5)",
                    lineHeight: 1.65,
                  }}
                >
                  {perk.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "20px clamp(16px, 5vw, 80px) 20px" }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
            style={{
              fontFamily: "'Libre Baskerville', 'Baskerville', Georgia, serif",
              fontSize: "18px",
              background: "linear-gradient(90deg, #f4e5b8, #d4af37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Hiring Process
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Apply Online", body: "Submit your application through our careers page." },
              { step: "02", title: "Screening Call", body: "A 20-min call to understand your background and goals." },
              { step: "03", title: "Technical Round", body: "A practical task or interview relevant to your role." },
              { step: "04", title: "Final Interview", body: "Meet the team and discuss your future with us." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative p-6 rounded-2xl text-center"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  border: "1px solid rgba(212,175,55,0.10)",
                }}
              >
                <div
                  className="text-4xl font-black mb-3"
                  style={{
                    fontFamily: "'Libre Baskerville', 'Baskerville', Georgia, serif",
                    color: "rgba(212,175,55,0.15)",
                    lineHeight: 1,
                  }}
                >
                  {s.step}
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "'Libre Baskerville', 'Baskerville', Georgia, serif",
                    fontSize: "18px",
                    color: "#f4e5b8",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    color: "rgba(245,240,232,0.45)",
                    lineHeight: 1.6,
                  }}
                >
                  {s.body}
                </p>
                {i < 3 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-2.5 text-[#d4af37] opacity-30"
                    style={{ transform: "translateY(-50%)", fontSize: "20px" }}
                  >
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ padding: "20px clamp(16px, 5vw, 80px) 20px" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&auto=format&fit=crop&q=80"
            alt="team"
            className="w-full h-full object-cover opacity-10"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.7) 50%, #000 100%)",
            }}
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: "'Libre Baskerville', 'Baskerville', Georgia, serif",
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 600,
              lineHeight: 1.15,
              marginBottom: "20px",
            }}
          >
            <span className="block text-white">Don't See Your Role?</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(90deg, #f4e5b8, #d4af37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Let's Talk Anyway.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(15px, 1.8vw, 19px)",
              color: "rgba(245,240,232,0.55)",
            }}
          >
            We're always on the lookout for exceptional talent. If you believe
            you'd be a great fit at Govindani Infotech, reach out — we'd love
            to hear from you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(212,175,55,0.45)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/explore-career")}
              className="px-10 py-4 rounded-full font-semibold text-base relative overflow-hidden"
              style={{
                background: "linear-gradient(90deg, #d4af37, #c9a961)",
                color: "#000",
                fontFamily: "'Inter', sans-serif",
                border: "none",
                cursor: "pointer",
                transition: "box-shadow 0.3s ease",
              }}
            >
              Contact Us →
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/careers")}
              className="px-10 py-4 rounded-full font-semibold text-base"
              style={{
                background: "transparent",
                color: "#d4af37",
                fontFamily: "'Inter', sans-serif",
                border: "1px solid rgba(212,175,55,0.4)",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              Back to Careers
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── ROLE MODAL ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedRole && (
          <RoleModal
            role={selectedRole}
            onClose={() => setSelectedRole(null)}
            onApply={handleApply}
          />
        )}
      </AnimatePresence>

      {/* ── STYLES ──────────────────────────────────────────────────────── */}
      <style>{`

        * { box-sizing: border-box; }
::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #d4af37, #c9a961);
          border-radius: 4px;
        }

        h1, h2, h3, h4 {
          font-family: 'Libre Baskerville', 'Baskerville', 'Times New Roman', Georgia, serif;
        }

        p, li, a, span, button, input, textarea, label {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        @media (max-width: 768px) {
          section { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </div>
  );
};

export default TechRoles;