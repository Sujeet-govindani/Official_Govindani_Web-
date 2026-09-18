import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/seo/Seo";
import { SERVICE_GROUPS, ALL_SERVICES, PRICING_PLANS } from "@/config/serviceCatalog";

/**
 * The hub every "Services" entry point lands on: one page listing everything we
 * do, grouped by what the work is for, each linking to its own detail page.
 */
export default function AllServices() {
  return (
    <main className="page-top min-h-screen bg-[#05070d] text-white">
      <Seo />

      <div className="mx-auto w-full max-w-6xl px-5 pb-24">
        {/* ---------- header ---------- */}
        <header className="border-b border-[#d4af37]/15 pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]">
            What we do
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2rem,6vw,3.4rem)] font-bold leading-[1.1]">
            Every service, on one page.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60">
            {ALL_SERVICES.length} services across building, growing, automating and
            creating. Pick the one you need, or tell us the outcome you are after and
            we will tell you which of these gets you there.
          </p>
        </header>

        {/* ---------- groups ---------- */}
        {SERVICE_GROUPS.map((group) => (
          <section key={group.id} className="pt-12">
            <div className="flex items-baseline gap-4">
              <h2 className="font-serif text-2xl font-bold text-[#d4af37]">
                {group.title}
              </h2>
              <span className="h-px flex-1 bg-[#d4af37]/15" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/30">
                {group.items.length} services
              </span>
            </div>
            <p className="mt-2 text-[14px] text-white/45">{group.blurb}</p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="
                      group flex h-full flex-col rounded-2xl border border-white/10
                      bg-white/[0.03] p-5 transition-all duration-200
                      hover:border-[#d4af37]/45 hover:bg-white/[0.06]
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70
                      active:scale-[0.985]
                    "
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-[15px] font-semibold leading-snug text-white">
                        {item.label}
                      </span>
                      <ArrowRight
                        size={16}
                        className="mt-0.5 shrink-0 text-white/25 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#d4af37]"
                      />
                    </span>
                    <span className="mt-2 text-[13px] leading-relaxed text-white/45">
                      {item.desc}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* ---------- pricing pointer ---------- */}
        <section className="mt-16 rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/[0.05] p-7">
          <h2 className="font-serif text-xl font-bold text-white">
            Want the numbers first?
          </h2>
          <p className="mt-2 max-w-xl text-[14px] text-white/55">
            Pricing is published, not quoted on the spot. Start with whichever of
            these matches what you need.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {PRICING_PLANS.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="
                  rounded-full border border-[#d4af37]/40 px-5 py-2.5
                  text-[13px] font-semibold text-[#d4af37] transition-colors
                  hover:bg-[#d4af37] hover:text-black
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70
                "
              >
                {p.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
