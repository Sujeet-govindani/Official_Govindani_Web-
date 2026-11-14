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
        .legal-content h3 {
          color: #e8c860;
          font-size: 1.15rem;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
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
        .legal-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }
        .legal-content th, .legal-content td {
          border: 1px solid rgba(212, 175, 55, 0.2);
          padding: 0.75rem;
          text-align: left;
          color: rgba(255, 255, 255, 0.8);
          vertical-align: top;
        }
        .legal-content th { color: #d4af37; font-weight: 600; }
        .legal-content a { color: #d4af37; text-decoration: underline; }
        .gold-gradient-text {
          background: linear-gradient(135deg, #fff 0%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-baskerville mb-6 gold-gradient-text">
            {title}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto opacity-50" />
        </div>
      </div>

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

const GiveSetuPrivacyPolicy = () => {
  return (
    <LegalLayout title="GiveSetu Privacy Policy">
      <p>Last Updated: November 14, 2026</p>
      <p>
        This policy applies to the GiveSetu / NGO OS platform &mdash; its donation pages, donor portal,
        APIs and the &ldquo;NGO OS Embed&rdquo; WordPress plugin. Our general website privacy policy at{" "}
        <a href="/privacy-policy">govindaniit.com/privacy-policy</a> governs visits to this website and
        does not replace this one.
      </p>

      <h2>1. Who We Are</h2>
      <p>GiveSetu is a product of Govindani Infotech Private Limited (CIN U74909MP2023PTC069020), registered office MIG 82, C-Sector, BDA Colony Shahpura, Shivaji Nagar, Huzur, Bhopal 462016; principal place of business Row House 8/B, Sunita Niwas, 1st floor, Anant Jyoti Society, Sahakar Nagar No. 1, Parvati, Pune 411009. &ldquo;We&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; mean that company.</p>

      <h2>2. The Two Roles We Play</h2>
      <p>Read this section first; everything else follows from it.</p>
      <ul>
        <li><strong>As data fiduciary</strong> &mdash; for the nonprofit organisations that hold GiveSetu accounts, and for the people at those organisations who sign in. We decide how that data is handled.</li>
        <li><strong>As data processor</strong> &mdash; for <strong>donor data</strong>. When a donor gives to a nonprofit through GiveSetu, that nonprofit is the data fiduciary for the donor. We process donor data only on the nonprofit&rsquo;s instructions and only to run the service. Donors wanting their data corrected or erased should approach the nonprofit they donated to; we will help that nonprofit act on the request.</li>
      </ul>

      <h2>3. What We Collect</h2>
      <h3>From nonprofit account holders</h3>
      <p>Organisation name, registration and tax identifiers (including 80G and FCRA details where provided), contact names, email addresses, phone numbers, billing details, the content you publish (cases, campaigns, images, forms), and sign-in and audit records.</p>
      <h3>From donors, on behalf of the nonprofit</h3>
      <p>Name, email address, phone number, postal address where given, donation amount and currency, PAN where required for an 80G receipt, donation and receipt numbers, payment status and the payment reference returned by our payment gateway, subscription and membership records, and any message or dedication the donor adds.</p>
      <h3>Automatically</h3>
      <p>IP address, browser and device information, pages viewed and timestamps &mdash; for security, fraud prevention and service reliability.</p>
      <p>
        <strong>We never collect or store card numbers, CVVs, UPI PINs, net-banking credentials or any
        other payment instrument credential.</strong> Those go directly to our payment gateway and never
        reach our systems.
      </p>

      <h2>4. The WordPress Plugin Specifically</h2>
      <p>The &ldquo;NGO OS Embed&rdquo; plugin connects a nonprofit&rsquo;s WordPress site to its GiveSetu account.</p>
      <ul>
        <li>Each embed is an iframe pointing at a page on that organisation&rsquo;s own GiveSetu donate domain. The visitor&rsquo;s browser loads it directly, so the usual request data &mdash; IP address, user agent, referrer &mdash; reaches us when a page containing an embed is viewed.</li>
        <li>The plugin sends us the site&rsquo;s address, its integration client identifier, a signed credential, and the identifier of the item being embedded.</li>
        <li><strong>No donor name or contact detail is written into the WordPress database.</strong> The plugin mirrors only event identifiers, donation and receipt numbers, amounts and timestamps, so the site owner can see what happened. That table is deleted when the plugin is uninstalled.</li>
        <li>Where the donor portal is enabled, sign-in requests are forwarded from the site&rsquo;s own server to us. The donor&rsquo;s tokens stay on that server and the browser receives only a session cookie.</li>
      </ul>

      <h2>5. Why We Process It</h2>
      <p>To provide the service and make donations work; to generate receipts and 80G certificates; to send transactional messages about a donation, receipt or membership; to take payment; to meet legal and tax obligations; to keep the service secure and prevent fraud; to support our customers; and to improve the product using aggregated, non-identifying information.</p>
      <p>We do not sell personal data. We do not use donor data for our own marketing, and we do not share one nonprofit&rsquo;s donor data with another.</p>

      <h2>6. Who Else Processes It</h2>
      <table>
        <thead><tr><th>Processor</th><th>Purpose</th><th>Data involved</th></tr></thead>
        <tbody>
          <tr><td>Razorpay Software Private Limited</td><td>Payment collection and settlement</td><td>Donation amount, donor contact details, payment identifiers</td></tr>
          <tr><td>Our hosting and infrastructure providers</td><td>Running the platform</td><td>All platform data, encrypted at rest and in transit</td></tr>
          <tr><td>Meta Platforms (WhatsApp Business)</td><td>Transactional messaging, where enabled</td><td>Donor phone number and message content</td></tr>
          <tr><td>Our email and SMS delivery providers</td><td>Receipts and notifications</td><td>Donor name, email address, phone number</td></tr>
        </tbody>
      </table>
      <p>Each is bound to use the data only to provide its service to us. Payment data handled by Razorpay is governed by its own policy at <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer">razorpay.com/privacy</a>.</p>

      <h2>7. Where Data Is Stored</h2>
      <p>Platform data is stored on servers located in India. Some processors above may process data outside India; where they do, we rely on their contractual commitments to protect it.</p>

      <h2>8. How Long We Keep It</h2>
      <p>Donation, receipt and tax records for eight years, as Indian tax law requires. Nonprofit account data for the life of the account and twelve months after it closes. Security and access logs for twelve months. A nonprofit may ask us to delete donor records earlier, except where we must keep them for tax or legal reasons.</p>

      <h2>9. Your Rights</h2>
      <p>If you hold a GiveSetu account, you may ask us to give you a copy of your data, correct it, erase it, or nominate someone to act for you if you cannot. Write to the address in section 12 and we will respond within thirty days.</p>
      <p>If you are a <strong>donor</strong>, contact the nonprofit you donated to. They decide what happens to their donor records; we act on their instructions.</p>

      <h2>10. Security</h2>
      <p>Credentials and secrets are encrypted at rest. All traffic runs over TLS. Webhook deliveries are signed and verified. Access to production data is restricted to staff who need it and is logged. No system is perfectly secure, but we will notify affected customers and the relevant authority of a personal data breach as the law requires.</p>

      <h2>11. Children</h2>
      <p>GiveSetu is not directed at children, and we do not knowingly collect their personal data. If you believe a child&rsquo;s data has reached us, contact us and we will delete it.</p>

      <h2>12. Contact and Grievances</h2>
      <p>
        <strong>Grievance Officer:</strong> Sujeet Govindani, Founder &amp; CEO
        <br />
        <strong>Email:</strong> support@govindaniit.org
        <br />
        <strong>Phone:</strong> +91 92019 58274
        <br />
        <strong>Post:</strong> Govindani Infotech Private Limited, Row House 8/B, Sunita Niwas, 1st floor, Anant Jyoti Society, Sahakar Nagar No. 1, Parvati, Pune 411009, India
      </p>

      <h2>13. Changes</h2>
      <p>We will post any change here and update the date at the top. Material changes will be notified to account holders by email at least fourteen days before they take effect.</p>
    </LegalLayout>
  );
};

export default GiveSetuPrivacyPolicy;
