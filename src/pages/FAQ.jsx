import { useState } from "react";
import { motion } from "framer-motion";
import { FAQS } from "../data/content";

const easeOut = [0.16, 1, 0.3, 1];

export default function FAQ() {
  return (
    <div>
      <section className="pt-16 md:pt-24 pb-14">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="eyebrow mb-4">FAQ</div>
          <h1 className="h-display text-[13vw] md:text-[9vw] leading-[0.9] tracking-[-0.025em] text-[#2B1B14]">
            Ask <em className="italic font-light text-[#8A1F11]">away.</em>
          </h1>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="max-w-[1000px] mx-auto px-5 md:px-10">
          <div className="divide-y divide-[#6B564B]/20 border-y border-[#6B564B]/20">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-6" data-testid={`faq-full-${index}`}>
      <button className="w-full flex items-center justify-between gap-6 text-left" onClick={() => setOpen((o) => !o)}>
        <span className="font-display text-2xl md:text-3xl text-[#2B1B14] tracking-[-0.01em]">{q}</span>
        <span className={`w-10 h-10 shrink-0 rounded-full border border-[#2B1B14]/30 flex items-center justify-center transition-transform ${open ? "rotate-45 bg-[#8A1F11] text-[#FBF6EE] border-[#8A1F11]" : "text-[#2B1B14]"}`}>
          <span className="text-xl leading-none">+</span>
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
        className="overflow-hidden"
      >
        <p className="pt-4 text-[15px] leading-relaxed text-[#6B564B] max-w-2xl">{a}</p>
      </motion.div>
    </div>
  );
}
