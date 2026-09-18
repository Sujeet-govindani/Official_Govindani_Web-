import { useState, useEffect } from "react";
import { Shield, Award, CreditCard, Key, Check, ShoppingCart, CreditCard as PayIcon, Truck, ArrowRight, Sparkles } from "lucide-react";

/* ─── ANIMATED MOBILE SCREENS ─── */
const HomeScreen = ({ active }) => (
  <div className={`absolute inset-0 transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
    {/* Header */}
    <div className="flex items-center justify-between px-4 pt-3 pb-2">
      <div className="w-20 h-2.5 bg-amber-400 rounded-full" />
      <div className="flex gap-1.5">
        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center"><ShoppingCart size={10} className="text-gray-500" /></div>
      </div>
    </div>
    {/* Banner */}
    <div className="mx-3 mt-2 h-24 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex flex-col items-center justify-center shadow-md">
      <p className="text-white text-[9px] font-bold tracking-wide">WELCOME TO YOUR STORE</p>
      <p className="text-white text-[7px] mt-0.5 opacity-80">Handpicked just for you</p>
    </div>
    {/* Category pills */}
    <div className="flex gap-2 px-3 mt-3">
      {["All", "Fashion", "Electronics", "Home"].map((c, i) => (
        <span key={i} className={`text-[7px] px-2.5 py-0.5 rounded-full font-semibold ${i === 0 ? "bg-amber-400 text-white" : "bg-gray-100 text-gray-500"}`}>{c}</span>
      ))}
    </div>
    {/* Product grid */}
    <div className="grid grid-cols-2 gap-2 px-3 mt-2">
      {[
        { name: "Leather Bag", price: "₹1,299", color: "from-amber-100 to-amber-200" },
        { name: "Sneakers", price: "₹2,499", color: "from-blue-100 to-blue-200" },
        { name: "Watch", price: "₹3,999", color: "from-rose-100 to-rose-200" },
        { name: "Jacket", price: "₹4,199", color: "from-emerald-100 to-emerald-200" },
      ].map((p, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
          <div className={`h-16 bg-gradient-to-br ${p.color} flex items-center justify-center`}>
            <div className="w-8 h-8 bg-white/60 rounded-lg" />
          </div>
          <div className="p-1.5">
            <p className="text-[7px] font-semibold text-gray-700">{p.name}</p>
            <p className="text-[7px] font-bold text-amber-600">{p.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CartScreen = ({ active }) => (
  <div className={`absolute inset-0 transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
    <div className="px-4 pt-3">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center">←</div>
        <p className="text-[9px] font-bold text-gray-800">Your Cart</p>
        <span className="ml-auto bg-amber-400 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full">2 items</span>
      </div>
    </div>
    {/* Cart items */}
    <div className="mx-3 mt-3 space-y-2">
      {[
        { name: "Leather Bag", price: "₹1,299", color: "bg-amber-100" },
        { name: "Sneakers", price: "₹2,499", color: "bg-blue-100" },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-lg p-2 shadow-sm">
          <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`}>
            <div className="w-5 h-5 bg-white/70 rounded" />
          </div>
          <div className="flex-1">
            <p className="text-[8px] font-semibold text-gray-700">{item.name}</p>
            <p className="text-[7px] text-gray-400">Qty: 1</p>
          </div>
          <p className="text-[8px] font-bold text-amber-600">{item.price}</p>
        </div>
      ))}
    </div>
    {/* Summary */}
    <div className="mx-3 mt-4 bg-gray-50 rounded-lg p-2.5 border border-gray-100">
      <div className="flex justify-between"><span className="text-[7px] text-gray-500">Subtotal</span><span className="text-[7px] font-semibold">₹3,798</span></div>
      <div className="flex justify-between mt-1"><span className="text-[7px] text-gray-500">Shipping</span><span className="text-[7px] text-green-600 font-semibold">FREE</span></div>
      <div className="border-t border-gray-200 mt-1.5 pt-1.5 flex justify-between"><span className="text-[8px] font-bold text-gray-700">Total</span><span className="text-[8px] font-bold text-amber-600">₹3,798</span></div>
    </div>
    {/* CTA */}
    <div className="mx-3 mt-3">
      <div className="bg-amber-400 text-white text-center text-[8px] font-bold py-2.5 rounded-lg shadow-md">
        Proceed to Checkout →
      </div>
    </div>
  </div>
);

const CheckoutScreen = ({ active }) => (
  <div className={`absolute inset-0 transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
    <div className="px-4 pt-3">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center">←</div>
        <p className="text-[9px] font-bold text-gray-800">Checkout</p>
      </div>
      {/* Progress bar */}
      <div className="flex items-center gap-1 mt-2.5">
        {["Shipping", "Payment", "Review"].map((s, i) => (
          <div key={i} className="flex items-center gap-1 flex-1">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[6px] font-bold ${i <= 1 ? "bg-amber-400 text-white" : "bg-gray-200 text-gray-500"}`}>{i + 1}</div>
            <p className={`text-[6px] ${i <= 1 ? "text-amber-600 font-semibold" : "text-gray-400"}`}>{s}</p>
            {i < 2 && <div className={`flex-1 h-0.5 mx-0.5 rounded ${i === 0 ? "bg-amber-400" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>
    </div>
    {/* Address */}
    <div className="mx-3 mt-3 bg-white border border-gray-200 rounded-lg p-2.5">
      <p className="text-[7px] font-bold text-gray-700 mb-1"> Delivery Address</p>
      <p className="text-[7px] text-gray-500">123 Main Street, Mumbai 400001</p>
    </div>
    {/* Payment */}
    <div className="mx-3 mt-2 bg-white border border-amber-300 rounded-lg p-2.5">
      <p className="text-[7px] font-bold text-gray-700 mb-1.5">💳 Payment Method</p>
      <div className="space-y-1.5">
        {[
          { label: "UPI", sub: "Pay via BHIM / PhonePe", selected: true },
          { label: "Credit Card", sub: "Visa / Mastercard", selected: false },
          { label: "Cash on Delivery", sub: "Pay at doorstep", selected: false },
        ].map((m, i) => (
          <div key={i} className={`flex items-center gap-2 p-1.5 rounded ${m.selected ? "bg-amber-50 border border-amber-300" : "border border-gray-100"}`}>
            <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${m.selected ? "border-amber-400" : "border-gray-300"}`}>
              {m.selected && <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />}
            </div>
            <div><p className="text-[7px] font-semibold text-gray-700">{m.label}</p><p className="text-[6px] text-gray-400">{m.sub}</p></div>
          </div>
        ))}
      </div>
    </div>
    {/* Pay button */}
    <div className="mx-3 mt-3">
      <div className="bg-amber-400 text-white text-center text-[8px] font-bold py-2.5 rounded-lg shadow-md flex items-center justify-center gap-1">
        <PayIcon size={9} /> Pay ₹3,798 Now
      </div>
    </div>
  </div>
);

const PaymentSuccessScreen = ({ active }) => (
  <div className={`absolute inset-0 transition-all duration-500 ${active ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
    <div className="flex flex-col items-center justify-center h-full px-4">
      {/* Success circle */}
      <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg ${active ? "animate-bounce-once" : ""}`}>
        <Check size={40} className="text-white" strokeWidth={3} />
      </div>
      <p className="text-[11px] font-bold text-gray-800 mt-4">Payment Successful!</p>
      <p className="text-[7px] text-gray-500 mt-1">Order #ORD-2024-9847</p>
      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-2.5 w-full text-center">
        <p className="text-[7px] text-green-700 font-semibold">₹3,798 charged via UPI</p>
        <p className="text-[6px] text-green-500 mt-0.5">Transaction ID: UPI-482910</p>
      </div>
      <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2 w-full text-center">
        <p className="text-[7px] text-amber-700 font-semibold">🚚 Estimated Delivery</p>
        <p className="text-[7px] font-bold text-amber-600">Within 2-3 business days</p>
      </div>
    </div>
  </div>
);

const DeliveryScreen = ({ active }) => (
  <div className={`absolute inset-0 transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
    <div className="px-4 pt-3">
      <p className="text-[9px] font-bold text-gray-800 text-center">📦 Track Your Order</p>
    </div>
    {/* Tracking map placeholder */}
    <div className="mx-3 mt-2 h-28 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-lg flex items-center justify-center relative overflow-hidden border border-emerald-200">
      {/* Fake map grid lines */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(4)].map((_, i) => (
          <div key={`h${i}`} className="absolute w-full h-px bg-emerald-400" style={{ top: `${25 * (i + 1)}%` }} />
        ))}
        {[...Array(4)].map((_, i) => (
          <div key={`v${i}`} className="absolute h-full w-px bg-emerald-400" style={{ left: `${25 * (i + 1)}%` }} />
        ))}
      </div>
      {/* Route */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 112">
        <path d="M20,90 Q60,90 80,60 T140,30" stroke="#f59e0b" strokeWidth="3" fill="none" strokeDasharray="6 3" />
      </svg>
      {/* Delivery pin */}
      <div className="absolute" style={{ top: "18%", left: "62%" }}>
        <div className="w-6 h-6 bg-amber-400 rounded-full border-2 border-white shadow-md flex items-center justify-center animate-pulse">
          <Truck size={11} className="text-white" />
        </div>
      </div>
      {/* Destination */}
      <div className="absolute" style={{ top: "70%", left: "15%" }}>
        <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>
    </div>
    {/* Timeline */}
    <div className="mx-3 mt-3 space-y-2">
      {[
        { label: "Order Placed", time: "10:30 AM", done: true },
        { label: "Payment Confirmed", time: "10:31 AM", done: true },
        { label: "Packed & Dispatched", time: "11:45 AM", done: true },
        { label: "Out for Delivery", time: "Now", done: true, active: true },
        { label: "Delivered", time: "Expected 2:00 PM", done: false },
      ].map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0 ${s.done ? (s.active ? "bg-amber-400" : "bg-green-500") : "bg-gray-200"}`}>
            {s.done && <Check size={7} className="text-white" strokeWidth={3} />}
          </div>
          <div className="flex-1"><p className={`text-[7px] font-semibold ${s.active ? "text-amber-600" : s.done ? "text-gray-700" : "text-gray-400"}`}>{s.label}</p></div>
          <p className={`text-[6px] ${s.active ? "text-amber-500 font-bold" : "text-gray-400"}`}>{s.time}</p>
        </div>
      ))}
    </div>
  </div>
);

/* ─── STEP LABELS FOR MOBILE ANIMATION ─── */
const steps = ["Home", "Cart", "Checkout", "Payment", "Delivery"];

/* ─── MAIN HERO SECTION ─── */
const HeroSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const durations = [3200, 2800, 3500, 3000, 3500]; // ms per screen

  useEffect(() => {
    let stepTimer;
    let progTimer;

    const startStep = () => {
      setProgress(0);
      progTimer = setInterval(() => setProgress(p => {
        if (p >= 100) { clearInterval(progTimer); return 100; }
        return p + (100 / (durations[currentStep] / 60));
      }), 60);

      stepTimer = setTimeout(() => {
        setCurrentStep(prev => (prev + 1) % steps.length);
      }, durations[currentStep]);
    };

    startStep();
    return () => { clearTimeout(stepTimer); clearInterval(progTimer); };
  }, [currentStep]);

  const trustBadges = [
    { icon: Shield, label: "Trusted" },
    { icon: Award, label: "100 Yrs Legacy" },
    { icon: CreditCard, label: "UPI Secure" },
    { icon: Key, label: "100% Ownership" },
  ];

  const painPoints = [
    "Platform commissions eating your profits?",
    "Dependent on marketplaces you don't control?",
    "Hidden charges appearing every month?",
    "No real ownership of your customer data?",
  ];

  const claims = [
    "No mark-up charges",
    "No percentage fee",
    "No dependency",
    "Everything will be yours",
    "One-time cost only",
    "No monthly subscription",
  ];

  return (
    <section
      className="relative min-h-screen pb-12 overflow-hidden bg-black ecommerce-hero-section"
      style={{
        fontFamily: "var(--font-body)"
      }}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(#D4AF37 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Ambient gold glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-[0.07]"
        style={{ background: "#D4AF37" }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-[0.05]"
        style={{ background: "#F5E6D3" }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" style={{ maxWidth: "1200px" }}>

        {/* ─── MOBILE-FIRST LAYOUT ─── */}
        <div className="lg:hidden">

          {/* Mobile Hero Content */}
          <div className="space-y-5">

            {/* Phone Mockup */}
            <div className="flex justify-center py-4" style={{ marginTop: "100px" }}>
              <div className="relative">
                {/* Glow behind phone */}
                <div className="absolute inset-0 rounded-3xl blur-2xl" style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.2) 0%, transparent 70%)", transform: "scale(1.2)" }} />

                {/* Phone frame */}
                <div className="relative" style={{ width: "220px" }}>
                  <div className="rounded-[2.3rem] p-2 shadow-2xl" style={{ background: "linear-gradient(170deg, #2a2a2a, #1a1a1a, #111)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="rounded-[1.8rem] overflow-hidden relative" style={{ background: "#f5f5f5", height: "440px" }}>
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-2xl z-20" style={{ background: "#1e1e1e" }} />

                      {/* Screen content */}
                      <div className="relative w-full h-full">
                        <HomeScreen active={currentStep === 0} />
                        <CartScreen active={currentStep === 1} />
                        <CheckoutScreen active={currentStep === 2} />
                        <PaymentSuccessScreen active={currentStep === 3} />
                        <DeliveryScreen active={currentStep === 4} />
                      </div>
                    </div>
                  </div>

                  {/* Step indicator dots */}
                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    {steps.map((label, i) => (
                      <div
                        key={i}
                        className="rounded-full transition-all duration-500"
                        style={{
                          width: i === currentStep ? "20px" : "5px",
                          height: "5px",
                          background: i === currentStep ? "linear-gradient(90deg, #f59e0b, #fbbf24)" : "rgba(255,255,255,0.2)",
                          boxShadow: i === currentStep ? "0 0 8px rgba(245,158,11,0.5)" : "none",
                        }}
                      />
                    ))}
                  </div>

                  {/* Current step label */}
                  <div className="mt-1.5 text-center">
                    <p className="text-amber-400 text-[9px] font-bold tracking-wider uppercase">{steps[currentStep]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Headline Section */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
                <Sparkles size={12} className="text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-[10px] font-bold tracking-wide">YOUR BUSINESS, YOUR WAY</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black leading-[1.15] text-white px-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Stop Losing Money to <br />
                <span style={{ background: "linear-gradient(135deg, #D4AF37, #F5E6D3, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Platform Fees
                </span>
              </h1>

              <p className="text-gray-400 text-sm px-4 max-w-md mx-auto leading-relaxed">
                Build your own e-commerce store. Keep 100% of your profits. No commissions, ever.
              </p>
            </div>

            {/* Value Props - Compact grid */}
            <div className="grid grid-cols-2 gap-2 px-2 max-w-sm mx-auto">
              {claims.map((claim, i) => (
                <div key={i} className="flex items-start gap-1.5 p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}>
                    <Check size={8} className="text-amber-400" strokeWidth={3} />
                  </div>
                  <span className="text-gray-300 text-[10px] font-medium leading-tight">{claim}</span>
                </div>
              ))}
            </div>

            {/* Trust badges - Horizontal scroll on mobile */}
            <div className="flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide">
              <div className="flex gap-2 min-w-max">
                {trustBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-2 rounded-full whitespace-nowrap" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <badge.icon size={13} className="text-amber-400" />
                    <span className="text-gray-400 text-[11px] font-medium">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ─── DESKTOP LAYOUT ─── */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT PHONE MOCKUP */}
          <div className="flex justify-start">
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 rounded-3xl blur-2xl" style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.18) 0%, transparent 70%)", transform: "scale(1.15)" }} />

              {/* Phone frame */}
              <div className="relative" style={{ width: "260px" }}>
                <div className="rounded-[2.8rem] p-2.5 shadow-2xl" style={{ background: "linear-gradient(170deg, #2a2a2a, #1a1a1a, #111)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="rounded-[2.2rem] overflow-hidden relative" style={{ background: "#f5f5f5", height: "520px" }}>
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 rounded-b-2xl z-20" style={{ background: "#1e1e1e" }} />

                    {/* Screen content */}
                    <div className="relative w-full h-full">
                      <HomeScreen active={currentStep === 0} />
                      <CartScreen active={currentStep === 1} />
                      <CheckoutScreen active={currentStep === 2} />
                      <PaymentSuccessScreen active={currentStep === 3} />
                      <DeliveryScreen active={currentStep === 4} />
                    </div>
                  </div>
                </div>

                {/* Step indicator dots */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  {steps.map((label, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className="rounded-full transition-all duration-500"
                        style={{
                          width: i === currentStep ? "28px" : "8px",
                          height: "8px",
                          background: i === currentStep ? "linear-gradient(90deg, #f59e0b, #fbbf24)" : "rgba(255,255,255,0.15)",
                          boxShadow: i === currentStep ? "0 0 10px rgba(245,158,11,0.4)" : "none",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Current step label + progress */}
                <div className="mt-2 text-center">
                  <p className="text-amber-400 text-[11px] font-bold tracking-wider uppercase">{steps[currentStep]}</p>
                  {/* Progress bar */}
                  <div className="mx-auto mt-1.5 rounded-full overflow-hidden" style={{ width: "120px", height: "2px", background: "rgba(255,255,255,0.1)" }}>
                    <div className="h-full rounded-full transition-all duration-100" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #f59e0b, #fbbf24)" }} />
                  </div>
                </div>

                {/* Caption */}
                <p className="text-center mt-4 text-sm font-bold" style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Your store. Your rules. Your profits.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-7">
            {/* Headline */}
            <div>
              <h1 className="text-4xl xl:text-[54px] font-black leading-[1.1] text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Your audience is <br />
                <span style={{ background: "linear-gradient(135deg, #D4AF37, #F5E6D3, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Always worried…
                </span>
              </h1>
            </div>

            {/* Pain points */}
            <div className="space-y-2.5">
              {painPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5" style={{ animation: `fadeSlideIn 0.5s ease ${i * 0.1}s both` }}>
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-[10px]">✕</span>
                  </span>
                  <span className="text-gray-400 text-base">{point}</span>
                </div>
              ))}
            </div>

            {/* Solution block */}
            <div className="rounded-xl p-4" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(245,158,11,0.03))", border: "1px solid rgba(245,158,11,0.2)" }}>
              <h2 className="text-2xl font-bold text-white leading-tight">
                Sell everything you want on{" "}
                <span style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  your own website.
                </span>
              </h2>
              <p className="text-gray-500 text-sm mt-1.5">100% ownership · Zero commissions · One-time investment</p>
            </div>

            {/* Claims grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {claims.map((claim, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}>
                    <Check size={10} className="text-amber-400" strokeWidth={3} />
                  </div>
                  <span className="text-gray-300 text-[13px]">{claim}</span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <badge.icon size={13} className="text-amber-400" />
                  <span className="text-gray-400 text-[11px] font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ecommerce-hero-section {
          padding-top: 80px !important;
          min-height: auto !important;
        }
        @media (min-width: 768px) {
          .ecommerce-hero-section {
            padding-top: clamp(120px, 10vw, 160px) !important;
          }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-once {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-bounce-once { animation: bounce-once 0.6s ease-out; }
        .text-gradient-gold {
          background: linear-gradient(135deg, #D4AF37 0%, #F5E6D3 50%, #D4AF37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;