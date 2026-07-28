import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Phone, Star, ArrowRight, ArrowUpRight, MapPin, Utensils, Flame, Clock } from "lucide-react";
import { SITE, tel, wa } from "../data/site";
import { SIGNATURE, MENU } from "../data/menu";
import { HOME_CONTENT, MANIFESTO, MANIFESTO_SECTION, REVIEWS, GALLERY, FAQ_SECTION, FAQS, CTA_SECTION, MARQUEE_ITEMS } from "../data/content";

const easeOut = [0.16, 1, 0.3, 1];

function MaskWord({ children, delay = 0 }) {
  return (
    <span className="mask-line">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.05, ease: easeOut, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Home({ onReserve }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <div className="relative">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[92vh] md:min-h-[100vh] pt-6 md:pt-10 pb-16 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative z-10">
          <div className="grid md:grid-cols-12 gap-8 md:gap-6 items-end">
            <div className="md:col-span-7 pt-10 md:pt-16">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="eyebrow mb-6" data-testid="hero-eyebrow">
                {HOME_CONTENT.hero.eyebrow}
              </motion.div>

              <h1 className="h-display text-[15vw] md:text-[9.4vw] leading-[0.9] tracking-[-0.025em] text-[#2B1B14]" data-testid="hero-heading">
                <MaskWord delay={0.05}>{HOME_CONTENT.hero.title[0]}</MaskWord>
                <MaskWord delay={0.2}>
                  {HOME_CONTENT.hero.title[1]}
                </MaskWord>
                <MaskWord delay={0.35}>{HOME_CONTENT.hero.title[2]}</MaskWord>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}
                className="mt-8 max-w-md text-[15px] leading-relaxed text-[#6B564B]"
              >
                {HOME_CONTENT.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <a href={tel()} className="btn-primary" data-testid="hero-call">
                  <Phone size={15} /> {HOME_CONTENT.hero.primaryButton}
                </a>
                <Link to="/menu" className="btn-ghost" data-testid="hero-view-menu">
                  {HOME_CONTENT.hero.secondaryButton} <ArrowRight size={15} />
                </Link>
              </motion.div>
            </div>

            <motion.div className="md:col-span-5 relative aspect-[4/5] md:aspect-[4/5] overflow-hidden rounded-[28px] shadow-2xl"
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 1.2, ease: easeOut }}
              style={{ opacity: heroOpacity }}
              data-testid="hero-image"
            >
              <motion.img
                src={HOME_CONTENT.hero.image}
                alt={HOME_CONTENT.hero.imageAlt}
                className="absolute inset-0 w-full h-[112%] object-cover"
                style={{ y: parallaxY, scale: parallaxScale }}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B14]/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-[#FBF6EE] flex items-end justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.28em] uppercase opacity-80">{HOME_CONTENT.hero.signatureTitle}</div>
                  <div className="font-display text-2xl mt-1">{HOME_CONTENT.hero.signatureDish}</div>
                </div>
                <ArrowUpRight size={22} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust row */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 mt-16 md:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[#6B564B]/20 pt-8"
            data-testid="trust-row"
          >
            <TrustItem icon={<Star size={16} />} k={HOME_CONTENT.trust.rating} v={HOME_CONTENT.trust.reviews} testid="trust-rating" />
            <TrustItem icon={<Utensils size={16} />} k={HOME_CONTENT.trust.service} v={HOME_CONTENT.trust.serviceInfo} />
            <TrustItem icon={<Clock size={16} />} k={HOME_CONTENT.trust.timing} v={HOME_CONTENT.trust.timingInfo} />
            <TrustItem icon={<MapPin size={16} />} k={HOME_CONTENT.trust.location} v={HOME_CONTENT.trust.locationInfo} />
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <section aria-hidden className="py-10 md:py-14 border-y border-[#6B564B]/20 bg-[#8A1F11] text-[#FBF6EE] overflow-hidden">
        <Marquee speed={38} gradient={false} pauseOnHover>
          {MARQUEE_ITEMS.map((w, i) => (
            <span key={i} className="font-display text-[7vw] md:text-[5.2vw] leading-none mx-8 md:mx-12 flex items-center gap-8 md:gap-12">
              <span className={i % 2 === 0 ? "text-stroke text-[#FBF6EE]" : ""}>{w}</span>
              <span className="text-[#E8A33D] text-4xl md:text-5xl">✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* SIGNATURES */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="flex items-end justify-between mb-14 md:mb-20 flex-wrap gap-6">
            <div>
              <div className="eyebrow mb-4">{HOME_CONTENT.signatures.title}</div>
              <h2 className="h-display text-5xl md:text-7xl text-[#2B1B14] max-w-2xl">
                {HOME_CONTENT.signatures.heading}
              </h2>
            </div>
            <Link to="/menu" className="btn-ghost" data-testid="signatures-view-all">{HOME_CONTENT.signatures.button} <ArrowRight size={15} /></Link>
          </div>

          <div className="grid md:grid-cols-6 gap-4 md:gap-5">
            {SIGNATURE.map((dish, i) => (
              <motion.article
                key={dish.id}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: easeOut }}
                className={`group relative overflow-hidden rounded-2xl bg-[#FFFFFF] border border-[#6B564B]/15 ${i === 0 ? "md:col-span-4 md:row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[560px]" : i === 3 ? "md:col-span-2 aspect-[3/4]" : "md:col-span-2 aspect-square"}`}
                data-testid={`signature-card-${dish.id}`}
              >
                <img src={dish.image} alt={`${dish.name} — ${dish.blurb}`} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B14]/85 via-[#2B1B14]/10 to-transparent" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-[#FBF6EE]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.24em] uppercase opacity-90 bg-[#8A1F11]/70 px-2.5 py-1 rounded-full backdrop-blur-sm">{dish.tag}</span>
                    <span className="font-display text-lg">{dish.price}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-[-0.01em]">{dish.name}</h3>
                    <p className="mt-2 text-[13px] md:text-sm opacity-85 max-w-md leading-relaxed">{dish.blurb}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-24 md:py-32 bg-[#2B1B14] text-[#FBF6EE]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 mb-16 md:mb-20">
            <div className="md:col-span-5">
              <div className="eyebrow text-[#E8A33D] mb-4">{MANIFESTO_SECTION.eyebrow}</div>
              <h2 className="h-display text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em]">
                {MANIFESTO_SECTION.title}
              </h2>
            </div>
            <p className="md:col-span-6 md:col-start-7 text-[15px] leading-relaxed text-[#FBF6EE]/75 self-end max-w-md">
              {MANIFESTO_SECTION.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-14 gap-y-10 md:gap-y-16">
            {MANIFESTO.map((m, i) => (
            <ManifestoBlock
             key={m.title}
             n={String(i + 1).padStart(2, "0")}
             title={m.title}
             body={m.body}
             index={i}
             />
            ))}
          </div>

          <div className="mt-16 md:mt-24 flex flex-wrap gap-3">
            <Link to={MANIFESTO_SECTION.buttonLink} className="btn-primary" data-testid="manifesto-about">{MANIFESTO_SECTION.buttonText} <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <div className="eyebrow mb-4">{HOME_CONTENT.gallery.title}</div>
              <h2 className="h-display text-5xl md:text-7xl text-[#2B1B14]">{HOME_CONTENT.gallery.heading}</h2>
            </div>
            <Link to="/gallery" className="btn-ghost" data-testid="gallery-view-all">{HOME_CONTENT.gallery.button} <ArrowRight size={15} /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {GALLERY.slice(0, 8).map((src, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
                className={`overflow-hidden rounded-xl ${i === 0 || i === 5 ? "md:row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square"}`}
              >
                <img src={src} alt={HOME_CONTENT.gallery.imageAlt} loading="lazy" className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 md:py-32 bg-[#FFFFFF] border-y border-[#6B564B]/15">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-6">
              <div className="eyebrow mb-4">{HOME_CONTENT.reviews.title}</div>
              <h2 className="h-display text-5xl md:text-7xl text-[#2B1B14] leading-[0.95] tracking-[-0.02em]">
                <RatingCounter /> <span className="text-[#8A1F11]">★</span>
                <br />
                <span className="italic font-light text-[#6B564B] text-3xl md:text-5xl">
                  {SITE.rating.count} Google reviews
                </span>
              </h2>
            </div>
            <p className="md:col-span-5 md:col-start-8 text-[15px] leading-relaxed text-[#6B564B] self-end max-w-md">
              {HOME_CONTENT.reviews.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {REVIEWS.map((r, i) => (
              <motion.blockquote key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="p-8 md:p-10 border border-[#6B564B]/15 rounded-2xl bg-[#FBF6EE]"
                data-testid={`review-card-${i}`}
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, k) => <Star key={k} size={14} fill="#C97B2E" className="text-[#C97B2E]" />)}
                </div>
                <p className="font-display text-2xl md:text-[26px] leading-[1.25] tracking-[-0.01em] text-[#2B1B14]">
                  "{r.quote}"
                </p>
                <footer className="mt-6">
                  <div className="text-sm font-medium text-[#2B1B14]">{r.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#6B564B] mt-1">{r.meta}</div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <a href={SITE.googleReviewUrl} target="_blank" rel="noreferrer" className="btn-primary" data-testid="google-reviews-link">Read on Google <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <div className="eyebrow mb-4">Find us</div>
              <h2 className="h-display text-5xl md:text-7xl text-[#2B1B14] leading-[0.95] tracking-[-0.02em]">
                {SITE.address.landmark}
              </h2>
              <address className="not-italic mt-8 text-[#6B564B] text-[15px] leading-relaxed max-w-sm">
                {SITE.address.line1},<br />
                {SITE.address.locality}, {SITE.address.city},<br />
                {SITE.address.state} {SITE.address.postal}
              </address>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={SITE.googleDirectionsUrl} target="_blank" rel="noreferrer" className="btn-primary" data-testid="get-directions"><MapPin size={15} /> Get Directions</a>
                <a href={tel()} className="btn-ghost" data-testid="location-call"><Phone size={15} /> {SITE.phoneDisplay}</a>
              </div>
            </div>
            <div className="md:col-span-7 aspect-[4/3] md:aspect-[16/12] rounded-2xl overflow-hidden border border-[#6B564B]/20">
              <iframe
                title="Zaika Darbar map location"
                src={SITE.googleMapsEmbed}
                className="w-full h-full grayscale-[0.15] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SLICE */}
      <section className="py-24 md:py-28 bg-[#FBF6EE] border-t border-[#6B564B]/15">
        <div className="max-w-[1000px] mx-auto px-5 md:px-10">
          <div className="eyebrow mb-4">{FAQ_SECTION.eyebrow}</div>
          <h2 className="h-display text-5xl md:text-6xl text-[#2B1B14] mb-12 leading-[0.95] tracking-[-0.02em]">{FAQ_SECTION.title}</h2>
          <div className="divide-y divide-[#6B564B]/15 border-y border-[#6B564B]/15">
            {FAQS.slice(0, FAQ_SECTION.visibleItems).map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} index={i} />)}
          </div>
          <div className="mt-8">
            <Link to={FAQ_SECTION.buttonLink} className="btn-ghost" data-testid="faq-see-all">{FAQ_SECTION.buttonText} <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-28 md:py-40 bg-[#8A1F11] text-[#FBF6EE] overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src="https://images.pexels.com/photos/17497626/pexels-photo-17497626.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#8A1F11]/70" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOut }}
            className="h-display text-[14vw] md:text-[10vw] leading-[0.9] tracking-[-0.03em]"
          >
            {CTA_SECTION.title}
          </motion.h2>
          <p className="mt-8 max-w-md mx-auto text-[15px] leading-relaxed text-[#FBF6EE]/85">
            {CTA_SECTION.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href={tel()} className="btn-primary bg-[#FBF6EE] text-[#8A1F11] hover:bg-[#E8A33D]" style={{ background: "#FBF6EE", color: "#8A1F11" }} data-testid="cta-call">
              <Phone size={15} /> {CTA_SECTION.primaryButtonText}
            </a>
            <a href={wa()} target="_blank" rel="noreferrer" className="btn-ghost border-[#FBF6EE]/60 text-[#FBF6EE] hover:bg-[#FBF6EE] hover:text-[#8A1F11]" data-testid="cta-whatsapp">
              {CTA_SECTION.secondaryButtonText}
            </a>
            <a href={SITE.swiggyUrl} target="_blank" rel="noreferrer" className="btn-ghost border-[#FBF6EE]/60 text-[#FBF6EE] hover:bg-[#FBF6EE] hover:text-[#8A1F11]" data-testid="cta-swiggy">
              {CTA_SECTION.thirdButtonText}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustItem({ icon, k, v, testid }) {
  return (
    <div className="flex items-start gap-3" data-testid={testid}>
      <span className="text-[#8A1F11] mt-1">{icon}</span>
      <div>
        <div className="font-display text-xl text-[#2B1B14]">{k}</div>
        <div className="text-[12px] tracking-[0.16em] uppercase text-[#6B564B] mt-1">{v}</div>
      </div>
    </div>
  );
}

function ManifestoBlock({ n, title, body, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className={`flex items-start gap-6 ${index % 2 === 1 ? "md:pl-8" : ""}`}
    >
      <div className="font-display text-6xl md:text-7xl text-[#E8A33D] font-light leading-none">{n}</div>
      <div>
        <h3 className="font-display text-2xl md:text-3xl mb-3 tracking-[-0.01em]">{title}</h3>
        <p className="text-[14px] leading-relaxed text-[#FBF6EE]/72 max-w-sm">{body}</p>
      </div>
    </motion.div>
  );
}

function RatingCounter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [val, setVal] = useState("0.0");
  useEffect(() => {
    if (!inView) return;
    const target = SITE.rating.value;
    const duration = 1400;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal((target * eased).toFixed(1));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);
  return <span ref={ref} data-testid="rating-counter">{val}</span>;
}

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-5 md:py-6" data-testid={`faq-item-${index}`}>
      <button className="w-full flex items-center justify-between gap-6 text-left" onClick={() => setOpen((o) => !o)}>
        <span className="font-display text-xl md:text-2xl text-[#2B1B14] tracking-[-0.005em]">{q}</span>
        <span className={`w-9 h-9 shrink-0 rounded-full border border-[#2B1B14]/30 flex items-center justify-center transition-transform ${open ? "rotate-45 bg-[#8A1F11] text-[#FBF6EE] border-[#8A1F11]" : "text-[#2B1B14]"}`}>
          <span className="text-lg leading-none">+</span>
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: easeOut }}
        className="overflow-hidden"
      >
        <p className="pt-4 text-[14px] leading-relaxed text-[#6B564B] max-w-2xl">{a}</p>
      </motion.div>
    </div>
  );
}
