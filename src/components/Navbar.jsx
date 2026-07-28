import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X, Phone } from "lucide-react";
import { SITE, tel } from "../data/site";
import Logo from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ onReserve }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <>
      {/* Announcement bar */}
      <div className="w-full text-[#FBF6EE] bg-[#8A1F11] text-[11px] tracking-[0.24em] uppercase relative z-40">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-2.5 flex items-center justify-between gap-4">
          <span className="hidden sm:inline font-medium" data-testid="announcement-hours">{SITE.hoursLabel}</span>
          <span className="sm:hidden font-medium">{SITE.hoursLabel}</span>
          <a href={tel()} className="inline-flex items-center gap-2 font-semibold link-underline" data-testid="announcement-call">
            <Phone size={13} strokeWidth={2.4} />
            <span>{SITE.phoneDisplay}</span>
          </a>
        </div>
      </div>

      <motion.header
        className={`sticky top-0 z-40 transition-colors duration-300 ${scrolled ? "bg-[#FBF6EE]/92 backdrop-blur-md border-b border-[#6B564B]/15" : "bg-[#FBF6EE]"}`}
        data-testid="site-navbar"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-[72px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" data-testid="nav-logo-home">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                data-testid={`nav-link-${n.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-[12px] uppercase tracking-[0.22em] font-medium link-underline ${isActive ? "text-[#8A1F11]" : "text-[#2B1B14]"}`
                }
                end={n.to === "/"}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onReserve}
              className="hidden md:inline-flex btn-primary"
              data-testid="nav-reserve-btn"
            >
              Reserve
            </button>
            <button
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#2B1B14]/30 text-[#2B1B14]"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              data-testid="mobile-menu-open"
            >
              <MenuIcon size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#FBF6EE] lg:hidden flex flex-col"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.7, 0, 0.3, 1] }}
            data-testid="mobile-menu"
          >
            <div className="flex items-center justify-between px-5 h-[72px] border-b border-[#6B564B]/15">
              <Logo />
              <button
                className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-[#2B1B14]/30"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                data-testid="mobile-menu-close"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 px-6 pt-10 flex flex-col gap-6">
              {NAV.map((n, i) => (
                <motion.div key={n.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                >
                  <NavLink to={n.to} end={n.to === "/"}
                    className={({ isActive }) => `font-display text-4xl ${isActive ? "text-[#8A1F11]" : "text-[#2B1B14]"}`}
                    data-testid={`mobile-nav-${n.label.toLowerCase()}`}
                  >
                    {n.label}
                  </NavLink>
                </motion.div>
              ))}
              <button
                onClick={() => { setOpen(false); onReserve?.(); }}
                className="btn-primary mt-6 self-start"
                data-testid="mobile-reserve-btn"
              >
                Reserve a Table
              </button>
            </nav>
            <div className="px-6 py-6 border-t border-[#6B564B]/15 text-sm text-[#6B564B]">
              <div className="font-medium text-[#2B1B14]">{SITE.phoneDisplay}</div>
              <div>{SITE.hoursLabel}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
