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
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent)] pointer-events-none" />
            
            <div className="legal-content">
                {children}
            </div>
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Privacy Policy">
      <p>Last Updated: May 8, 2026</p>
      
      <h2>1. Introduction</h2>
      <p>
        At Govindani Infotech Pvt. Ltd., we respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        We collect several types of information from and about users of our website, including:
      </p>
      <ul>
        <li>Personal identification information (Name, email address, phone number, etc.)</li>
        <li>Information about your internet connection, the equipment you use to access our website, and usage details.</li>
        <li>Data provided through forms (Contact Us, Newsletter Subscription).</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>
        We use information that we collect about you or that you provide to us, including any personal information:
      </p>
      <ul>
        <li>To present our website and its contents to you.</li>
        <li>To provide you with information, products, or services that you request from us.</li>
        <li>To fulfill any other purpose for which you provide it.</li>
        <li>To notify you about changes to our website or any products or services we offer.</li>
        <li>To improve our website and services.</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls.
      </p>

      <h2>5. Disclosure of Your Information</h2>
      <p>
        We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
      </p>

      <h2>6. Changes to Our Privacy Policy</h2>
      <p>
        It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the website home page.
      </p>

      <h2>7. Contact Information</h2>
      <p>
        To ask questions or comment about this privacy policy and our privacy practices, contact us at: 
        <br />
        <strong>Email:</strong> support@govindaniit.org
        <br />
        <strong>Phone:</strong> +91 92019 58271
      </p>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
