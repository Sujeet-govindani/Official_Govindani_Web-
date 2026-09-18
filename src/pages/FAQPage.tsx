import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { organizationSchema, createFAQSchema } from '@/seo/schema';

const allFAQs = [
  // General
  {
    category: "General",
    question: "What services does Govindani Infotech offer?",
    answer: "Govindani Infotech offers a comprehensive suite of digital services including NGO website development, donation platform creation, WhatsApp Business API integration, social media marketing, Google Ads management, Meta Ads, SEO services, web development, mobile app development, CRM development, e-commerce development, virtual tours, AI automation, video editing, photography, and graphic design."
  },
  {
    category: "General",
    question: "Where is Govindani Infotech located?",
    answer: "Govindani Infotech is headquartered in Pune, Maharashtra, India. We serve clients across India, USA, UK, and UAE with both remote and on-site services."
  },
  {
    category: "General",
    question: "How can I contact Govindani Infotech?",
    answer: "You can contact us via phone at +91-9201958271, email at sujeet@govindaniit.org, or through our website contact form. We also offer WhatsApp support for quick inquiries."
  },
  {
    category: "General",
    question: "What makes Govindani Infotech different from other agencies?",
    answer: "We specialize in NGO digital transformation with 900+ websites engineered — 550 of them for non-profits — and ₹1100+ crore processed. Our key differentiators include built-in compliance (80G, FCRA, GST), end-to-end solutions, transparent pricing, and dedicated support. We don't just build websites — we build digital infrastructure."
  },

  // NGO & Donation
  {
    category: "NGO & Donation",
    question: "How much does an NGO website cost in India?",
    answer: "NGO website costs range from ₹15,000 for basic sites to ₹2,00,000+ for custom donation platforms. At Govindani Infotech, specialized NGO websites start from ₹25,000, including 80G compliance, donation integration, donor management, and WhatsApp automation."
  },
  {
    category: "NGO & Donation",
    question: "Do you provide 80G compliant donation platforms?",
    answer: "Yes, we specialize in 80G compliant donation platforms. Our platforms automatically generate 80G receipts, support FCRA reporting, integrate with Razorpay/PayU/CCAvenue, and include donor management CRM."
  },
  {
    category: "NGO & Donation",
    question: "Can I accept international donations?",
    answer: "Yes, our platforms support international donations through Stripe, PayPal, and bank transfers. We ensure FCRA compliance for foreign contributions and support multi-currency transactions."
  },
  {
    category: "NGO & Donation",
    question: "How do you help NGOs raise more donations?",
    answer: "We implement proven strategies including: optimized donation flows, recurring giving options, WhatsApp engagement campaigns, social media marketing, Google Ad Grants (₹1 crore free ads for eligible NGOs), and impact storytelling."
  },
  {
    category: "NGO & Donation",
    question: "What is FCRA compliance?",
    answer: "FCRA (Foreign Contribution Regulation Act) is mandatory for Indian NGOs receiving foreign donations. Our platforms help you track foreign contributions, generate required reports, and maintain compliance."
  },

  // WhatsApp
  {
    category: "WhatsApp Solutions",
    question: "What is WhatsApp Business API?",
    answer: "WhatsApp Business API is a professional messaging solution for businesses to send automated messages, build chatbots, create catalogs, and manage customer interactions at scale. It's different from the free WhatsApp Business app and supports high-volume messaging."
  },
  {
    category: "WhatsApp Solutions",
    question: "How much does WhatsApp Business API cost?",
    answer: "WhatsApp Business API costs include: Government fees (₹0.50/conversation), BSP charges (varies by provider), and setup costs. At Govindani Infotech, setup packages start from ₹15,000 including chatbot development."
  },
  {
    category: "WhatsApp Solutions",
    question: "Can I send bulk messages on WhatsApp?",
    answer: "Yes, with WhatsApp Business API you can send bulk messages to opted-in users. This includes promotional messages, notifications, and marketing campaigns. We help you set up compliant bulk messaging."
  },
  {
    category: "WhatsApp Solutions",
    question: "How do WhatsApp chatbots work?",
    answer: "WhatsApp chatbots automate customer interactions using AI and pre-defined flows. They can answer FAQs, qualify leads, process orders, and provide 24/7 support. Our chatbots are customized for your specific business needs."
  },
  {
    category: "WhatsApp Solutions",
    question: "Can WhatsApp integrate with my existing CRM?",
    answer: "Yes, we integrate WhatsApp with Salesforce, HubSpot, Zoho, and custom CRMs. This creates a unified customer communication platform."
  },

  // Digital Marketing
  {
    category: "Digital Marketing",
    question: "How much does digital marketing cost?",
    answer: "Digital marketing costs vary: SEO starts from ₹8,000/month, Google Ads from ₹10,000/month + ad spend, Meta Ads from ₹15,000/month + ad spend, social media marketing from ₹8,000/month. We provide customized packages based on your goals."
  },
  {
    category: "Digital Marketing",
    question: "How long does SEO take to show results?",
    answer: "SEO is a long-term strategy. Initial improvements appear in 3-6 months, with significant results in 6-12 months. We focus on sustainable growth that compounds over time."
  },
  {
    category: "Digital Marketing",
    question: "What results can I expect from Google Ads?",
    answer: "Results vary by industry, but our clients typically see 3-5x ROAS (Return on Ad Spend). We optimize campaigns weekly and provide detailed reports on impressions, clicks, conversions, and cost per acquisition."
  },
  {
    category: "Digital Marketing",
    question: "Do you create ad creatives and content?",
    answer: "Yes, our creative team designs ad creatives, videos, social media content, and landing pages. We A/B test different variations to maximize performance."
  },
  {
    category: "Digital Marketing",
    question: "How do you measure marketing ROI?",
    answer: "We track KPIs including traffic, leads, conversions, cost per lead, customer acquisition cost, and lifetime value. Monthly reports show clear ROI and optimization recommendations."
  },

  // Web Development
  {
    category: "Web Development",
    question: "What technologies do you use?",
    answer: "We use modern technologies: React, Next.js, WordPress, Node.js, PHP, and Python. The choice depends on your requirements, budget, and scalability needs."
  },
  {
    category: "Web Development",
    question: "How long does website development take?",
    answer: "Basic websites: 2-3 weeks. Custom web applications: 6-12 weeks. E-commerce stores: 4-8 weeks. We follow agile development with regular updates."
  },
  {
    category: "Web Development",
    question: "Do you provide website maintenance?",
    answer: "Yes, we offer maintenance packages from ₹2,000/month including security updates, content changes, performance optimization, and technical support."
  },
  {
    category: "Web Development",
    question: "Will my website be mobile-responsive?",
    answer: "Absolutely! All our websites are fully responsive and optimized for mobile, tablet, and desktop. We follow a mobile-first design approach."
  },
  {
    category: "Web Development",
    question: "Do you build e-commerce websites?",
    answer: "Yes, we build custom e-commerce websites with Shopify, WooCommerce, or custom solutions. Features include product catalogs, payment integration, inventory management, and marketplace listing."
  },

  // Pricing & Process
  {
    category: "Pricing & Process",
    question: "How do I get started?",
    answer: "Contact us for a free consultation. We'll discuss your requirements, provide a detailed proposal, and once approved, start your project. Call +91-9201958271 or email sujeet@govindaniit.org."
  },
  {
    category: "Pricing & Process",
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, UPI, credit/debit cards, and PayPal. For large projects, we offer milestone-based payment plans."
  },
  {
    category: "Pricing & Process",
    question: "Do you offer refunds?",
    answer: "We offer a satisfaction guarantee. If you're not happy with our work, we'll revise until you're satisfied. For specific terms, please refer to our service agreement."
  },
  {
    category: "Pricing & Process",
    question: "Can I get a free consultation?",
    answer: "Yes! We offer free 30-minute consultations to discuss your requirements and provide recommendations. No sales pressure — just honest advice."
  },
  {
    category: "Pricing & Process",
    question: "Do you work with international clients?",
    answer: "Yes, we serve clients across India, USA, UK, and UAE. We work across time zones and offer flexible communication schedules."
  },
];

