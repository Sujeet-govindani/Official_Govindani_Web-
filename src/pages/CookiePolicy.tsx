import React from "react";

const LegalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-inter">
      <style>{`
        .legal-content h2 {
          font-family: 'Libre Baskerville', serif;
          color: #d4af37;
          font-size: 1.75rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          border-left: 4px solid #d4af37;
          padding-left: 1rem;
        }
        .legal-content p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
          margin-bottom: 1.5rem;
          font-size: 1rem;
        }
        .legal-content ul {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .legal-content li {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
          margin-bottom: 0.5rem;
          list-style-type: disc;
        }
        .gold-gradient-text {
          background: linear-gradient(135deg, #fff 0%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .font-baskerville {
          font-family: 'Libre Baskerville', serif;
        }
      `}</style>
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-baskerville mb-6 gold-gradient-text">
            {title}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto opacity-50" />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <div className="bg-[#111] border border-[rgba(212,175,55,0.1)] rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent)] pointer-events-none" />
            
            <div className="legal-content">
                {children}
            </div>
        </div>
      </div>
    </div>
  );
};

const CookiePolicy = () => {
  return (
    <LegalLayout title="Cookie Policy">
      <p>Last Updated: May 8, 2026</p>
      
      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>
        We use cookies for several reasons:
      </p>
      <ul>
        <li><strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off in our systems.</li>
        <li><strong>Performance Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
        <li><strong>Functional Cookies:</strong> These enable the website to provide enhanced functionality and personalization.</li>
        <li><strong>Targeting Cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads on other sites.</li>
      </ul>

      <h2>3. Third-Party Cookies</h2>
      <p>
        In some cases, we use cookies provided by trusted third parties. This site uses Google Analytics for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit.
      </p>

      <h2>4. Managing Cookies</h2>
      <p>
        Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline">www.allaboutcookies.org</a>.
      </p>

      <h2>5. Changes to This Cookie Policy</h2>
      <p>
        We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        If you have any questions about our use of cookies or other technologies, please email us at:
        <br />
        <strong>Email:</strong> support@govindaniit.org
      </p>
    </LegalLayout>
  );
};

export default CookiePolicy;
