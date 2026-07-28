import { SITE } from "../data/site";
export default function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-2.5" aria-label={SITE.name}>
      {/* Icon mark: flame + skewer */}
      <img
      src={SITE.logo}
      alt={SITE.name}
      className={compact ? "w-8 h-8 object-contain" : "w-10 h-10 object-contain"}
     />

     <div className="leading-[0.95] flex flex-col">
     <span className="font-display font-semibold text-[var(--zd-primary)] text-[19px] tracking-[-0.01em]">
      {SITE.name}
    </span>
    </div>
    </div>
   );
  }
