import { useState, type FormEvent } from "react";

/**
 * Inline 2-field capture (name + mobile) for blog pages. Posts to the same
 * same-origin bridge the contact form uses (/api/lead.php -> web_leads.jsonl +
 * wacrm). Blog traffic ranked but never converted because the pages only linked
 * to WhatsApp; this captures the lead on the page itself.
 */
export default function BlogLeadForm({ slug, title }: { slug: string; title: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^\d{10}$/.test(phone)) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const params = new URLSearchParams(window.location.search);
      await fetch("/api/lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          source: params.get("utm_source") || "blog",
          campaign: params.get("utm_campaign") || slug,
          subject: ("Blog lead: " + title).slice(0, 120),
        }),
      });
      setStatus("done");
      setName("");
      setPhone("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="mb-6 rounded-xl bg-green-500/10 border border-green-500/30 p-4 text-green-300 font-medium">
        ✅ Thank you! Our team will call you back shortly.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          className="px-4 py-3 rounded-full bg-white/10 border border-white/15 text-white placeholder-gray-500 focus:border-yellow-400 outline-none sm:w-44"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="10-digit mobile"
          aria-label="10-digit mobile number"
          inputMode="numeric"
          className="px-4 py-3 rounded-full bg-white/10 border border-white/15 text-white placeholder-gray-500 focus:border-yellow-400 outline-none sm:w-48"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-8 py-3 bg-yellow-500 text-black rounded-full font-bold hover:bg-yellow-400 transition disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Get a callback"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-400">Please enter your name and a valid 10-digit mobile number.</p>
      )}
    </form>
  );
}
