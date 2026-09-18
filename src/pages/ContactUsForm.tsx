"use client";

import { useState, FormEvent, useRef, useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  experience?: string;
  subject?: string;
  message?: string;
  othersText?: string;
}

interface CenterToast {
  id: number;
  messages: string[];
  type: "success" | "error";
  visible: boolean;
}

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxaXavz15SJMeTef1SgZAvrAK4yZNkCVOuCInvCtns9vEgqzmYj1NWzaDs8t56TsoHp/exec";

const SUBJECT_OPTIONS = [
  "WhatsApp Flow",
  "Google Ads",
  "Social Media Marketing",
  "Logo Designing",
  "Lead Generation",
  "VideoGraphy",
  "360° Virtual Tour",
  "Ecommerce Platform Listing",
  "Product Shoot",
  "Website Creation",
  "SEO",
  "Graphic Designer",
  "AI Product Shoot",
  "Advanced Checkout System",
  "Others",
];

const ContactUsForm = ({ onSuccess, onClose, isModal = false }: { onSuccess?: () => void; onClose?: () => void; isModal?: boolean } = {}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    experience: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [centerToast, setCenterToast] = useState<CenterToast | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [waterDrop, setWaterDrop] = useState<{ x: number; y: number; id: number } | null>(null);

  // ── Custom dropdown state ──
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  /* In the modal the form is too tall to scroll comfortably, so it runs as two
     steps with a pinned action bar. The full contact page stays a single form. */
  const split = isModal;
  const [step, setStep] = useState(1);
  const [othersText, setOthersText] = useState("");
  const [othersError, setOthersError] = useState<string | undefined>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
    extraMessages: string[] = []
  ) => {
    const id = Date.now();
    setCenterToast({ id, messages: [message, ...extraMessages], type, visible: true });
    setTimeout(() => {
      setCenterToast((prev) => (prev ? { ...prev, visible: false } : null));
      setTimeout(() => setCenterToast(null), 350);
    }, 4000);
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const id = Date.now();
    setWaterDrop({ x, y, id });
    setTimeout(() => setWaterDrop(null), 1000);
  };

  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return "Name is required";
    if (!/^[a-zA-Z\s.]+$/.test(name)) return "Name should only contain letters and spaces";
    if (/\d/.test(name)) return "Name should not contain numbers";
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) return "Phone number is required";
    if (!/^\d+$/.test(phone)) return "Phone should only contain digits";
    if (phone.length > 10) return "Phone number should not exceed 10 digits";
    if (phone.length < 10) return "Phone number should be 10 digits";
    return undefined;
  };

  const validateExperience = (experience: string): string | undefined => {
    if (experience && !/^\d+$/.test(experience)) return "Experience should only contain numbers";
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return "Please enter a valid email (e.g., admin@gmail.com)";
    return undefined;
  };

  /** Validates only the fields shown on step 1. */
  const validateStepOne = (): boolean => {
    const errors: FormErrors = {};
    errors.name = validateName(formData.name);
    errors.email = validateEmail(formData.email);
    errors.phone = validatePhone(formData.phone);
    errors.experience = validateExperience(formData.experience);
    setFormErrors((prev) => ({ ...prev, ...errors }));
    return !Object.values(errors).some((e) => e !== undefined);
  };

  const goToStepTwo = () => {
    if (validateStepOne()) setStep(2);
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    errors.name = validateName(formData.name);
    errors.email = validateEmail(formData.email);
    errors.phone = validatePhone(formData.phone);
    errors.experience = validateExperience(formData.experience);
    if (!formData.subject) {
      errors.subject = "Please select a subject";
    }
    if (formData.subject === "Others" && !othersText.trim()) {
      errors.othersText = "Please describe your enquiry";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    setFormErrors(errors);
    setOthersError(errors.othersText);
    return !Object.values(errors).some((e) => e !== undefined);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (split && step === 1) {
      e.preventDefault();
      goToStepTwo();
      return;
    }
    e.preventDefault();
    if (!validateForm()) {
      const errors: FormErrors = {};
      errors.name = validateName(formData.name);
      errors.email = validateEmail(formData.email);
      errors.phone = validatePhone(formData.phone);
      errors.experience = validateExperience(formData.experience);
      if (!formData.subject) errors.subject = "Please select a subject";
      if (formData.subject === "Others" && !othersText.trim())
        errors.othersText = "Please describe your enquiry";
      if (!formData.message.trim()) errors.message = "Message is required";

      const errorList = Object.values(errors)
        .filter((v): v is string => v !== undefined);

      showToast("Please fix the following errors:", "error", errorList);
      return;
    }
    setIsSubmitting(true);
    const finalSubject = formData.subject === "Others" ? `Others: ${othersText}` : formData.subject;
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          name: formData.name,
          experience: formData.experience,
          phone: formData.phone,
          email: formData.email,
          subject: finalSubject,
          message: formData.message,
        }),
      });
      setShowSuccessModal(true);
      if (onSuccess) onSuccess();
      setFormData({ name: "", email: "", phone: "", experience: "", subject: "", message: "" });
      setFormErrors({});
      setOthersText("");
      setOthersError(undefined);
    } catch (error) {
      showToast("Failed to send message. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name") {
      const lettersOnly = value.replace(/[^a-zA-Z\s.]/g, "");
      setFormData((prev) => ({ ...prev, [name]: lettersOnly }));
      setFormErrors((prev) => ({ ...prev, [name]: validateName(lettersOnly) }));
      return;
    }
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
        setFormErrors((prev) => ({ ...prev, [name]: validatePhone(digitsOnly) }));
      }
      return;
    }
    if (name === "experience") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      setFormErrors((prev) => ({ ...prev, [name]: validateExperience(digitsOnly) }));
      return;
    }
    if (name === "email") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setFormErrors((prev) => ({ ...prev, [name]: validateEmail(value) }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubjectSelect = (option: string) => {
    setFormData((prev) => ({ ...prev, subject: option }));
    setFormErrors((prev) => ({ ...prev, subject: undefined }));
    if (option !== "Others") {
      setOthersText("");
      setOthersError(undefined);
    }
    setIsDropdownOpen(false);
  };

  const handleOthersTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setOthersText(val);
    setOthersError(val.trim() ? undefined : "Please describe your enquiry");
  };

  const contactCards = [
    {
      id: 1,
      title: "HEAD OFFICE",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      content: "2nd Floor, Landmark Plaza, 206, Satara Road, In Front Of City Pride Multiplex, Adinath Society, Parvati Paytha, Pune, Maharashtra, 411009",
      gradient: "linear-gradient(135deg, #b8860b, #daa520)",
      borderColor: "#daa520",
    },
    {
      id: 2,
      title: "USA OFFICE",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8z" />
        </svg>
      ),
      content: "Suite 400, 350 Fifth Avenue,\nNew York, NY 10118,\nUnited States of America",
      gradient: "linear-gradient(135deg, #8B6914, #c9a84c)",
      borderColor: "#c9a84c",
    },
    {
      id: 3,
      title: "WORKING HOURS",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: "Monday - Friday\n11am - 7:30pm",
      gradient: "linear-gradient(135deg, #9a7d0a, #f0c040)",
      borderColor: "#f0c040",
    },
    {
      id: 4,
      title: "LET'S TALK",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      phones: ["+91 9201958271", "+91 9201958271"],
      content: null,
      gradient: "linear-gradient(135deg, #b8860b, #ffe066)",
      borderColor: "#ffe066",
    },
    {
      id: 5,
      title: "EMAIL SUPPORT",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      emails: ["support@govindaniit.com", "official@govindaniit.org"],
      content: null,
      gradient: "linear-gradient(135deg, #c8860a, #ffd700)",
      borderColor: "#ffd700",
    },
  ];

  const isOthers = formData.subject === "Others";

  return (
    <div className={`contact-page${isModal ? " modal-mode" : ""}`}>
      {/* Animated Background */}
      <div className="bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="page-content">
        <style>{`
          .modal-mode .form-section {
            padding-top: 20px !important;
          }
          .modal-mode .form-card {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
          }
          .modal-mode .contact-page {
             background: transparent !important;
          }
        `}</style>
        {/* Header - Hidden if in modal */}
        {!isModal && (
          <section className="header-section">
            <h1
              style={{
                fontFamily: "'Baskerville','Libre Baskerville',Georgia,serif",
                fontSize: "clamp(24px, 3vw, 38px)",
                lineHeight: 1.2,
                background: "linear-gradient(135deg, #f5d87a 0%, #fff8e7 40%, #e8b84b 70%, #f5d87a 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientMove 5s ease infinite",
                marginTop: "40px",
                marginBottom: "16px",
                wordBreak: "break-word",
              }}
            >
              Seamless Communication<br />
              Global Impact
            </h1>
          </section>
        )}

        {/* FORM */}
        <section className="form-section">
          <div className="form-card relative">
            {isModal && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <h2 className="section-heading">Send us a message</h2>
            <p className="section-sub">
              Please feel free to send us any questions, enquiries or suggestions you might have.
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              {(!split || step === 1) && (
              <div className="form-step">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleInputChange}
                    placeholder="Mr./ Miss/ Mrs." inputMode="text"
                    className={`form-input${formErrors.name ? " input-error" : ""}`}
                  />
                  {formErrors.name && <p className="error-msg">{formErrors.name}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="experience" className="form-label">Experience</label>
                  <input
                    type="text" id="experience" name="experience"
                    value={formData.experience} onChange={handleInputChange}
                    placeholder="Years" inputMode="numeric" pattern="[0-9]*"
                    className={`form-input${formErrors.experience ? " input-error" : ""}`}
                  />
                  {formErrors.experience && <p className="error-msg">{formErrors.experience}</p>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone (10 digits)</label>
                  <input
                    type="tel" id="phone" name="phone"
                    value={formData.phone} onChange={handleInputChange}
                    placeholder="+91" maxLength={10} inputMode="numeric" pattern="[0-9]*"
                    className={`form-input${formErrors.phone ? " input-error" : ""}`}
                  />
                  {formErrors.phone && <p className="error-msg">{formErrors.phone}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleInputChange}
                    placeholder="admin@gmail.com"
                    className={`form-input${formErrors.email ? " input-error" : ""}`}
                  />
                  {formErrors.email && <p className="error-msg">{formErrors.email}</p>}
                </div>
              </div>

              </div>
              )}

              {(!split || step === 2) && (
              <div className="form-step">
              {/* ── Custom Animated Subject Dropdown ── */}
              <div className="form-group">
                <label className="form-label">Subject</label>
                <div
                  className={`custom-select-wrap${formErrors.subject ? " input-error" : ""}`}
                  ref={dropdownRef}
                >
                  {/* Trigger */}
                  <button
                    type="button"
                    className={`custom-select-trigger${isDropdownOpen ? " open" : ""}${formData.subject ? " has-value" : ""}`}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                  >
                    <span className={formData.subject ? "trigger-value" : "trigger-placeholder"}>
                      {formData.subject || "Enquiry for_"}
                    </span>
                    <svg
                      className={`chevron-icon${isDropdownOpen ? " rotated" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Panel */}
                  <div
                    className={`custom-select-panel${isDropdownOpen ? " panel-open" : ""}`}
                    role="listbox"
                      aria-label="Select a subject"
                  >
                    <div className="panel-inner">
                      {SUBJECT_OPTIONS.map((option) => (
                        <div
                          key={option}
                          role="option"
                          aria-selected={formData.subject === option}
                          className={`select-option${formData.subject === option ? " selected" : ""}${option === "Others" ? " option-others" : ""}`}
                          onClick={() => handleSubjectSelect(option)}
                        >
                          {option === "Others" && (
                            <svg className="others-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          )}
                          {option}
                          {formData.subject === option && (
                            <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {formErrors.subject && <p className="error-msg">{formErrors.subject}</p>}
              </div>

              {/* ── "Others" custom input ── */}
              <div className={`others-field-wrap${isOthers ? " others-visible" : ""}`}>
                <div className="form-group">
                  <label className="form-label">
                    Describe your enquiry
                    <span className="required-star"> *</span>
                  </label>
                  <textarea
                    rows={3}
                    value={othersText}
                    onChange={handleOthersTextChange}
                    placeholder="Tell us what you're looking for…"
                    className={`form-input form-textarea others-textarea${othersError ? " input-error" : ""}`}
                  />
                  {othersError && <p className="error-msg">{othersError}</p>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message" name="message" rows={5}
                  value={formData.message} onChange={handleInputChange}
                  placeholder="Message"
                  className={`form-input form-textarea${formErrors.message ? " input-error" : ""}`}
                />
                {formErrors.message && <p className="error-msg">{formErrors.message}</p>}
              </div>

              </div>
              )}

              {/* Pinned action bar — always reachable, never scrolls away. */}
              <div className={`form-actions${split ? " form-actions-sticky" : ""}`}>
                {split && (
                  <div className="step-meter" aria-hidden="true">
                    <span className={step === 1 ? "on" : "done"} />
                    <span className={step === 2 ? "on" : ""} />
                  </div>
                )}

                {split && step === 2 && (
                  <button
                    type="button"
                    className="back-btn"
                    onClick={() => setStep(1)}
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                )}

                {split && step === 1 ? (
                  <button type="button" className="submit-btn" style={{ flex: 1 }} onClick={goToStepTwo}>
                    <span>CONTINUE</span>
                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="submit-btn" style={{ flex: 1 }}>
                    <span>{isSubmitting ? "Sending..." : "SEND MESSAGE"}</span>
                    {!isSubmitting && (
                      <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                    {isSubmitting && (
                      <svg className="btn-icon spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>




        {/* GOOGLE MAP */}

      </div>

      {/* Water Drop Animation */}
      {waterDrop && (
        <div className="water-drop-wrap" style={{ left: waterDrop.x, top: waterDrop.y }}>
          <div className="water-drop-ring" />
          <div className="water-drop-ring ring-2" />
        </div>
      )}

      {/* ── SUCCESS MODAL ── */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <div className="modal-icon-wrap">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="modal-check-svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="modal-title">Message Sent!</h2>
              <p className="modal-subtitle">Thank you for contacting Govindani Infotech.</p>
            </div>
            <div className="modal-divider" />
            <div className="modal-bottom">
              <p className="modal-body">
                Our team will carefully review your message and reach out to you soon. Keep an eye on your WhatsApp and email!
              </p>
              <button className="modal-done-btn" onClick={() => setShowSuccessModal(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CENTERED ERROR TOAST ── */}
      {centerToast && (
        <div
          className={`center-toast-overlay${centerToast.visible ? " cto-visible" : ""}`}
          onClick={() => setCenterToast(null)}
        >
          <div
            className={`center-toast-box${centerToast.type === "error" ? " cto-error" : " cto-success"}${centerToast.visible ? " cto-box-visible" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cto-header">
              <div className={`cto-icon-wrap${centerToast.type === "error" ? " cto-icon-error" : " cto-icon-success"}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="26" height="26">
                  {centerToast.type === "error" ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  )}
                </svg>
              </div>
              <span className="cto-title">
                {centerToast.type === "error" ? "Form Incomplete" : "Success"}
              </span>
              <button
                className="cto-close"
                onClick={() => setCenterToast(null)}
                aria-label="Close"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="cto-divider" />

            <ul className="cto-error-list">
              {centerToast.messages.map((msg, i) => (
                <li key={i} className={`cto-error-item${i === 0 ? " cto-main-msg" : ""}`}>
                  {i > 0 && (
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      style={{ flexShrink: 0, marginTop: 2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {msg}
                </li>
              ))}
            </ul>

            <div className="cto-progress-bar">
              <div className={`cto-progress-fill${centerToast.visible ? " cto-progress-animate" : ""}`} />
            </div>
          </div>
        </div>
      )}

      <style>{`

        :root {
          --gold-light:  #ffd700;
          --gold-mid:    #daa520;
          --gold-dark:   #b8860b;
          --gold-pale:   #ffe87c;
          --white:       #ffffff;
          --off-white:   #f5f0e8;
          --black:       #000000;
          --surface:     rgba(255,255,255,0.04);
          --border:      rgba(218,165,32,0.25);
          --text-body:   rgba(245,240,232,0.82);
          --font-heading:'EB Garamond', 'Palatino Linotype', Baskerville, serif;
          --font-body:   'Inter', 'Helvetica Neue', sans-serif;
          --radius-card: 20px;
          --pad-section-v: clamp(40px, 6vw, 80px);
          --pad-h:       clamp(16px, 5vw, 64px);
        }

        .contact-page {
          min-height: auto;
          background: #000;
          color: var(--off-white);
          font-family: var(--font-body);
          position: relative;
          overflow-x: hidden;
        }

        .bg-blobs {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.12;
          animation: blobPulse 6s ease-in-out infinite alternate;
        }
        .blob-1 { width: 480px; height: 480px; background: radial-gradient(circle, #ffd700, #b8860b); top: -100px; left: -100px; animation-delay: 0s; }
        .blob-2 { width: 560px; height: 560px; background: radial-gradient(circle, #daa520, #8B6914); bottom: -120px; right: -120px; animation-delay: 2s; }
        .blob-3 { width: 360px; height: 360px; background: radial-gradient(circle, #ffe066, #b8860b); top: 45%; left: 40%; animation-delay: 4s; }
        @keyframes blobPulse {
          from { transform: scale(1) translate(0, 0); opacity: 0.10; }
          to   { transform: scale(1.15) translate(30px, -20px); opacity: 0.18; }
        }

        .page-content { position: relative; z-index: 1; }

        .form-section,
        .cards-section,
        .social-section,
        .map-section {
          padding-top:0px;
          padding-bottom: var(--pad-section-v);
          padding-left: var(--pad-h);
          padding-right: var(--pad-h);
        }

        .header-section {
          text-align: center;
          padding-top: clamp(60px, 12vw, 160px);
          padding-bottom: clamp(20px, 4vw, 40px);
        }
        .eyebrow {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: var(--gold-light);
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .section-heading {
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 400;
          color: var(--gold-light);
          margin: 0 0 8px;
          letter-spacing: 0.03em;
        }
        .section-sub {
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--text-body);
          margin: 0 0 28px;
        }

        .form-section { display: flex; justify-content: center; }
        .form-card {
          width: 100%;
          max-width: 860px;
          background: rgba(255,215,0,0.04);
          border: 1px solid rgba(218,165,32,0.3);
          border-radius: var(--radius-card);
          padding: clamp(24px, 4vw, 48px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4), inset 0 0 30px rgba(255,215,0,0.05);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        .form-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top left, rgba(255,215,0,0.08) 0%, transparent 50%);
          pointer-events: none;
        }
        .contact-form { display: flex; flex-direction: column; gap: 20px; }

        /* ---- two-step modal form ---------------------------------- */
        .modal-mode .contact-form { min-height: 0; }
        .modal-mode .form-step {
          flex: 1 1 auto; min-height: 0; overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          display: flex; flex-direction: column; gap: 20px;
          padding-bottom: 4px;
        }
        .form-actions { display: flex; align-items: center; gap: 12px; margin-top: 4px; }
        .form-actions-sticky {
          position: sticky; bottom: 0; z-index: 4; margin-top: 0;
          padding: 14px 0 calc(14px + env(safe-area-inset-bottom, 0px));
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 22%);
          border-top: 1px solid rgba(212,175,55,0.18);
        }
        .back-btn {
          flex: 0 0 auto; padding: 14px 20px; border-radius: 999px;
          border: 1px solid rgba(212,175,55,0.4); background: transparent;
          color: #d4af37; font-size: 0.8rem; font-weight: 700;
          letter-spacing: 0.08em; cursor: pointer;
          transition: background 0.2s ease;
        }
        .back-btn:hover:not(:disabled) { background: rgba(212,175,55,0.12); }
        .back-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .step-meter { display: flex; gap: 5px; flex: 0 0 auto; }
        .step-meter span {
          display: block; width: 22px; height: 3px; border-radius: 999px;
          background: rgba(255,255,255,0.16); transition: background 0.25s ease;
        }
        .step-meter span.on { background: #d4af37; }
        .step-meter span.done { background: rgba(212,175,55,0.5); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-label {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          color: var(--gold-mid);
          letter-spacing: 0.04em;
        }
        .required-star { color: #ef4444; }
        .form-input {
          background: rgba(0,0,0,0.45);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px 16px;
          color: var(--white);
          font-family: var(--font-body);
          font-size: 14px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .form-input::placeholder { color: rgba(218,165,32,0.4); }
        .form-input:focus { 
          border-color: var(--gold-light); 
          box-shadow: 0 0 0 3px rgba(255,215,0,0.2), inset 0 0 10px rgba(255,215,0,0.05); 
          transform: translateY(-2px); 
          background: rgba(0,0,0,0.6);
        }
        .form-input.input-error { border-color: #ef4444; }
        .form-textarea { resize: none; }
        .error-msg { font-family: var(--font-body); font-size: 12px; color: #ef4444; margin: 0; }

        /* ══════════════════════════════════════════
           CUSTOM SELECT / DROPDOWN
        ══════════════════════════════════════════ */
        .custom-select-wrap {
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }
        .custom-select-wrap.input-error .custom-select-trigger {
          border-color: #ef4444;
        }

        .custom-select-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          background: rgba(0,0,0,0.45);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px 16px;
          color: var(--white);
          font-family: var(--font-body);
          font-size: 14px;
          cursor: pointer;
          outline: none;
          text-align: left;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .custom-select-trigger:hover {
          border-color: rgba(218,165,32,0.55);
          background: rgba(0,0,0,0.6);
        }
        .custom-select-trigger:focus,
        .custom-select-trigger.open {
          border-color: var(--gold-light);
          box-shadow: 0 0 0 3px rgba(255,215,0,0.2), inset 0 0 10px rgba(255,215,0,0.05);
          transform: translateY(-2px);
          background: rgba(0,0,0,0.6);
        }

        .trigger-placeholder { color: rgba(218,165,32,0.35); }
        .trigger-value { color: var(--white); }

        .chevron-icon {
          width: 16px;
          height: 16px;
          color: var(--gold-mid);
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .chevron-icon.rotated { transform: rotate(180deg); }

        .custom-select-panel {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          z-index: 999;
          background: #0d0d00;
          border: 1px solid rgba(218,165,32,0.35);
          border-radius: 12px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,215,0,0.06);
          overflow: hidden;
          opacity: 0;
          transform: translateY(-8px) scaleY(0.95);
          transform-origin: top center;
          pointer-events: none;
          transition:
            opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.22s cubic-bezier(0.34, 1.2, 0.64, 1);
        }
        .custom-select-panel.panel-open {
          opacity: 1;
          transform: translateY(0) scaleY(1);
          pointer-events: auto;
        }

        .panel-inner {
          max-height: 280px;
          overflow-y: auto;
          padding: 6px;
          scrollbar-width: thin;
          scrollbar-color: rgba(218,165,32,0.3) transparent;
        }
        .panel-inner::-webkit-scrollbar { width: 4px; }
        .panel-inner::-webkit-scrollbar-thumb { background: rgba(218,165,32,0.3); border-radius: 4px; }
        .panel-inner::-webkit-scrollbar-track { background: transparent; }

        .select-option {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 8px;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--text-body);
          cursor: pointer;
          transition: background 0.15s, color 0.15s, padding-left 0.2s;
          user-select: none;
          position: relative;
        }
        .select-option:hover {
          background: rgba(255,215,0,0.08);
          color: var(--gold-light);
          padding-left: 18px;
        }
        .select-option.selected {
          background: rgba(255,215,0,0.12);
          color: var(--gold-light);
          font-weight: 500;
        }
        .select-option.option-others {
          border-top: 1px solid rgba(218,165,32,0.15);
          margin-top: 4px;
          padding-top: 12px;
          color: var(--gold-mid);
        }
        .select-option.option-others:hover { color: var(--gold-light); }

        .others-icon { width: 14px; height: 14px; flex-shrink: 0; opacity: 0.7; }
        .check-icon { width: 14px; height: 14px; color: var(--gold-light); margin-left: auto; flex-shrink: 0; }

        /* ══════════════════════════════════════════
           "OTHERS" FIELD
        ══════════════════════════════════════════ */
        .others-field-wrap {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition:
            grid-template-rows 0.38s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.28s ease,
            margin 0.38s ease;
          margin-top: -10px;
          margin-bottom: -10px;
        }
        .others-field-wrap > .form-group { overflow: hidden; min-height: 0; }
        .others-field-wrap.others-visible {
          grid-template-rows: 1fr;
          opacity: 1;
          margin-top: 0;
          margin-bottom: 0;
        }
        .others-textarea { resize: vertical; min-height: 80px; }

        /* ══════════════════════════════════════════
           SUBMIT BUTTON
        ══════════════════════════════════════════ */
        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 32px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          background: linear-gradient(90deg, #b8860b 0%, #ffd700 50%, #daa520 100%);
          background-size: 200% auto;
          color: #000;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.08em;
          transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
          box-shadow: 0 8px 30px rgba(218,165,32,0.35);
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 16px 40px rgba(255,215,0,0.48), 0 0 30px rgba(255,215,0,0.3), inset 0 0 15px rgba(255,255,255,0.4);
          background-position: right center;
        }
        .submit-btn:active:not(:disabled) { transform: translateY(-1px) scale(0.99); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-icon { width: 20px; height: 20px; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 600px) {
          .submit-btn {
            padding: 12px 24px;
            font-size: 14px;
          }
        }

        /* ══════════════════════════════════════════
           CARDS
        ══════════════════════════════════════════ */
        .cards-section { max-width: 1400px; margin: 0 auto; box-sizing: border-box; }
        .cards-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; }
        @media (max-width: 1100px) { .cards-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 700px) { .cards-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 420px) { .cards-grid { grid-template-columns: 1fr; } }

        .contact-card {
          position: relative;
          background: rgba(255,215,0,0.035);
          border: 1px solid var(--border);
          border-radius: var(--radius-card);
          padding: 24px 20px 28px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          backdrop-filter: blur(6px);
        }
        .contact-card:hover { transform: translateY(-8px); border-color: var(--card-border, var(--gold-mid)); box-shadow: 0 16px 40px rgba(218,165,32,0.22); }
        .card-icon-wrap { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.3s; transform: rotate(-10deg); }
        .contact-card:hover .card-icon-wrap { transform: rotate(0deg) scale(1.08); }
        .card-heading { font-family: var(--font-heading); font-size: 18px; font-weight: 400; color: var(--gold-light); margin: 0; letter-spacing: 0.04em; }
        .card-body { font-family: var(--font-body); font-size: 13px; color: var(--text-body); line-height: 1.65; margin: 0; white-space: pre-line; flex-grow: 1; }
        .card-links { display: flex; flex-direction: column; gap: 6px; flex-grow: 1; }
        .card-link { font-family: var(--font-body); font-size: 13px; color: var(--text-body); text-decoration: none; transition: color 0.2s; word-break: break-all; }
        .card-link:hover { color: var(--gold-light); text-decoration: underline; }
        .card-bar { position: absolute; bottom: 0; left: 0; height: 3px; width: 0; transition: width 0.5s ease; }
        .contact-card:hover .card-bar { width: 100%; }

        /* ══════════════════════════════════════════
           SOCIAL
        ══════════════════════════════════════════ */
        .social-section { text-align: center; }
        .social-row { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
        .social-btn { width: 56px; height: 56px; border-radius: 50%; background: rgba(255,215,0,0.06); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; }
        .social-btn:hover { background: rgba(255,215,0,0.15); border-color: var(--gold-light); transform: scale(1.12) translateY(-4px); box-shadow: 0 8px 20px rgba(218,165,32,0.3); }
        .social-icon { width: 24px; height: 24px; color: var(--gold-mid); transition: color 0.2s; }
        .social-btn:hover .social-icon { color: var(--gold-light); }

        /* ══════════════════════════════════════════
           MAP
        ══════════════════════════════════════════ */
        .map-section { display: flex; justify-content: center; }
        .map-wrapper { width: 100%; max-width: 1280px; border-radius: var(--radius-card); overflow: hidden; border: 1px solid var(--border); box-shadow: 0 10px 40px rgba(218,165,32,0.2); }

        /* ══════════════════════════════════════════
           WATER DROP
        ══════════════════════════════════════════ */
        .water-drop-wrap { position: fixed; pointer-events: none; z-index: 50; transform: translate(-50%, -50%); }
        .water-drop-ring { position: absolute; top: 50%; left: 50%; border: 2px solid rgba(255,215,0,0.5); border-radius: 50%; opacity: 0; animation: ripple 1s ease-out forwards; transform: translate(-50%, -50%); }
        .ring-2 { animation-delay: 0.2s; border-color: rgba(218,165,32,0.4); }
        @keyframes ripple { 0% { width: 0; height: 0; opacity: 1; } 100% { width: 80px; height: 80px; opacity: 0; } }

        /* ══════════════════════════════════════════
           SUCCESS MODAL
        ══════════════════════════════════════════ */
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: fadeInOverlay 0.25s ease;
        }
        @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }

        .modal-box {
          width: 100%;
          max-width: 440px;
          background: linear-gradient(160deg, #1a1400 0%, #0d0d00 60%, #1a1000 100%);
          border: 1px solid rgba(218,165,32,0.35);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(255,215,0,0.08), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(184,134,11,0.15);
          animation: modalPop 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes modalPop { from { opacity: 0; transform: scale(0.85) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

        .modal-top { padding: 36px 32px 28px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; }
        .modal-icon-wrap { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #2a1f00, #3d2e00); border: 2px solid rgba(218,165,32,0.5); display: flex; align-items: center; justify-content: center; margin-bottom: 8px; box-shadow: 0 0 24px rgba(218,165,32,0.2); }
        .modal-check-svg { width: 34px; height: 34px; color: #daa520; }
        .modal-title { font-family: 'EB Garamond', 'Palatino Linotype', Baskerville, serif; font-size: 26px; font-weight: 700; color: #fff; margin: 0; letter-spacing: 0.01em; }
        .modal-subtitle { font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(245,240,232,0.7); margin: 0; }
        .modal-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(218,165,32,0.3), transparent); margin: 0 24px; }
        .modal-bottom { padding: 28px 32px 32px; display: flex; flex-direction: column; align-items: center; gap: 24px; text-align: center; }
        .modal-body { font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.7; color: rgba(245,240,232,0.75); margin: 0; }
        .modal-done-btn { width: 100%; padding: 16px 32px; border-radius: 50px; border: none; cursor: pointer; background: linear-gradient(90deg, #c8922a 0%, #ffd700 50%, #c8922a 100%); background-size: 200% auto; color: #000; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 0.04em; transition: all 0.3s ease; box-shadow: 0 8px 24px rgba(218,165,32,0.35); }
        .modal-done-btn:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255,215,0,0.45); }

        @media (max-width: 480px) {
          .modal-box { border-radius: 20px; }
          .modal-top { padding: 28px 20px 20px; }
          .modal-bottom { padding: 20px 20px 28px; }
          .modal-title { font-size: 22px; }
          .modal-icon-wrap { width: 60px; height: 60px; }
          .modal-check-svg { width: 28px; height: 28px; }
        }

        /* ══════════════════════════════════════════
           CENTERED ERROR TOAST
        ══════════════════════════════════════════ */
        .center-toast-overlay {
          position: fixed;
          inset: 0;
          z-index: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: rgba(0, 0, 0, 0);
          backdrop-filter: blur(0px);
          transition: background 0.3s ease, backdrop-filter 0.3s ease;
          pointer-events: none;
        }
        .center-toast-overlay.cto-visible {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          pointer-events: auto;
        }

        .center-toast-box {
          width: 100%;
          max-width: 440px;
          border-radius: 22px;
          overflow: hidden;
          opacity: 0;
          transform: scale(0.88) translateY(16px);
          transition: opacity 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }
        .center-toast-box.cto-box-visible {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .cto-error {
            background: linear-gradient(135deg,  #000 100% ) !important;
          border: 2px solid #c8922a;
          box-shadow:
            0 0 0 1px rgba(239, 68, 68, 0.08),
            0 24px 64px rgba(0, 0, 0, 0.75),
            0 0 50px rgba(239, 68, 68, 0.08);
        }
        .cto-success {
          background: linear-gradient(160deg, #001a08 0%, #000d05 60%, #001a08 100%);
          border: 1px solid rgba(218, 165, 32, 0.4);
          box-shadow:
            0 0 0 1px rgba(218, 165, 32, 0.08),
            0 24px 64px rgba(0, 0, 0, 0.75),
            0 0 50px rgba(218, 165, 32, 0.08);
        }

        .cto-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 20px 16px;
        }
        .cto-icon-wrap {
          width: 46px;
          height: 46px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cto-icon-error {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #f87171;
        }
        .cto-icon-success {
          background: rgba(218, 165, 32, 0.12);
          border: 1px solid rgba(218, 165, 32, 0.35);
          color: #ffd700;
        }
        .cto-title {
          font-family: 'EB Garamond', 'Palatino Linotype', Baskerville, serif;
          font-size: 19px;
          font-weight: 700;
          color: #fff;
          flex: 1;
          letter-spacing: 0.01em;
        }
        .cto-close {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(245, 240, 232, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .cto-close:hover {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.35);
        }

        .cto-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.28), transparent);
          margin: 0 18px;
        }
        .cto-success .cto-divider {
          background: linear-gradient(90deg, transparent, rgba(218, 165, 32, 0.28), transparent);
        }

        .cto-error-list {
          list-style: none;
          margin: 0;
          padding: 16px 20px 14px;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .cto-error-item {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          color: rgba(245, 240, 232, 0.68);
          line-height: 1.5;
        }
        .cto-main-msg {
          font-size: 14.5px;
          font-weight: 600;
          color: rgba(245, 240, 232, 0.92);
          margin-bottom: 4px;
          display: block;
        }
        .cto-error-item svg { color: #f87171; }

        .cto-progress-bar {
          height: 3px;
          background: rgba(255, 255, 255, 0.05);
          margin-top: 6px;
        }
        .cto-progress-fill {
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, #991b1b, #ef4444, #f97316);
          transform-origin: left;
          transform: scaleX(1);
        }
        .cto-progress-fill.cto-progress-animate {
          animation: shrinkBar 4s linear forwards;
        }
        @keyframes shrinkBar {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (min-width: 601px) and (max-width: 1024px) {
          .cards-grid { grid-template-columns: repeat(3, 1fr); }
          .form-card { padding: 32px 28px; }
        }
        @media (min-width: 1800px) {
          .cards-grid { max-width: 1600px; margin: 0 auto; }
          .form-card { padding: 56px 64px; }
        }
        .contact-page section:first-of-type { margin-top: 0px !important; padding-top: 0 !important; }

        @keyframes gradientMove {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default ContactUsForm;