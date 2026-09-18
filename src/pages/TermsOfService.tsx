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

const TermsOfService = () => {
  return (
    <LegalLayout title="Terms of Service">
      <p>Last Updated: May 8, 2026</p>
      
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
      </p>

      <h2>2. Intellectual Property</h2>
      <p>
        The website and its original content, features, and functionality are owned by Govindani Infotech Pvt. Ltd. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
      </p>

      <h2>3. User Obligations</h2>
      <p>
        You agree to use the website only for lawful purposes. You are prohibited from:
      </p>
      <ul>
        <li>Violating any applicable laws or regulations.</li>
        <li>Posting or transmitting any unauthorized or unsolicited advertising or promotional materials.</li>
        <li>Engaging in any conduct that restricts or inhibits any other user from using or enjoying the website.</li>
        <li>Attempting to interfere with the proper working of the website.</li>
      </ul>

      <h2>4. Termination</h2>
      <p>
        We may terminate your access to the website, without cause or notice, which may result in the forfeiture and destruction of all information associated with you. All provisions of this Agreement that by their nature should survive termination shall survive termination.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        In no event shall Govindani Infotech Pvt. Ltd., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
      </p>

      <h2>6. Governing Law</h2>
      <p>
        These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at:
        <br />
        <strong>Email:</strong> support@govindaniit.org
      </p>
    </LegalLayout>
  );
};

export default TermsOfService;
