"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxGnsPDOVdpuBXuWmNjMqY0hYeMZ2F_6y_uQjbzxvYI3z9iJkfgRikWpuRJ7G3DiMML/exec";
const AUTOSAVE_KEY = "career_form_autosave_v2";

// ─────────────────────────────────────────────────────────────────────────────

const ROLES = [
  "Python Developer",
  "Java Developer",
  "Frontend Developer",
  "Backend Developer",
  "WordPress Developer",
  "Social Media Marketing",
  "Sales Executive",
] as const;

// ── Social Icons ─────────────────────────────────────────────────────────────
const IconFacebook = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>;
const IconLinkedin = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>;
const IconInsta = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
const IconYoutube = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z" /></svg>;

type Role = (typeof ROLES)[number];

interface FormData {
  name: string;
  city: string;
  industry: string;
  contact: string;
  role: Role | "";
  resume: File | null;
}

interface FormErrors {
  name?: string;
  city?: string;
  industry?: string;
  contact?: string;
  role?: string;
  resume?: string;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Gold palette ─────────────────────────────────────────────────────────────
const G = {
  gold:       "#C9A84C",
  goldLight:  "#E2C97E",
  goldDim:    "#7A5F28",
  cream:      "#F5EDD6",
  creamDim:   "#D9C99A",
  creamMuted: "#A0906A",
  bg:         "#0A0A0A",
  surface:    "#111111",
  surfaceUp:  "#1A1A1A",
  border:     "#2A2A2A",
  borderGold: "#3A2E14",
};

const CareerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    city: "",
    industry: "",
    contact: "",
    role: "",
    resume: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [autosaveStatus, setAutosaveStatus] = useState<"idle" | "saved">("idle");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const autosaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autosaveStatusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasLoadedDraft = useRef(false);

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = (data: FormData): FormErrors => {
    const e: FormErrors = {};
    if (!data.name.trim()) e.name = "Full name is required.";
    else if (!/^[A-Za-z\s]{2,}$/.test(data.name.trim()))
      e.name = "Name must contain letters only no numbers or symbols.";

    if (!data.city.trim()) e.city = "City is required.";
    else if (!/^[A-Za-z\s]{2,}$/.test(data.city.trim()))
      e.city = "City must contain letters only.";

    if (!data.industry.trim()) e.industry = "Industry is required.";
    else if (!/^[A-Za-z\s&/]{2,}$/.test(data.industry.trim()))
      e.industry = "Industry must contain letters only.";

    if (!data.contact.trim()) e.contact = "Contact number is required.";
    else if (!/^[6-9]\d{9}$/.test(data.contact.trim()))
      e.contact = "Enter a valid 10-digit Indian mobile number (starts with 6 9).";

    if (!data.role) e.role = "Please select the role you are applying for.";

    if (!data.resume) {
      e.resume = "Please upload your resume.";
    } else {
      const allowed = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowed.includes(data.resume.type))
        e.resume = "Only PDF, DOC, or DOCX files are accepted.";
      else if (data.resume.size > 5 * 1024 * 1024)
        e.resume = "File size must be under 5 MB.";
    }
    return e;
  };

  const validateField = (field: keyof FormData, value: FormData[keyof FormData]) => {
    const e = validate({ ...formData, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: e[field as keyof FormErrors] }));
  };

  const hasAnyUserInput = (data: FormData) =>
    Boolean(
      data.name.trim() ||
        data.city.trim() ||
        data.industry.trim() ||
        data.contact.trim() ||
        data.role ||
        data.resume
    );

  const clearAutosave = () => {
    localStorage.removeItem(AUTOSAVE_KEY);
    setAutosaveStatus("idle");
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTOSAVE_KEY);
      if (!saved) { hasLoadedDraft.current = true; return; }
      const parsed = JSON.parse(saved);
      setFormData({
        name: parsed.name || "",
        city: parsed.city || "",
        industry: parsed.industry || "",
        contact: parsed.contact || "",
        role: parsed.role || "",
        resume: null,
      });
    } catch { /* ignore */ } finally {
      hasLoadedDraft.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedDraft.current || !hasAnyUserInput(formData)) return;
    if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);

    autosaveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(
        AUTOSAVE_KEY,
        JSON.stringify({
          name: formData.name,
          city: formData.city,
          industry: formData.industry,
          contact: formData.contact,
          role: formData.role,
          resumeMeta: formData.resume ? { name: formData.resume.name, size: formData.resume.size } : null,
        })
      );
      setAutosaveStatus("saved");
      if (autosaveStatusTimeoutRef.current) clearTimeout(autosaveStatusTimeoutRef.current);
      autosaveStatusTimeoutRef.current = setTimeout(() => setAutosaveStatus("idle"), 2200);
    }, 500);

    return () => { if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current); };
  }, [formData]);

  useEffect(() => {
    return () => {
      if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
      if (autosaveStatusTimeoutRef.current) clearTimeout(autosaveStatusTimeoutRef.current);
    };
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "contact") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFormData((p) => ({ ...p, contact: digits }));
      if (touched.contact) validateField("contact", digits);
      return;
    }
    if (["name", "city", "industry"].includes(name)) {
      const letters = value.replace(/[^A-Za-z\s&/]/g, "");
      setFormData((p) => ({ ...p, [name]: letters }));
      if (touched[name]) validateField(name as keyof FormData, letters);
      return;
    }
    setFormData((p) => ({ ...p, [name]: value }));
    if (touched[name]) validateField(name as keyof FormData, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    validateField(name as keyof FormData, formData[name as keyof FormData]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((p) => ({ ...p, resume: file }));
    setTouched((p) => ({ ...p, resume: true }));
    const err = validate({ ...formData, resume: file });
    setErrors((p) => ({ ...p, resume: err.resume }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const base64 = formData.resume ? await fileToBase64(formData.resume) : "";
      const payload = new URLSearchParams({
        name: formData.name.trim(),
        city: formData.city.trim(),
        industry: formData.industry.trim(),
        contact: formData.contact.trim(),
        role: formData.role,
        resumeData: base64,
        resumeFilename: formData.resume?.name || "",
        resumeMime: formData.resume?.type || "",
      });

      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: payload,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      setShowSuccess(true);
      setFormData({ name: "", city: "", industry: "", contact: "", role: "", resume: null });
      setTouched({});
      setErrors({});
      clearAutosave();
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setSubmitError("Could not submit. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Styled helpers ────────────────────────────────────────────────────────
  const inputBase: React.CSSProperties = {
    width: "100%",
    background: G.surfaceUp,
    border: `1px solid ${G.border}`,
    borderRadius: 10,
    padding: "10px 14px",
    color: G.cream,
    fontSize: 14,
    fontWeight: 500,
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "'DM Sans', sans-serif",
  };

  const inputStyle = (field: keyof FormErrors): React.CSSProperties => ({
    ...inputBase,
    ...(touched[field] && errors[field]
      ? { borderColor: "#8B2020", background: "#1A0A0A" }
      : {}),
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 10,
    fontWeight: 700,
    color: G.goldLight,
    marginBottom: 6,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif",
  };

  const ErrorMsg = ({ field }: { field: keyof FormErrors }) =>
    touched[field] && errors[field] ? (
      <p
        style={{
          marginTop: 6,
          fontSize: 12,
          color: "#F87171",
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <svg style={{ width: 13, height: 13, flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        {errors[field]}
      </p>
    ) : null;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .cfm * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .cfm input::placeholder { color: ${G.creamMuted}; opacity: 1; }
        .cfm select { color: ${G.cream}; }
        .cfm select option { background: #1A1A1A; color: ${G.cream}; }
        .cfm input:focus, .cfm select:focus {
          border-color: ${G.gold} !important;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.13) !important;
        }
        .cfm input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px ${G.surfaceUp} inset;
          -webkit-text-fill-color: ${G.cream};
        }
        @keyframes shimmer-gold {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .social-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.18);
          color: #0a0a0a;
          background: linear-gradient(135deg, #d4af37 0%, #ffffff 100%);
          transition: all 0.25s;
          text-decoration: none; font-size: 0.75rem;
        }
        .social-btn:hover {
          border-color: #ffffff;
          transform: translateY(-2px);
          background: linear-gradient(135deg, #ffffff 0%, #d4af37 100%);
        }
      `}</style>

      <div className="cfm" style={{ width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{
            width: "100%",
            borderRadius: 20,
            overflow: "hidden",
            border: `1px solid ${G.borderGold}`,
            boxShadow: "0 8px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.08)",
          }}
        >
          {/* ── DARK GOLD HEADER ──────────────────────────────────────────── */}
          <div
            style={{
              position: "relative",
              padding: "32px 28px 28px",
              background: `linear-gradient(145deg, #0D0D0D 0%, #111008 60%, #141004 100%)`,
              borderBottom: `1px solid ${G.borderGold}`,
              overflow: "hidden",
            }}
          >
            {/* decorative rings */}
            {[
              { top: -30, right: -30, size: 140, opacity: 0.06 },
              { bottom: -36, left: -24, size: 130, opacity: 0.04 },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  top: s.top,
                  bottom: s.bottom,
                  right: s.right,
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  borderRadius: "50%",
                  border: `1px solid rgba(201,168,76,${s.opacity * 3})`,
                  background: `rgba(201,168,76,${s.opacity})`,
                }}
              />
            ))}
            {/* gold accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${G.gold}, transparent)`,
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: G.gold,
                    display: "inline-block",
                    animation: "pulse 2s infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: G.goldDim,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Govindani Infotech Pvt. Ltd.
                </span>
              </div>

              <h2
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: G.cream,
                  marginBottom: 6,
                  lineHeight: 1.2,
                  fontFamily: "'Libre Baskerville', serif",
                  letterSpacing: "-0.01em",
                  background: `linear-gradient(135deg, ${G.cream} 0%, ${G.goldLight} 50%, ${G.cream} 100%)`,
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Apply for a Position
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: G.creamMuted,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Fill in the details below we'll review your profile and get back to you.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 20,
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {["Personal Info", "Role", "Resume"].map((label, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          height: 3,
                          width: i === 0 ? 28 : 14,
                          borderRadius: 99,
                          background: i === 0 ? G.gold : G.goldDim,
                          transition: "all 0.3s",
                        }}
                      />
                      <span
                        style={{
                          fontSize: 10,
                          color: i === 0 ? G.creamDim : G.goldDim,
                          display: "none",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                        className="sm-inline"
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {autosaveStatus === "saved" && (
                    <motion.div
                      key="autosaved"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.22 }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        borderRadius: 99,
                        padding: "4px 12px",
                        fontSize: 11,
                        fontWeight: 600,
                        color: G.goldLight,
                        background: "rgba(201,168,76,0.08)",
                        border: `1px solid rgba(201,168,76,0.18)`,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <svg style={{ width: 13, height: 13 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Autosaved
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── DARK FORM BODY ───────────────────────────────────────────── */}
          <div style={{ background: G.surface, padding: "28px 28px 24px" }}>
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Full Name */}
              <div>
                <label style={labelStyle}>
                  Full Name <span style={{ color: "#F87171" }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Rahul Sharma"
                  style={inputStyle("name")}
                  autoComplete="off"
                />
                <ErrorMsg field="name" />
              </div>

              {/* City + Industry */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={labelStyle}>
                    City <span style={{ color: "#F87171" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Mumbai"
                    style={inputStyle("city")}
                    autoComplete="off"
                  />
                  <ErrorMsg field="city" />
                </div>
                <div>
                  <label style={labelStyle}>
                    Industry <span style={{ color: "#F87171" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. IT / Digital Marketing"
                    style={inputStyle("industry")}
                    autoComplete="off"
                  />
                  <ErrorMsg field="industry" />
                </div>
              </div>

              {/* Contact */}
              <div>
                <label style={labelStyle}>
                  Contact / WhatsApp No. <span style={{ color: "#F87171" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: "0 auto 0 0",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 14,
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: G.goldDim,
                        paddingRight: 12,
                        borderRight: `1px solid ${G.borderGold}`,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      +91
                    </span>
                  </div>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="9201958271"
                    maxLength={10}
                    inputMode="numeric"
                    style={{ ...inputStyle("contact"), paddingLeft: 56, paddingRight: 52 }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: "0 14px 0 auto",
                      display: "flex",
                      alignItems: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: formData.contact.length === 10 ? "#4ADE80" : G.goldDim,
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "color 0.2s",
                      }}
                    >
                      {formData.contact.length}/10
                    </span>
                  </div>
                </div>
                <ErrorMsg field="contact" />
              </div>

              {/* Role Dropdown */}
              <div>
                <label style={labelStyle}>
                  Role Applying For <span style={{ color: "#F87171" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      ...inputStyle("role"),
                      appearance: "none",
                      paddingRight: 40,
                      cursor: "pointer",
                    }}
                  >
                    <option value="" disabled>
                      Select a role  
                    </option>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <span
                    style={{
                      pointerEvents: "none",
                      position: "absolute",
                      inset: "0 14px 0 auto",
                      display: "flex",
                      alignItems: "center",
                      color: G.gold,
                    }}
                  >
                    <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
                <ErrorMsg field="role" />
              </div>

              {/* Resume Upload */}
              <div>
                <label style={labelStyle}>
                  Upload Resume <span style={{ color: "#F87171" }}>*</span>
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    borderRadius: 10,
                    border: `2px dashed ${
                      touched.resume && errors.resume
                        ? "#8B2020"
                        : formData.resume
                        ? G.gold
                        : G.borderGold
                    }`,
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background:
                      touched.resume && errors.resume
                        ? "#1A0A0A"
                        : formData.resume
                        ? "rgba(201,168,76,0.06)"
                        : G.surfaceUp,
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: formData.resume ? G.gold : G.borderGold,
                      color: formData.resume ? "#0A0A0A" : G.goldDim,
                      transition: "all 0.2s",
                    }}
                  >
                    {formData.resume ? (
                      <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {formData.resume ? (
                      <>
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: G.goldLight,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {formData.resume.name}
                        </p>
                        <p style={{ fontSize: 12, color: G.creamMuted, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>
                          {(formData.resume.size / 1024).toFixed(0)} KB ·{" "}
                          <span style={{ color: G.gold, textDecoration: "underline", textUnderlineOffset: 2 }}>
                            Click to replace
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <p style={{ fontSize: 13, fontWeight: 600, color: G.creamDim, fontFamily: "'DM Sans', sans-serif" }}>
                          Click to upload your resume
                        </p>
                        <p style={{ fontSize: 12, color: G.creamMuted, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>
                          PDF, DOC, DOCX · Max 5 MB
                        </p>
                      </>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
                <ErrorMsg field="resume" />
              </div>

              {/* Server error */}
              {submitError && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "#1A0808",
                    border: "1px solid #5C1A1A",
                    borderRadius: 10,
                    padding: "10px 14px",
                    fontSize: 13,
                    color: "#F87171",
                    fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <svg style={{ width: 16, height: 16, flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {submitError}
                </div>
              )}

              <div style={{ borderTop: `1px solid ${G.border}`, margin: "4px 0" }} />

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.015 } : {}}
                whileTap={!isSubmitting ? { scale: 0.985 } : {}}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 14,
                  color: isSubmitting ? G.goldDim : "#0A0A0A",
                  letterSpacing: "0.04em",
                  border: "none",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  background: isSubmitting
                    ? G.borderGold
                    : `linear-gradient(135deg, ${G.gold} 0%, ${G.goldLight} 50%, ${G.gold} 100%)`,
                  boxShadow: isSubmitting ? "none" : `0 4px 24px rgba(201,168,76,0.3)`,
                  transition: "all 0.2s",
                  fontFamily: "'DM Sans', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  backgroundSize: "200% auto",
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit Application
                    <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </motion.button>

              <p
                style={{
                  textAlign: "center",
                  fontSize: 11,
                  color: G.goldDim,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                By submitting, you agree to our privacy policy.
              </p>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 12 }}>
                <p style={{ fontSize: 10, color: G.goldDim, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>Follow Our Journey</p>
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    { icon: <IconLinkedin />, href: "https://www.linkedin.com/company/govindani-infotech/?viewAsMember=true" },
                    { icon: <IconInsta />, href: "https://www.instagram.com/govindani_infotech_pvt_ltd/" },
                    { icon: <IconFacebook />, href: "https://www.facebook.com/people/Govindani-Infotech/100089453446845/" },
                    { icon: <IconYoutube />, href: "https://www.youtube.com/channel/UCMPVJv_auCr-TAQiPFX1KZg" },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn">{s.icon}</a>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* ── SUCCESS POPUP ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(8px)",
            }}
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: G.surface,
                borderRadius: 20,
                overflow: "hidden",
                maxWidth: 360,
                width: "100%",
                border: `1px solid ${G.borderGold}`,
                boxShadow: `0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.12)`,
              }}
            >
              {/* Popup header */}
              <div
                style={{
                  position: "relative",
                  padding: "32px",
                  textAlign: "center",
                  background: `linear-gradient(145deg, #0D0D0D, #141004)`,
                  borderBottom: `1px solid ${G.borderGold}`,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${G.gold}, transparent)`,
                  }}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.15 }}
                  style={{
                    width: 64,
                    height: 64,
                    margin: "0 auto 16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(201,168,76,0.12)",
                    border: `2px solid rgba(201,168,76,0.35)`,
                  }}
                >
                  <motion.svg
                    style={{ width: 30, height: 30, color: G.goldLight }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </motion.svg>
                </motion.div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: G.cream,
                    fontFamily: "'Libre Baskerville', serif",
                    marginBottom: 4,
                  }}
                >
                  Application Submitted!
                </h3>
                <p style={{ fontSize: 13, color: G.creamMuted, fontFamily: "'DM Sans', sans-serif" }}>
                  Thank you for applying to Govindani Infotech.
                </p>
              </div>

              <div style={{ padding: "24px 28px", textAlign: "center" }}>
                <p
                  style={{
                    fontSize: 13,
                    color: G.creamMuted,
                    lineHeight: 1.65,
                    marginBottom: 20,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Our team will carefully review your profile and reach out to you soon. Keep an eye on your WhatsApp
                  and email!
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowSuccess(false)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#0A0A0A",
                    border: "none",
                    cursor: "pointer",
                    background: `linear-gradient(135deg, ${G.gold}, ${G.goldLight})`,
                    boxShadow: `0 4px 16px rgba(201,168,76,0.28)`,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Done
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </>
  );
};

export default CareerForm;