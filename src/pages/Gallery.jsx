import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "../components/Lightbox";
import { GALLERY } from "../data/content";
import { SITE } from "../data/site";

export default function Gallery() {
  const [i, setI] = useState(null);
  const open = (n) => setI(n);
  const close = () => setI(null);
  const prev = () => setI((n) => (n - 1 + GALLERY.length) % GALLERY.length);
  const next = () => setI((n) => (n + 1) % GALLERY.length);

  return (
    <div>
      <section className="pt-16 md:pt-24 pb-14">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="eyebrow mb-4">Gallery</div>
          <h1 className="h-display text-[13vw] md:text-[9vw] leading-[0.9] tracking-[-0.025em] text-[#2B1B14]">
            From the <em className="italic font-light text-[#8A1F11]">pass.</em>
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 md:gap-5 [column-fill:_balance]">
            {GALLERY.map((src, n) => (
              <motion.button key={n}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (n % 6) * 0.05 }}
                onClick={() => open(n)}
                className="w-full mb-4 md:mb-5 overflow-hidden rounded-xl group block break-inside-avoid"
                data-testid={`gallery-tile-${n}`}
              >
                <img src={src} alt={`${SITE.name} Gallery ${n + 1}`} loading="lazy" className="w-full h-auto object-cover group-hover:scale-[1.05] transition-transform duration-700" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox images={GALLERY} index={i} onClose={close} onPrev={prev} onNext={next} />
    </div>
  );
}
