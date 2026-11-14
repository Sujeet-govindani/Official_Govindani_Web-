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


const WordPressPluginDocs = () => {
  return (
    <LegalLayout title="NGO OS Embed — WordPress Plugin">
      <p>
        <strong>NGO OS Embed</strong> puts your GiveSetu case, campaign, donation-form, donor-portal
        and receipt-verification pages inside your own WordPress site, through shortcodes or the
        block editor. Donation forms, payments, receipts and 80G certificates all run on the GiveSetu
        platform &mdash; no donor data is copied into WordPress.
      </p>
      <p>
        Licensed GPLv2 or later. Requires WordPress 6.0+ and PHP 7.4+.
      </p>

      <h2>1. Install</h2>
      <ul>
        <li>Upload the <code>ngo-os-embed</code> folder to <code>/wp-content/plugins/</code>, or use
          Plugins &rarr; Add New &rarr; Upload Plugin.</li>
        <li>Activate it. A new <strong>NGO OS</strong> menu appears in the dashboard.</li>
        <li>First visit offers a short guided tour of every screen; <em>Take the tour</em> in the
          header replays it.</li>
      </ul>

      <h2>2. Connect</h2>
      <p>
        The plugin shows nothing to visitors until this site is connected to your GiveSetu account.
        No account yet? <a href="/pricing/ngo-os/">Start a free trial</a>.
      </p>
      <ul>
        <li><strong>One click:</strong> NGO OS &rarr; Setup &rarr; <em>Connect with GiveSetu</em>.
          GiveSetu opens in a new tab; sign in, choose TEST or LIVE, press <em>Approve and connect</em>.
          Your Setup tab fills in the key, the allowed website address and the webhook by itself.</li>
        <li><strong>Manual:</strong> in GiveSetu, Settings &rarr; Integrations &rarr; create a client
          of type <em>WordPress plugin</em>, add this site&rsquo;s address under Allowed Origins &amp; IPs,
          then enter the API base URL, client ID and client secret under
          <em>Set up manually instead</em>.</li>
      </ul>
      <p>
        Secrets are stored encrypted with a key derived from your site&rsquo;s <code>AUTH_SALT</code> and
        are never shown again. Changing <code>AUTH_SALT</code> invalidates them &mdash; re-enter them afterwards.
      </p>

      <h2>3. Shortcodes and blocks</h2>
      <table>
        <thead><tr><th>Shortcode</th><th>What it renders</th></tr></thead>
        <tbody>
          <tr><td><code>[ngoos_case slug="..."]</code></td><td>A full case page &mdash; story plus donate form</td></tr>
          <tr><td><code>[ngoos_campaign slug="..."]</code></td><td>A full campaign page</td></tr>
          <tr><td><code>[ngoos_cases]</code></td><td>A card grid of cases; <code>type="campaigns"</code> for campaigns. Add <code>category="..."</code> to filter</td></tr>
          <tr><td><code>[ngoos_browse]</code></td><td>Cases and Campaigns tabs together</td></tr>
          <tr><td><code>[ngoos_form type="contact"]</code></td><td>An enquiry form; also <code>csr</code> and <code>volunteer</code></td></tr>
          <tr><td><code>[ngoos_profile_icon]</code></td><td>The donor profile icon, for placing yourself</td></tr>
        </tbody>
      </table>
      <p>
        The same things exist as the <em>NGO OS Embed</em> and <em>Profile icon</em> blocks in the
        block editor. Elementor users: add a Shortcode widget and paste from the Shortcode builder tab.
      </p>

      <h2>4. Pages</h2>
      <p>
        <em>Create selected pages</em> in Setup publishes Browse, Contact, CSR, Volunteer, Donor Portal
        and Verify a Receipt pages. Every case and campaign also gets its own page automatically.
        Purge your caching plugin after creating pages or changing URL bases.
      </p>

      <h2>5. Webhooks and sync</h2>
      <p>
        Register <code>https://your-site/wp-json/ngoos/v1/webhook</code> in GiveSetu under
        Settings &rarr; Integrations &rarr; Webhooks, and paste the signing secret into Setup.
        GiveSetu then posts <code>DONATION_SETTLED</code> and <code>RECEIPT_ISSUED</code> events;
        each carries an HMAC-SHA256 signature the plugin verifies with a constant-time comparison.
        Until a secret is saved the receiver answers 503.
      </p>
      <p>
        <em>Sync now</em> on the NGO OS dashboard pulls recent receipts and donations. The mirrored
        table holds ids, numbers, amounts and timestamps only &mdash; never donor names or contact
        details &mdash; and is dropped on uninstall.
      </p>

      <h2>6. Donor portal</h2>
      <p>
        Off by default. Under NGO OS &rarr; Donor Profile, enable it and pick a primary colour; your
        Donor Portal page then shows sign-in, profile, donations, 80G certificates, subscriptions and
        membership. The portal talks only to your own site, which forwards each request to GiveSetu
        server-side &mdash; donors&rsquo; tokens stay on your server and the browser keeps only an
        HttpOnly session cookie.
      </p>

      <h2 id="errors">7. Errors</h2>
      <p>What the Setup screen tells you, and what to do about it.</p>
      <table>
        <thead><tr><th>Message</th><th>What it means</th></tr></thead>
        <tbody>
          <tr><td>Not connected</td><td>No credentials saved yet. Use <em>Connect with GiveSetu</em>, or enter the API base URL, client ID and secret manually.</td></tr>
          <tr><td>Connection not verified</td><td>Credentials are saved but unchecked. Press <em>Save &amp; verify connection</em>.</td></tr>
          <tr><td>Stored credentials cannot be read</td><td>Your site&rsquo;s <code>AUTH_SALT</code> changed, usually after a migration. Re-enter the client secret and webhook secret.</td></tr>
          <tr><td>No donate domain selected</td><td>Connect first; the domain is then chosen from your organisation&rsquo;s verified domains.</td></tr>
          <tr><td>Donate domain does not belong to this organisation</td><td>The saved domain is not one GiveSetu returned for your account. Pick one from the list in Setup step 2.</td></tr>
          <tr><td>Plan does not include the WordPress plugin</td><td>Upgrade the plan in GiveSetu, then verify the connection again.</td></tr>
          <tr><td>Origin or IP not allowed</td><td>Add this site&rsquo;s address, and its server IP if you use the IP allow-list, under Allowed Origins &amp; IPs on the integration client.</td></tr>
          <tr><td>Missing a permission / invalid scope</td><td>The integration client lacks a scope the plugin asked for &mdash; for the donor portal, <code>DONOR_AUTH</code>. Press <em>Reconnect</em> in Setup.</td></tr>
          <tr><td>Connection code expired</td><td>The one-time code was used or timed out. Press <em>Connect with GiveSetu</em> again.</td></tr>
          <tr><td>Temporarily unavailable</td><td>GiveSetu is in maintenance or your account is restricted. Nothing to change here; try again shortly.</td></tr>
          <tr><td>embed.js did not load</td><td>The donate domain is unreachable from the visitor&rsquo;s browser, or a caching or security plugin is blocking it. Check the domain in Setup step 2 and purge caches.</td></tr>
        </tbody>
      </table>

      <h2>8. Advanced configuration</h2>
      <p>Define any of these in <code>wp-config.php</code>; each has a matching filter.</p>
      <ul>
        <li><code>NGOOS_EMBED_DEFAULT_API_URL</code> &mdash; the GiveSetu API origin</li>
        <li><code>NGOOS_EMBED_DEFAULT_APP_URL</code> &mdash; the app origin used by one-click Connect</li>
        <li><code>NGOOS_EMBED_DEFAULT_DOCS_URL</code> &mdash; where in-admin help links point</li>
        <li><code>NGOOS_EMBED_TRIAL_URL</code> &mdash; where <em>Start a free trial</em> points</li>
      </ul>
      <p>
        Filters for extending behaviour: <code>ngoos_embed_item_url</code>,
        <code>ngoos_embed_manifest_ttl</code>, <code>ngoos_embed_webhook_tolerance</code>.
      </p>

      <h2>9. Privacy and terms</h2>
      <p>
        <a href="/givesetu/privacy-policy">GiveSetu Privacy Policy</a> &middot;{" "}
        <a href="/givesetu/terms-of-service">GiveSetu Terms of Service</a>
      </p>

      <h2>10. Support</h2>
      <p>
        <strong>Email:</strong> support@govindaniit.org
        <br />
        <strong>Phone:</strong> +91 92019 58274
      </p>
    </LegalLayout>
  );
};

export default WordPressPluginDocs;
