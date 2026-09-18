import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X, Send, ChevronDown, Calendar } from "lucide-react";

/** ===================== TYPES ===================== */
type WebsiteType = "" | "current" | "new";
type DonorRange = "" | "0-100" | "100-1000" | "1000-100000" | "100000+";

export type FormData = {
  firstName: string;
  city: string;
  email: string;
  phoneNumber: string;
  websiteType: WebsiteType;
  currentWebsiteUrl: string;
  websiteDescription: string;
  donorRange: DonorRange;
  meetingScheduled: boolean;
  lastSaved?: string;
};

export type Errors = Partial<Record<keyof FormData, string>>;

/** ===================== STORAGE ===================== */
const STORAGE_KEY_DRAFT = "appssection_lead_draft_v2";
const STORAGE_KEY_SUBMITTED = "appssection_lead_submitted_v1";

/** ===================== DEFAULTS ===================== */
const defaultFormData: FormData = {
  firstName: "",
  city: "",
  email: "",
  phoneNumber: "",
  websiteType: "",
  currentWebsiteUrl: "",
  websiteDescription: "",
  donorRange: "",
  meetingScheduled: false,
  lastSaved: undefined,
};

/** ===================== VALIDATORS ===================== */
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function isValidPhone(v: string) {
  return v.replace(/\D/g, "").length >= 10;
}

function isValidUrl(v: string) {
  try {
    const u = new URL(v);
    return !!u.protocol && !!u.host;
  } catch {
    return false;
  }
}

/** ===================== COMPONENT ===================== */
type GoogleFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit?: (data: FormData) => void;
  zIndexClass?: string;
};

