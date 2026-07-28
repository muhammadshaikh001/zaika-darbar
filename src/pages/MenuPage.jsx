import { motion } from "framer-motion";
import { Download, Phone } from "lucide-react";
import { SIGNATURE, MENU } from "../data/menu";
import { SITE, tel } from "../data/site";

export default function MenuPage() {
  return (
    <div>
      <section className="pt-16 md:pt-24 pb-14">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="eyebrow mb-4">The Menu</div>
          <h1 className="h-display text-[13vw] md:text-[9vw] leading-[0.9] tracking-[-0.025em] text-[#2B1B14]">
            What's <em className="italic font-light text-[#8A1F11]">on</em> today.
          </h1>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-[#6B564B]">
            Prices below are indicative — this is a client-editable placeholder menu until we lock in
            the printed card. Call for daily specials.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={tel()} className="btn-primary" data-testid="menu-call"><Phone size={15} /> Call to Order</a>
            <a href="#full" className="btn-ghost" data-testid="menu-jump-full"><Download size={15} /> Full List</a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#FFFFFF] border-y border-[#6B564B]/15">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="eyebrow mb-6">Signatures</div>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {SIGNATURE.map((dish, i) => (
              <motion.div key={dish.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.06 }}
                className="group aspect-square rounded-2xl overflow-hidden relative"
                data-testid={`menu-signature-${dish.id}`}
              >
                <img src={dish.image} alt={dish.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B14]/85 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-[#FBF6EE]">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em]">
                    <span>{dish.tag}</span><span>{dish.price}</span>
                  </div>
                  <h3 className="font-display text-3xl mt-2 tracking-[-0.01em]">{dish.name}</h3>
                  <p className="text-[13px] opacity-85 mt-2 leading-relaxed">{dish.blurb}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="full" className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10">
          <div className="eyebrow mb-4">Full List</div>
          <h2 className="h-display text-5xl md:text-6xl text-[#2B1B14] mb-14 tracking-[-0.02em] leading-[0.95]">Order the whole menu.</h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
            {MENU.map((sec, i) => (
              <motion.div key={sec.section}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.03 }}
                data-testid={`menu-section-${sec.section.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <h3 className="font-display text-3xl text-[#8A1F11] mb-6 tracking-[-0.01em]">{sec.section}</h3>
                <ul className="space-y-3.5">
                  {sec.items.map((it) => (
                    <li key={it.name} className="flex items-baseline gap-3">
                      <span className="font-display text-lg text-[#2B1B14]">{it.name}</span>
                      <span className="flex-1 border-b border-dashed border-[#6B564B]/30 translate-y-[-4px]"></span>
                      <span className="font-medium text-[#2B1B14] text-sm">{it.price}</span>
                      {it.note && <span className="text-[11px] uppercase tracking-[0.2em] text-[#6B564B] ml-2">{it.note}</span>}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
