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


const GiveSetuTermsOfService = () => {
  return (
    <LegalLayout title="GiveSetu Terms of Service">
      <p>Last Updated: November 14, 2026</p>
      <p>
        These terms apply to the GiveSetu / NGO OS platform, its APIs and the &ldquo;NGO OS Embed&rdquo;
        WordPress plugin. They sit alongside, not instead of, our website terms at{" "}
        <a href="/terms-of-service">govindaniit.com/terms-of-service</a>.
      </p>

      <h2>1. Who These Terms Are With</h2>
      <p>GiveSetu is operated by Govindani Infotech Private Limited (CIN U74909MP2023PTC069020), registered office MIG 82, C-Sector, BDA Colony Shahpura, Shivaji Nagar, Huzur, Bhopal 462016; principal place of business Row House 8/B, Sunita Niwas, 1st floor, Anant Jyoti Society, Sahakar Nagar No. 1, Parvati, Pune 411009. &ldquo;We&rdquo; and &ldquo;us&rdquo; mean that company; &ldquo;you&rdquo; means the organisation holding the account.</p>

      <h2>2. Who May Hold an Account</h2>
      <p>GiveSetu is for registered nonprofit organisations &mdash; trusts, societies and Section 8 companies &mdash; and their authorised staff. You confirm that you are authorised to bind your organisation and that the registration, 80G and, where relevant, FCRA details you give us are accurate and current.</p>

      <h2>3. The Service</h2>
      <p>We provide a hosted platform for publishing cases and campaigns, collecting donations, issuing receipts and 80G certificates, running a donor portal, and embedding those pages into your own website through the WordPress plugin or our APIs. The service is provided on a subscription, and which features you may use depends on your plan.</p>

      <h2>4. Free Trial</h2>
      <p>We may offer a free trial. During it you get access as if you were on the trial&rsquo;s plan, with no payment and no obligation to continue. We set and may change the trial&rsquo;s length and what it includes. When it ends, access to paid features stops unless you take a paid plan; your data is kept as described in section 10. There is no trial logic in the WordPress plugin &mdash; the trial lives entirely on our platform.</p>

      <h2>5. Fees, Renewal and Refunds</h2>
      <p>Fees are those shown on your plan at the time you subscribe, exclusive of GST and other taxes, which you pay in addition. Subscriptions renew for the same term unless cancelled before the renewal date. We will give at least thirty days&rsquo; notice of a price change, effective from your next renewal.</p>
      <p>Fees already paid are <strong>not refundable</strong> except where the law requires it, or where we have failed to provide the service and cannot put it right in a reasonable time. Cancelling stops the next renewal; it does not refund the current term.</p>

      <h2>6. Donations and Money</h2>
      <p><strong>We never hold your donation funds.</strong> Payments are collected by our payment gateway and settled directly to your own bank account under your own arrangement with that gateway, subject to its terms. We are not a party to the donation and we are not a payment system operator.</p>
      <p>You are responsible for the lawfulness of your fundraising, for the accuracy of what you publish about a case or campaign, for issuing correct receipts and 80G certificates, and for meeting your tax and regulatory obligations, including FCRA where foreign contributions are involved.</p>

      <h2>7. Your Donors&rsquo; Data</h2>
      <p>For donor data you are the data fiduciary and we are your processor. We process it only to run the service and on your instructions. You are responsible for telling your donors how their data is handled and for having a lawful basis to collect it. Our <a href="/givesetu/privacy-policy">GiveSetu Privacy Policy</a> sets out what we do with it.</p>

      <h2>8. Acceptable Use</h2>
      <p>Do not use GiveSetu to solicit funds fraudulently or for a cause you misrepresent; to break any law of India or of a donor&rsquo;s country; to upload malware, or content you have no right to use; to attempt to access another organisation&rsquo;s data; to probe, overload or interfere with the platform; or to resell the service without our written agreement.</p>
      <p>We may suspend an account immediately where we reasonably believe this section is being broken, or where a payment gateway, regulator or court requires it.</p>

      <h2>9. The WordPress Plugin</h2>
      <p>The &ldquo;NGO OS Embed&rdquo; plugin is distributed free under the GNU General Public License version 2 or later. That licence governs the plugin code, and nothing in these terms limits your rights under it. The plugin requires a connected GiveSetu account to show anything; those rights to the <strong>service</strong> are governed by these terms.</p>

      <h2>10. Suspension, Termination and Your Data</h2>
      <p>Either of us may end the subscription at the end of its term by notice. We may terminate immediately for a material breach not fixed within fifteen days of our notice.</p>
      <p>For <strong>sixty days</strong> after termination you may export your data through the platform or by asking us. After that we may delete it, except records we must keep for tax or legal reasons &mdash; see the Privacy Policy for retention periods.</p>

      <h2>11. Availability and Support</h2>
      <p>We aim to keep GiveSetu available at all times but do not guarantee uninterrupted service. We may take it down for maintenance, with notice where we reasonably can. Support channels and response times depend on your plan.</p>

      <h2>12. Intellectual Property</h2>
      <p>The platform, its software and its content are ours and stay ours. You keep everything you publish through it, and you grant us the licence needed to host, display and deliver it while you use the service.</p>

      <h2>13. Liability</h2>
      <p>Nothing here excludes liability that cannot lawfully be excluded, including for fraud or for death or personal injury caused by negligence.</p>
      <p>Otherwise, neither of us is liable for indirect or consequential loss, or for loss of profit, revenue, goodwill or donations, and our total liability for any claim is limited to the fees you paid us in the twelve months before the claim arose.</p>

      <h2>14. Indemnity</h2>
      <p>You will indemnify us against claims arising from your fundraising, the content you publish, your breach of section 8, or your failure to meet your obligations to your donors or regulators.</p>

      <h2>15. Changes</h2>
      <p>We may change these terms. Material changes will be notified to account holders by email at least thirty days before they take effect. Continuing to use the service after that means you accept them.</p>

      <h2>16. Governing Law</h2>
      <p>These terms are governed by the law of India. The courts at Pune, Maharashtra have exclusive jurisdiction, except that either of us may seek urgent injunctive relief anywhere.</p>

      <h2>17. Contact</h2>
      <p>
        Govindani Infotech Private Limited
        <br />
        Row House 8/B, Sunita Niwas, 1st floor, Anant Jyoti Society, Sahakar Nagar No. 1, Parvati, Pune 411009, India
        <br />
        <strong>Email:</strong> support@govindaniit.org
        <br />
        <strong>Phone:</strong> +91 92019 58274
      </p>
    </LegalLayout>
  );
};

export default GiveSetuTermsOfService;