const GoogleForm = ({ isOpen, onClose, onSuccessSubmit, zIndexClass = "z-50" }: GoogleFormProps) => {
  const modalPanelRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<Errors>({});
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Updated Calendar Link - Replace with your actual Google Calendar booking page
  const COMPANY_CALENDAR_LINK = "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MW9sZWpmNGtzbzE2cnZoZnRrcDZjcG1lM3Egc3VwcG9ydEBnb3ZpbmRhbmlpdC5vcmc&tmsrc=support%40govindaniit.org";

  const modalGradient = "bg-gradient-to-r from-[#06223A] via-[#072A45] to-[#06223A]";
  const cyanLine = "bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500";
  
  const inputBase =
    "w-full rounded-xl border border-cyan-300 bg-white px-3 py-2.5 text-sm text-black placeholder:text-slate-400 " +
    "focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-500 transition";
  
  const textareaBase =
    "w-full rounded-xl border border-cyan-300 bg-white px-3 py-2.5 text-sm text-black placeholder:text-slate-400 " +
    "focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-500 transition resize-none";
  
  const labelBase = "text-sm font-semibold text-slate-700";

  const lastSavedLabel = useMemo(() => {
    if (!formData.lastSaved) return "";
    try {
      const d = new Date(formData.lastSaved);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  }, [formData.lastSaved]);

  const clearFieldError = (key: keyof Errors) => {
    setErrors((prev) => {
      if (!prev?.[key]) return prev;
      const next = { ...prev };
      delete (next as any)[key];
      return next;
    });
  };

  const closeForm = () => {
    setShowCalendar(false);
    setErrors({});
    onClose();
  };

  /** LOAD DRAFT ON OPEN */
  useEffect(() => {
    if (!isOpen) return;
    try {
      const draft = localStorage.getItem(STORAGE_KEY_DRAFT);
      if (draft) {
        const parsed = JSON.parse(draft);
        setFormData({ ...defaultFormData, ...parsed });
      } else {
        setFormData(defaultFormData);
      }
    } catch {
      setFormData(defaultFormData);
    }
    setErrors({});
    setShowCalendar(false);
  }, [isOpen]);

  /** AUTOSAVE DRAFT */
  useEffect(() => {
    if (!isOpen) return;
    try {
      const save = { ...formData, lastSaved: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(save));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isOpen,
    formData.firstName,
    formData.city,
    formData.email,
    formData.phoneNumber,
    formData.websiteType,
    formData.currentWebsiteUrl,
    formData.websiteDescription,
    formData.donorRange,
    formData.meetingScheduled,
  ]);

  /** INPUT CHANGE */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => {
      const next: any = { ...prev };
      if (type === "checkbox") {
        next[name] = (e.target as HTMLInputElement).checked;
      } else {
        next[name] = value;
      }
      if (name === "websiteType") {
        if (value === "current") {
          next.donorRange = "";
        }
        if (value === "new") {
          next.currentWebsiteUrl = "";
          next.websiteDescription = "";
        }
      }
      return next;
    });
    setErrors((prev) => {
      if (!prev[name as keyof Errors]) return prev;
      const copy = { ...prev };
      delete (copy as any)[name];
      return copy;
    });
  };

  /** MEETING SCHEDULE */
  const handleScheduleMeeting = () => {
    setShowCalendar(true);
    setFormData((prev) => ({ ...prev, meetingScheduled: true }));
    clearFieldError("meetingScheduled");
  };

  /** SUBMIT WITH VALIDATION + SIMPLE ALERT */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const alreadySubmitted = localStorage.getItem(STORAGE_KEY_SUBMITTED) === "1";
    if (alreadySubmitted) {
      closeForm();
      return;
    }
    
    const nextErrors: Errors = {};
    if (!formData.firstName.trim()) nextErrors.firstName = "First name is required";
    if (!formData.city.trim()) nextErrors.city = "City is required";
    if (!formData.email.trim() || !isValidEmail(formData.email))
      nextErrors.email = "Enter a valid email";
    if (!formData.phoneNumber.trim() || !isValidPhone(formData.phoneNumber))
      nextErrors.phoneNumber = "Enter a valid phone number";
    if (!formData.websiteType) nextErrors.websiteType = "Please choose one option";
    
    if (formData.websiteType === "current") {
      if (!formData.currentWebsiteUrl.trim() || !isValidUrl(formData.currentWebsiteUrl))
        nextErrors.currentWebsiteUrl = "Enter a valid website URL";
      if (!formData.websiteDescription.trim())
        nextErrors.websiteDescription = "Please add a short description";
    }
    
    if (formData.websiteType === "new") {
      if (!formData.donorRange) nextErrors.donorRange = "Please select donor range";
    }
    
    if (formData.websiteType && !formData.meetingScheduled) {
      nextErrors.meetingScheduled = "Meeting schedule is required";
    }
    
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    
    // Success alert
    alert("You have submitted successfully. We will contact you soon.");
    
    // optional callback to parent
    onSuccessSubmit?.(formData);
    
    try {
      localStorage.setItem(STORAGE_KEY_SUBMITTED, "1");
      localStorage.removeItem(STORAGE_KEY_DRAFT);
    } catch {}
    
    setFormData(defaultFormData);
    closeForm();
  };

  /** GSAP OPEN ANIM */
  useGSAP(
    () => {
      const panel = modalPanelRef.current;
      if (!panel) return;
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
      if (isOpen) {
        gsap.fromTo(
          panel,
          { autoAlpha: 0, y: 18, scale: 0.98, filter: "blur(6px)" },
          { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.45, ease: "power3.out" }
        );
      }
    },
    { dependencies: [isOpen] }
  );

  /** RESET SCROLL TOP */
  useEffect(() => {
    if (!isOpen) return;
    window.setTimeout(() => {
      if (modalPanelRef.current) modalPanelRef.current.scrollTop = 0;
    }, 0);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`
        fixed inset-0 ${zIndexClass}
        bg-black/55 backdrop-blur-[2px]
        flex items-center justify-center
        p-3 sm:p-6
      `}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalPanelRef}
        className="
          w-full max-w-3xl
          max-h-[88vh]
          overflow-y-auto
          rounded-2xl
          shadow-2xl
          border border-white/10
          bg-white
        "
      >
        {/* Header */}
        <div className={`sticky top-0 z-10 ${modalGradient} px-4 py-3`}>
          <button
            onClick={closeForm}
            className="absolute right-4 top-4 rounded-full p-2 hover:bg-white/10 transition"
            aria-label="Close"
            type="button"
          >
            <X className="text-white" size={22} />
          </button>
          <div className="flex items-center gap-3 pr-10">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Let's Connect!</h3>
              <p className="text-white/75 text-sm mt-1">Govindani Infotech Client Form</p>
            </div>
          </div>
          <div className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className={`h-full w-[70%] ${cyanLine}`} />
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-3 sm:px-5 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelBase}>
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                className={`${inputBase} ${errors.firstName ? "border-red-400 ring-0" : ""}`}
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className={labelBase}>
                City <span className="text-red-500">*</span>
              </label>
              <input
                className={`${inputBase} ${errors.city ? "border-red-400 ring-0" : ""}`}
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className={labelBase}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className={`${inputBase} ${errors.email ? "border-red-400 ring-0" : ""}`}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className={labelBase}>
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                className={`${inputBase} ${errors.phoneNumber ? "border-red-400 ring-0" : ""}`}
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Your phone number"
                inputMode="tel"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-slate-800">
                    Do you want to customize your current website or create a new website?
                    <span className="text-red-500"> *</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Choose one option to continue.</div>
                </div>
                <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500" />
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      websiteType: "current",
                      donorRange: "",
                    }));
                    clearFieldError("websiteType");
                  }}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    formData.websiteType === "current"
                      ? "border-cyan-400 bg-white shadow-sm"
                      : "border-slate-200 bg-white hover:border-cyan-200"
                  }`}
                >
                  <div className="text-sm font-semibold text-slate-900">Customize Current Website</div>
                  <div className="text-xs text-slate-500 mt-1">Share URL + what you want to improve</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      websiteType: "new",
                      currentWebsiteUrl: "",
                      websiteDescription: "",
                    }));
                    clearFieldError("websiteType");
                  }}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    formData.websiteType === "new"
                      ? "border-cyan-400 bg-white shadow-sm"
                      : "border-slate-200 bg-white hover:border-cyan-200"
                  }`}
                >
                  <div className="text-sm font-semibold text-slate-900">Create New Website</div>
                  <div className="text-xs text-slate-500 mt-1">Tell donor range + schedule meeting</div>
                </button>
              </div>

              {errors.websiteType && <p className="text-red-500 text-xs mt-2">{errors.websiteType}</p>}
            </div>
          </div>

          {formData.websiteType === "current" && (
            <div className="mt-5 rounded-2xl border border-cyan-100 bg-cyan-50/60 p-4">
              <div className="text-sm font-bold text-slate-800 mb-3">Current Website Details</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelBase}>
                    Website URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={`${inputBase} ${errors.currentWebsiteUrl ? "border-red-400 ring-0" : ""}`}
                    name="currentWebsiteUrl"
                    value={formData.currentWebsiteUrl}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                  />
                  {errors.currentWebsiteUrl && (
                    <p className="text-red-500 text-xs mt-1">{errors.currentWebsiteUrl}</p>
                  )}
                </div>

                <div>
                  <label className={labelBase}>
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className={`${textareaBase} ${errors.websiteDescription ? "border-red-400 ring-0" : ""}`}
                    name="websiteDescription"
                    value={formData.websiteDescription}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="What do you want to improve?"
                  />
                  {errors.websiteDescription && (
                    <p className="text-red-500 text-xs mt-1">{errors.websiteDescription}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {formData.websiteType === "new" && (
            <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50/60 p-4">
              <div className="text-sm font-bold text-slate-800 mb-3">New Website Details</div>
              <label className={labelBase}>
                How many donors tried to donate in last 3 months? <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-2">
                <select
                  className={`${inputBase} appearance-none pr-10 ${errors.donorRange ? "border-red-400 ring-0" : ""}`}
                  name="donorRange"
                  value={formData.donorRange}
                  onChange={handleInputChange}
                >
                  <option value="">Select range</option>
                  <option value="0-100">0 - 100</option>
                  <option value="100-1000">100 - 1,000</option>
                  <option value="1000-100000">1,000 - 100,000</option>
                  <option value="100000+">100,000+</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={18}
                />
              </div>
              {errors.donorRange && <p className="text-red-500 text-xs mt-1">{errors.donorRange}</p>}
            </div>
          )}

          {formData.websiteType && (
            <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="text-violet-600" size={18} />
                  <div className="text-sm font-bold text-slate-800">
                    Schedule a Meeting <span className="text-red-500">*</span>
                  </div>
                </div>

                {formData.meetingScheduled ? (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    Marked as Scheduled
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                    Required
                  </span>
                )}
              </div>

              {!showCalendar ? (
                <button
                  type="button"
                  onClick={handleScheduleMeeting}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white
                           bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-95 transition"
                >
                  <Calendar size={18} />
                  Schedule using Google Calendar
                </button>
              ) : (
                <div className="mt-3 rounded-xl border border-violet-200 bg-white p-4">
                  <div className="text-sm font-semibold text-emerald-700">
                    ✓ Book a meeting with Govindani Infotech Team
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Schedule directly to our company calendar (support@govindaniit.org)
                  </div>

                  {/* Updated Calendar Link */}
                  <a
                    href={COMPANY_CALENDAR_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-semibold text-white
                             bg-gradient-to-r from-cyan-500 to-sky-500 hover:opacity-95 transition hover:scale-105"
                  >
                    <Calendar className="mr-2" size={16} />
                    Book Appointment
                  </a>

                  <div className="mt-2 text-xs text-slate-500">
                    Click above to open Google Calendar and select a time slot that works for you.
                  </div>

                  {errors.meetingScheduled && (
                    <p className="text-red-500 text-xs mt-2">{errors.meetingScheduled}</p>
                  )}
                </div>
              )}

              {errors.meetingScheduled && !showCalendar && (
                <p className="text-red-500 text-xs mt-2">{errors.meetingScheduled}</p>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Autosave: <span className="font-semibold text-slate-700">ON</span>
              {lastSavedLabel ? <span className="ml-2">• Last saved at {lastSavedLabel}</span> : null}
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={closeForm}
                className="w-full md:w-auto rounded-xl px-5 py-3 font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full md:w-auto rounded-xl px-6 py-3 font-semibold text-white shadow-lg
                         bg-gradient-to-r from-cyan-500 to-sky-500 hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Submit
              </button>
            </div>
          </div>

          <div className="mt-3 text-center text-[11px] text-slate-400">
            Draft is stored locally while typing (localStorage). Data stays even if you close the tab.
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoogleForm;