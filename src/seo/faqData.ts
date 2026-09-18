import { createFAQSchema } from './schema';

export const serviceFAQs = {
  websiteDevelopment: createFAQSchema([
    {
      question: "How much does website development cost in India?",
      answer: "Website development costs in India range from ₹15,000 for basic brochure sites to ₹5,00,000+ for custom web applications. At Govindani Infotech, we offer custom website development starting from ₹25,000, including responsive design, SEO optimization, and CMS integration."
    },
    {
      question: "How long does it take to build a website?",
      answer: "A basic website takes 2-3 weeks, while a custom web application with complex features takes 6-12 weeks. At Govindani Infotech, we follow an agile development process with regular updates, ensuring on-time delivery."
    },
    {
      question: "Do you provide ongoing website maintenance?",
      answer: "Yes, Govindani Infotech offers comprehensive website maintenance packages including security updates, content changes, performance optimization, and technical support. Our plans start from ₹2,000/month."
    },
    {
      question: "What technologies do you use for website development?",
      answer: "We use modern technologies including React, Next.js, WordPress, Node.js, and PHP. The choice depends on your specific requirements, budget, and scalability needs."
    },
    {
      question: "Will my website be mobile-responsive?",
      answer: "Absolutely! All websites built by Govindani Infotech are fully responsive and optimized for mobile devices, tablets, and desktops. We follow a mobile-first design approach."
    }
  ]),

  ngoWebsite: createFAQSchema([
    {
      question: "How much does an NGO website cost in India?",
      answer: "NGO website costs in India range from ₹15,000 for basic sites to ₹2,00,000+ for custom donation platforms. At Govindani Infotech, we offer specialized NGO websites starting from ₹25,000, including 80G compliance, donation integration, and donor management."
    },
    {
      question: "Do you provide 80G compliant donation platforms?",
      answer: "Yes, Govindani Infotech specializes in building 80G compliant donation platforms. Our platforms automatically generate 80G receipts, support FCRA reporting, and integrate with multiple payment gateways including Razorpay, PayU, and CCAvenue."
    },
    {
      question: "Can I accept international donations on my NGO website?",
      answer: "Yes, our donation platforms support international donations through Stripe, PayPal, and bank transfers. We also ensure FCRA compliance for foreign contributions."
    },
    {
      question: "How do I manage donors and donations?",
      answer: "Our NGO websites come with a built-in donor management system (CRM) that tracks donations, generates reports, sends thank-you emails, and manages donor communication. You can access it from anywhere through a secure dashboard."
    },
    {
      question: "Can you integrate WhatsApp for donor engagement?",
      answer: "Yes, we integrate WhatsApp Business API for automated donation confirmations, thank-you messages, campaign updates, and donor engagement. This significantly improves donor retention."
    }
  ]),

  whatsappBusiness: createFAQSchema([
    {
      question: "What is WhatsApp Business API?",
      answer: "WhatsApp Business API is a professional messaging solution that allows businesses to send automated messages, build chatbots, create product catalogs, and manage customer interactions at scale. Unlike the free WhatsApp Business app, the API supports high-volume messaging and integrations."
    },
    {
      question: "How much does WhatsApp Business API cost in India?",
      answer: "WhatsApp Business API costs vary based on usage. Government fees start from ₹0.50 per conversation. At Govindani Infotech, we offer setup packages starting from ₹15,000 including chatbot development and integration."
    },
    {
      question: "Can I send bulk messages on WhatsApp?",
      answer: "Yes, with WhatsApp Business API you can send bulk messages to opted-in users. This includes promotional messages, notifications, and marketing campaigns. We help you set up compliant bulk messaging campaigns."
    },
    {
      question: "How do I create a WhatsApp chatbot?",
      answer: "Govindani Infotech builds custom WhatsApp chatbots that handle customer queries, qualify leads, process orders, and provide 24/7 support. Our chatbots use AI and can be customized for your specific business needs."
    },
    {
      question: "Can WhatsApp integrate with my CRM?",
      answer: "Yes, we integrate WhatsApp with popular CRMs like Salesforce, HubSpot, Zoho, and custom systems. This allows you to manage all customer conversations from one place."
    }
  ]),

  socialMediaMarketing: createFAQSchema([
    {
      question: "How much does social media marketing cost in India?",
      answer: "Social media marketing costs in India range from ₹10,000/month for basic management to ₹1,00,000+/month for comprehensive strategies. At Govindani Infotech, our packages start from ₹8,000/month including content creation, scheduling, and analytics."
    },
    {
      question: "Which social media platform is best for my business?",
      answer: "The best platform depends on your audience: Instagram for visual brands and youth, LinkedIn for B2B, Facebook for local businesses, YouTube for video content. We help you choose and execute the right strategy."
    },
    {
      question: "How often should I post on social media?",
      answer: "We recommend 3-5 posts per week on Instagram, 1-2 posts on LinkedIn, and daily stories. Consistency is key. Our team manages your content calendar to ensure regular, engaging posts."
    },
    {
      question: "Do you create social media content?",
      answer: "Yes, Govindani Infotech provides complete social media content creation including graphics, videos, reels, stories, and copywriting. Our creative team ensures your brand stands out."
    },
    {
      question: "How do I measure social media ROI?",
      answer: "We provide detailed analytics reports tracking reach, engagement, follower growth, website traffic, and conversions. Our monthly reports show clear ROI and recommendations for improvement."
    }
  ]),

  googleAds: createFAQSchema([
    {
      question: "How much do Google Ads cost in India?",
      answer: "Google Ads costs depend on your industry and competition. Average CPC in India ranges from ₹5-₹50. At Govindani Infotech, we manage budgets from ₹10,000/month, ensuring maximum ROI through optimized campaigns."
    },
    {
      question: "How long does it take to see results from Google Ads?",
      answer: "You can see initial results within 1-2 weeks. However, optimal performance typically takes 3-6 months of continuous optimization. We provide weekly reports to track progress."
    },
    {
      question: "What types of Google Ads do you manage?",
      answer: "We manage Search Ads, Display Ads, Shopping Ads, Video Ads (YouTube), App Ads, and Performance Max campaigns. Our team creates strategies based on your business goals."
    },
    {
      question: "Do you provide landing page design with Google Ads?",
      answer: "Yes, we create high-converting landing pages optimized for your Google Ads campaigns. This significantly improves Quality Score and reduces cost per conversion."
    },
    {
      question: "How do I track Google Ads performance?",
      answer: "We set up Google Analytics, conversion tracking, and call tracking. You receive weekly reports with impressions, clicks, conversions, cost per conversion, and ROAS metrics."
    }
  ]),

  seo: createFAQSchema([
    {
      question: "How much do SEO services cost in India?",
      answer: "SEO costs in India range from ₹5,000/month for basic optimization to ₹50,000+/month for competitive industries. At Govindani Infotech, our SEO packages start from ₹8,000/month with guaranteed results."
    },
    {
      question: "How long does SEO take to show results?",
      answer: "SEO is a long-term strategy. You can see initial improvements in 3-6 months, with significant results in 6-12 months. We focus on sustainable growth that compounds over time."
    },
    {
      question: "What SEO services do you provide?",
      answer: "We provide technical SEO, on-page optimization, content marketing, link building, local SEO, and SEO audits. Our comprehensive approach covers all aspects of search engine optimization."
    },
    {
      question: "Do you guarantee first page rankings?",
      answer: "We guarantee measurable improvements in rankings, traffic, and conversions. While no one can guarantee specific rankings (Google's algorithm changes), our proven strategies consistently deliver results."
    },
    {
      question: "How do you measure SEO success?",
      answer: "We track keyword rankings, organic traffic, conversions, domain authority, backlink quality, and page speed. Monthly reports show clear progress and ROI."
    }
  ]),

  metaAds: createFAQSchema([
    {
      question: "What is the minimum budget for Meta Ads?",
      answer: "You can start Meta Ads with as little as ₹400/day. However, for meaningful results, we recommend a minimum monthly budget of ₹15,000-₹30,000. Govindani Infotech optimizes your budget for maximum ROI."
    },
    {
      question: "What results can I expect from Meta Ads?",
      answer: "Results vary by industry, but our clients typically see 3-5x ROAS (Return on Ad Spend). We focus on conversion-optimized campaigns that drive real business results, not just likes and followers."
    },
    {
      question: "Do you create ad creatives?",
      answer: "Yes, our creative team designs eye-catching ad creatives, videos, and carousel ads. We also A/B test different creatives to find what works best for your audience."
    },
    {
      question: "How do you target the right audience?",
      answer: "We use detailed audience targeting including demographics, interests, behaviors, custom audiences, and lookalike audiences. Our data-driven approach ensures your ads reach the right people."
    },
    {
      question: "Can you run ads for NGOs?",
      answer: "Yes, we specialize in NGO advertising on Meta platforms. We help NGOs run donation campaigns, awareness drives, and volunteer recruitment ads with optimized budgets."
    }
  ]),

  crmDevelopment: createFAQSchema([
    {
      question: "What is a CRM system?",
      answer: "CRM (Customer Relationship Management) is a system that manages your interactions with customers and prospects. It tracks leads, automates follow-ups, and provides insights to improve sales and customer service."
    },
    {
      question: "How much does custom CRM development cost?",
      answer: "Custom CRM development costs range from ₹50,000 to ₹5,00,000+ depending on features. At Govindani Infotech, we build tailored CRM solutions starting from ₹75,000."
    },
    {
      question: "Can you integrate CRM with WhatsApp?",
      answer: "Yes, we integrate CRM systems with WhatsApp Business API for automated messaging, lead capture, and customer communication. This creates a seamless workflow."
    },
    {
      question: "What industries do you build CRM for?",
      answer: "We build CRM systems for hotels, car wash businesses, construction companies, NGOs, real estate, healthcare, and more. Each CRM is customized for the specific industry needs."
    }
  ]),

  ecommerce: createFAQSchema([
    {
      question: "How much does e-commerce website development cost?",
      answer: "E-commerce website development costs range from ₹30,000 for basic stores to ₹5,00,000+ for custom platforms. At Govindani Infotech, we offer e-commerce solutions starting from ₹40,000."
    },
    {
      question: "Which platform is best for my online store?",
      answer: "The best platform depends on your needs: Shopify for simplicity, WooCommerce for WordPress users, custom for unique requirements. We help you choose and build the right solution."
    },
    {
      question: "Do you provide product photography?",
      answer: "Yes, Govindani Infotech offers professional product photography services for e-commerce. We create high-quality product images that boost conversions."
    },
    {
      question: "Can you list my products on Amazon/Flipkart?",
      answer: "Yes, we provide marketplace listing services including product optimization, SEO, and advertising on Amazon, Flipkart, Meesho, and other platforms."
    }
  ]),

  virtualTour: createFAQSchema([
    {
      question: "What is a virtual tour?",
      answer: "A virtual tour is a 360-degree interactive experience that allows users to explore a space remotely. It's like Google Street View but for interiors, perfect for real estate, hotels, and tourism."
    },
    {
      question: "How much does a virtual tour cost?",
      answer: "Virtual tour costs in India range from ₹5,000 to ₹50,000 per property depending on size and features. Govindani Infotech offers affordable virtual tour packages starting from ₹8,000."
    },
    {
      question: "What equipment is needed for a virtual tour?",
      answer: "We use professional 360-degree cameras and software to create virtual tours. No special equipment is needed on the viewer's end - they work on any device with a web browser."
    },
    {
      question: "Can virtual tours help sell properties faster?",
      answer: "Yes, studies show that listings with virtual tours get 87% more views and sell 32% faster. Virtual tours help buyers make decisions without visiting in person."
    }
  ]),

  digitalMarketing: createFAQSchema([
    {
      question: "What digital marketing services do you offer?",
      answer: "Govindani Infotech offers comprehensive digital marketing including SEO, Google Ads, Meta Ads, social media marketing, content marketing, email marketing, and WhatsApp marketing."
    },
    {
      question: "How much does digital marketing cost?",
      answer: "Digital marketing costs vary based on services and scope. Basic packages start from ₹15,000/month. We provide customized solutions based on your budget and goals."
    },
    {
      question: "How do I know if digital marketing is working?",
      answer: "We provide detailed monthly reports with KPIs like traffic, leads, conversions, and ROI. You'll see exactly what's working and where we're optimizing."
    },
    {
      question: "Do you work with small businesses?",
      answer: "Yes, we work with businesses of all sizes, from startups to enterprises. Our scalable solutions fit any budget while delivering real results."
    }
  ]),
};