const faqSchema = createFAQSchema(allFAQs.map(faq => ({
  question: faq.question,
  answer: faq.answer
})));

const categories = [...new Set(allFAQs.map(f => f.category))];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFAQs = selectedCategory === 'All' 
    ? allFAQs 
    : allFAQs.filter(f => f.category === selectedCategory);

  return (
    <>
      <SEO
        title="Frequently Asked Questions | Govindani Infotech"
        description="Find answers to common questions about NGO website development, WhatsApp Business API, digital marketing, pricing, and process at Govindani Infotech."
        canonical="https://govindaniit.com/faq"
        keywords="FAQ, frequently asked questions, NGO website cost, WhatsApp API pricing, digital marketing cost, web development FAQ"
        schema={[organizationSchema, faqSchema]}
      />

      <div className="min-h-screen bg-[#060b13] text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to know about our services, pricing, and process. 
              Can't find what you're looking for? Contact us directly.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-yellow-500 text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 mb-16">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-yellow-400 transform transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Still Have Questions?</h3>
            <p className="text-gray-400 mb-6">
              Our team is here to help. Get a free consultation and let us answer all your questions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact-us" className="px-8 py-3 bg-yellow-500 text-black rounded-full font-bold hover:bg-yellow-400 transition">
                Get Free Consultation
              </Link>
              <a href="https://wa.me/919201958278?text=Hi!%20I%20have%20a%20question" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-500 transition">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
