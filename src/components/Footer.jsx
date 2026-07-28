import { Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE, tel, wa } from "../data/site";

export default function Footer() {
  return (
    <footer className="bg-[#2B1B14] text-[#FBF6EE] relative z-10">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 pt-20 pb-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <h3 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-[-0.02em]">
             {SITE.name}
             </h3>
            <p className="mt-6 text-sm text-[#FBF6EE]/70 max-w-md leading-relaxed">
              {SITE.description}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow text-[#E8A33D] mb-4">Visit</div>
            <div className="flex items-start gap-3 text-sm text-[#FBF6EE]/85">
              <MapPin size={16} className="mt-1 shrink-0" />
              <address className="not-italic leading-relaxed">
                {SITE.address.line1},<br />
                {SITE.address.locality}, {SITE.address.city},<br />
                {SITE.address.state} {SITE.address.postal}
              </address>
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm">
              <Clock size={16} />
              <span>{SITE.hoursLabel}</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow text-[#E8A33D] mb-4">Sitemap</div>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/about", label: "About" },
                { to: "/menu", label: "Menu" },
                { to: "/gallery", label: "Gallery" },
                { to: "/reviews", label: "Reviews" },
                { to: "/faq", label: "FAQ" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline" data-testid={`footer-link-${l.label.toLowerCase()}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow text-[#E8A33D] mb-4">Reach</div>
            <a href={tel()} className="flex items-center gap-2 text-sm mb-2 link-underline" data-testid="footer-call">
              <Phone size={14} /> {SITE.phoneDisplay}
            </a>
            <a href={wa()} target="_blank" rel="noreferrer" className="block text-sm mb-2 link-underline" data-testid="footer-whatsapp">WhatsApp</a>
            <a href={SITE.swiggyUrl} target="_blank" rel="noreferrer" className="block text-sm mb-4 link-underline" data-testid="footer-swiggy">Order on Swiggy</a>
            <div className="flex gap-3 mt-4">
              <a href={SITE.social.instagram} aria-label="Instagram" className="w-9 h-9 rounded-full border border-[#FBF6EE]/25 flex items-center justify-center hover:bg-[#E8A33D] hover:text-[#2B1B14] hover:border-[#E8A33D] transition-colors"><Instagram size={16} /></a>
              <a href={SITE.social.facebook} aria-label="Facebook" className="w-9 h-9 rounded-full border border-[#FBF6EE]/25 flex items-center justify-center hover:bg-[#E8A33D] hover:text-[#2B1B14] hover:border-[#E8A33D] transition-colors"><Facebook size={16} /></a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-[#FBF6EE]/12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#FBF6EE]/55">
          <div>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
          <div className="font-mono">{SITE.footerLocation}</div>
        </div>
      </div>
    </footer>
  );
}
