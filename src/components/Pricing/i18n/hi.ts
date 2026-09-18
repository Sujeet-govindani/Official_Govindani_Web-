import type { Dict } from './index';

/**
 * हिन्दी. Rupee figures, plan names and statutory terms (80G, 10BD, 10BE, GST,
 * PAN) are left as they are — that is how they appear on the form, and
 * translating them would make the page harder to act on, not easier.
 */
export const hi: Dict = {
  // ── hero ────────────────────────────────────────────────────────────────
  // "ग़ैर-सरकारी" was wrong here: it means non-GOVERNMENTAL, which is a
  // different claim from non-PROFIT. A trust funded by a state grant is
  // non-profit and not non-governmental, and the distinction matters to the
  // people reading this page.
  'Give Setu — the operating system for Indian non-profits.':
    'Give Setu — भारतीय गैर-लाभकारी संस्थाओं के लिए बनाया गया पूरा सिस्टम।',
  'For established organisations': 'स्थापित संस्थाओं के लिए',
  'The largest single saving most non-profits will make this year.':
    'इस साल ज़्यादातर संस्थाएँ जो सबसे बड़ी बचत करेंगी, वह यही है।',

  // ── rescue band ─────────────────────────────────────────────────────────
  'Get rescue from': 'इनसे छुटकारा पाइए',
  'All of it. One system.': 'यह सब। एक ही सिस्टम में।',
  'Show me the plans': 'प्लान दिखाइए',
  'Typing 80G receipts by hand at eleven at night in May.':
    'मई की रात ग्यारह बजे हाथ से 80G रसीदें बनाना।',
  'A platform keeping 3% of money that was donated to your cause.':
    'आपके काम के लिए दिए गए दान में से 3% प्लेटफ़ॉर्म का रख लेना।',
  '10BD season costing you a fortnight and a chartered accountant.':
    '10BD के मौसम में दो हफ़्ते और एक चार्टर्ड अकाउंटेंट की फ़ीस चली जाना।',
  'Not knowing which donor gave last year and has not given this year.':
    'यह पता न होना कि पिछले साल किसने दिया था और इस साल किसने नहीं।',
  'Paying a developer every single time one page needs changing.':
    'एक पेज बदलवाने के लिए भी हर बार डेवलपर को पैसे देना।',
  'Six vendors, six invoices, and nothing that reconciles at year end.':
    'छह वेंडर, छह बिल, और साल के अंत में कुछ भी आपस में मेल न खाना।',
  'A donor’s accountant asking for proof you cannot produce.':
    'दानदाता का अकाउंटेंट ऐसा प्रमाण माँगे जो आप दे ही न सकें।',
  'Explaining a gap in your receipt register to someone with authority.':
    'रसीद रजिस्टर में छूटे हुए नंबर की सफ़ाई किसी अधिकारी को देनी पड़े।',
  'Chasing missing PANs by telephone, one donor at a time.':
    'छूटे हुए PAN के लिए एक-एक दानदाता को फ़ोन करते रहना।',
  'Three days of writing to get one festival appeal out of the door.':
    'एक त्योहार की अपील तैयार करने में तीन दिन लग जाना।',
  'Assembling the board’s numbers by hand on the first of every month.':
    'हर महीने की पहली तारीख़ को बोर्ड के आँकड़े हाथ से जोड़ना।',
  'A flood happening on Tuesday and your appeal going live on Friday.':
    'बाढ़ मंगलवार को आए और आपकी अपील शुक्रवार को लाइव हो।',

  // ── plans ───────────────────────────────────────────────────────────────
  'Plans': 'प्लान',
  'Everything compared': 'पूरी तुलना, एक जगह',
  'Dedicated CMS portal': 'अपना समर्पित CMS पोर्टल',
  'CMS portal + a full WordPress website': 'CMS पोर्टल + पूरी WordPress वेबसाइट',
  'Full custom-coded UI/UX, included in the plan':
    'पूरी तरह कस्टम-कोडेड डिज़ाइन, प्लान में ही शामिल',
  'New and small organisations': 'नई और छोटी संस्थाओं के लिए',
  'Growing organisations running regular campaigns':
    'नियमित अभियान चलाने वाली बढ़ती संस्थाओं के लिए',
  'Established organisations at scale': 'बड़े पैमाने पर काम करने वाली स्थापित संस्थाओं के लिए',

  // ── comparison: the rows a buyer actually reads ──────────────────────────
  'Website included, free': 'वेबसाइट शामिल, बिना अतिरिक्त शुल्क',
  'Active donors': 'सक्रिय दानदाता',
  'Sleeping / legacy donors': 'निष्क्रिय / पुराने दानदाता',
  '80G receipts per month': 'हर महीने 80G रसीदें',
  'Members': 'सदस्य',
  'Live cases': 'चालू केस',
  'Live campaigns': 'चालू अभियान',
  'Cases built by our team': 'हमारी टीम द्वारा बनाए गए केस',
  'WhatsApp rail': 'WhatsApp चैनल',
  'WhatsApp marketing message': 'WhatsApp मार्केटिंग संदेश',
  'WhatsApp receipt delivery': 'WhatsApp पर रसीद भेजना',
  'Mobile application — Android': 'मोबाइल ऐप — Android',
  'Mobile application — iOS': 'मोबाइल ऐप — iOS',
  'Marketing emails per month': 'हर महीने मार्केटिंग ईमेल',
  'Transactional email delivery': 'ज़रूरी ईमेल भेजना',
  'New design templates each month': 'हर महीने नए डिज़ाइन टेम्पलेट',
  'AI insights': 'AI विश्लेषण',
  'AI campaign packs per month': 'हर महीने AI अभियान पैक',
  'Media storage': 'मीडिया स्टोरेज',
  'Admin seats': 'एडमिन सीटें',
  'CA / Auditor seat': 'CA / ऑडिटर सीट',
  'Payment gateways': 'पेमेंट गेटवे',
  'Donor & member portals': 'दानदाता और सदस्य पोर्टल',
  'Compliance Centre (10BD / 10BE)': 'अनुपालन केंद्र (10BD / 10BE)',
  'Developer API & webhooks': 'डेवलपर API और वेबहुक',
  'Unlimited — free': 'असीमित — निःशुल्क',
  'Included': 'शामिल',
  'Available from Growth': 'Growth प्लान से उपलब्ध',
  'Available as add-on': 'ऐड-ऑन के रूप में उपलब्ध',
  'Available on Advanced': 'Advanced प्लान पर उपलब्ध',
  'Full portal access': 'पूरा पोर्टल एक्सेस',
  'Every template, every month': 'हर महीने, हर टेम्पलेट',
  '2 per month': 'हर महीने 2',
  '3 per month': 'हर महीने 3',

  // ── the website question ────────────────────────────────────────────────
  'The website is part of the plan, not a separate purchase.':
    'वेबसाइट प्लान का हिस्सा है, अलग से ख़रीदी जाने वाली चीज़ नहीं।',
  'While you are on a plan': 'जब तक आप प्लान पर हैं',
  'If you ever leave': 'अगर आप कभी छोड़ते हैं',
  'Your data leaves with you. The website does not.':
    'आपका डेटा आपके साथ जाता है। वेबसाइट नहीं।',
  'Built, hosted, secured and maintained by us':
    'हमारे द्वारा बनाई, होस्ट, सुरक्षित और मेंटेन की गई',

  // ── commitments ─────────────────────────────────────────────────────────
  'What we commit to': 'हम किस बात की गारंटी देते हैं',
  'Receipt delivered after donation': 'दान के बाद रसीद पहुँचने का समय',
  'Under 4 seconds': '4 सेकंड से कम',
  'Donation page availability': 'दान पेज की उपलब्धता',
  'Data residency': 'डेटा कहाँ रखा जाता है',
  'All data, backups and files held in India':
    'सारा डेटा, बैकअप और फ़ाइलें भारत में ही रखी जाती हैं',

  // ── questions ───────────────────────────────────────────────────────────
  'Questions': 'सवाल',
  'Do you ever take a commission on donations?':
    'क्या आप दान पर कभी कोई कमीशन लेते हैं?',
  'Do I have to buy a website separately?':
    'क्या मुझे वेबसाइट अलग से ख़रीदनी पड़ेगी?',
  'Do I pay for donors who never give again?':
    'क्या मुझे उन दानदाताओं के लिए भी पैसे देने होंगे जो दोबारा कभी नहीं देते?',

  // ── calls to action ─────────────────────────────────────────────────────
  'BOOK A 20-MINUTE DEMO': '20 मिनट का डेमो बुक करें',
  "See what's included": 'देखिए क्या-क्या शामिल है',
  'Compare all three NGO routes': 'तीनों विकल्पों की तुलना कीजिए',
  'Every rupee acknowledged. Every donor remembered. Every filing ready.':
    'हर रुपये की रसीद। हर दानदाता याद। हर फ़ाइलिंग तैयार।',
};
