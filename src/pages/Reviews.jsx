import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";
import { REVIEWS } from "../data/content";
import { SITE } from "../data/site";

export default function Reviews() {
  return (
    <div>
      <section className="pt-16 md:pt-24 pb-14">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="eyebrow mb-4">Reviews</div>
          <h1 className="h-display text-[13vw] md:text-[9vw] leading-[0.9] tracking-[-0.025em] text-[#2B1B14]">
            Word of <em className="italic font-light text-[#8A1F11]">mouth.</em>
          </h1>
          <div className="mt-10 flex flex-wrap items-end gap-8">
            <div>
              <div className="font-display text-7xl md:text-8xl text-[#8A1F11] leading-none">4.1</div>
              <div className="flex gap-1 mt-3">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#C97B2E" className="text-[#C97B2E]" />)}</div>
              <div className="text-[12px] uppercase tracking-[0.22em] text-[#6B564B] mt-2">Based on 756 Google reviews</div>
            </div>
            <a href={SITE.googleReviewUrl} target="_blank" rel="noreferrer" className="btn-primary" data-testid="reviews-google-link">Read on Google <ArrowUpRight size={15} /></a>
          </div>
          <p className="mt-10 max-w-xl text-[14px] leading-relaxed text-[#6B564B]">
            The quotes below are sample placeholder content pending the client's verified review selections.
            Real reviews live on the Google listing.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {REVIEWS.map((r, i) => (
              <motion.blockquote key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="p-8 md:p-10 border border-[#6B564B]/15 rounded-2xl bg-[#FFFFFF]"
                data-testid={`reviews-card-${i}`}
              >
                <div className="flex gap-1 mb-5">{[...Array(5)].map((_, k) => <Star key={k} size={14} fill="#C97B2E" className="text-[#C97B2E]" />)}</div>
                <p className="font-display text-2xl md:text-[26px] leading-[1.25] tracking-[-0.01em] text-[#2B1B14]">"{r.quote}"</p>
                <footer className="mt-6">
                  <div className="text-sm font-medium text-[#2B1B14]">{r.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#6B564B] mt-1">{r.meta}</div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
