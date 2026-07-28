import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";
import { MANIFESTO, ABOUT } from "../data/content";

export default function About() {
  return (
    <div>
      <section className="pt-16 md:pt-24 pb-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="eyebrow mb-4">About Us</div>
          <h1 className="h-display text-[13vw] md:text-[9vw] leading-[0.9] tracking-[-0.025em] text-[#2B1B14] max-w-5xl">
            A small kitchen<br />
            with a <em className="italic font-light text-[#8A1F11]">loud</em> tandoor.
          </h1>
          <div className="mt-14 grid md:grid-cols-12 gap-10">
            <p className="md:col-span-6 md:col-start-1 text-[17px] leading-relaxed text-[#2B1B14]">
             {ABOUT.story}
            </p>
            <p className="md:col-span-5 md:col-start-8 text-[15px] leading-relaxed text-[#6B564B]">
             {ABOUT.locationStory}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#2B1B14] text-[#FBF6EE]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="eyebrow text-[#E8A33D] mb-4">Chapters</div>
          <h2 className="h-display text-5xl md:text-7xl leading-[0.95] mb-16 tracking-[-0.02em]">Four rules we cook by.</h2>
          <div className="grid md:grid-cols-2 gap-x-14 gap-y-14 md:gap-y-20">
            {MANIFESTO.map((m, i) => (
              <motion.div key={m.n}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className={`flex items-start gap-6 ${i % 2 === 1 ? "md:pl-10" : ""}`}
              >
                <div className="font-display text-7xl md:text-8xl text-[#E8A33D] font-light leading-none">{m.n}</div>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl mb-3 tracking-[-0.01em]">{m.title}</h3>
                  <p className="text-[15px] leading-relaxed text-[#FBF6EE]/75 max-w-md">{m.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 flex flex-col items-start gap-6">
          <Flame size={32} className="text-[#8A1F11]" />
          <h2 className="h-display text-4xl md:text-6xl text-[#2B1B14] max-w-3xl leading-[0.95] tracking-[-0.02em]">
            {ABOUT.cta}
          </h2>
          <Link to="/menu" className="btn-primary" data-testid="about-menu-cta">See the Menu <ArrowRight size={15} /></Link>
        </div>
      </section>
    </div>
  );
}
