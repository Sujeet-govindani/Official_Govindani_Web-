/**
 * Single source of truth for the numbers and addresses the site hands out.
 *
 * These were previously hard-coded in several places and had drifted apart:
 * the footer dialled ...58272, the live WhatsApp float opened ...58273, and
 * WhatsAppFloating.tsx carried ...58271. Anything that needs to reach a human
 * should import from here so there is only ever one number to correct.
 */

/** WhatsApp business line, international format, no '+' or spaces. */
export const WHATSAPP_NUMBER = "919201958271";

/** Voice line, in the format tel: expects. */
export const PHONE_TEL = "+919201958271";

/** Voice line, formatted for display. */
export const PHONE_DISPLAY = "+91 92019 58271";

/**
 * WhatsApp BOT line (+91 92019 58278) — the number wired to our automated
 * assistant/guided flow on the Cloudflare Worker. Click-to-chat buttons point
 * HERE (not the human sales line) so a tap opens a conversation the bot greets,
 * qualifies and hands to sales. Kept separate from WHATSAPP_NUMBER on purpose.
 */
export const WHATSAPP_BOT_NUMBER = "919201958278";

/** Default opener that makes the bot start its friendly welcome flow. */
export const WHATSAPP_BOT_MESSAGE = "Hi! I want to know more about your websites.";

/** Builds a wa.me link to the BOT line with an optional prefilled message. */
export const whatsappBotLink = (message?: string) => {
  const base = `https://wa.me/${WHATSAPP_BOT_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const SUPPORT_EMAIL = "support@govindaniit.org";

/** Builds a wa.me link with an optional prefilled message. */
export const whatsappLink = (message?: string) => {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/** Google Maps link for the Pune office. */
export const MAPS_URL =
  "https://www.google.com/maps/dir//Govindani+Infotech+Pvt.+Ltd.,+2nd+Floor,+Landmark+plaza,+206,+Satara+Rd,+Pune,+Maharashtra+411009";
