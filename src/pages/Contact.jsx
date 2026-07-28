import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageCircle, ArrowUpRight, Loader2, Check } from "lucide-react";
import { SITE, tel, wa } from "../data/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", party_size: 2, date_time: "", notes: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("submitting"); setError("");
    try {
      await axios.post(`${API}/reservations`, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        party_size: Number(form.party_size),
        date_time: form.date_time,
        notes: form.notes.trim(),
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err?.response?.data?.detail || "Something went wrong. Please call us instead.");
    }
  };

  return (
    <div>
      <section className="pt-16 md:pt-24 pb-14">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="eyebrow mb-4">Contact & Location</div>
          <h1 className="h-display text-[13vw] md:text-[9vw] leading-[0.9] tracking-[-0.025em] text-[#2B1B14]">
            Come <em className="italic font-light text-[#8A1F11]">see us.</em>
          </h1>
        </div>
      </section>

      <section className="pb-14">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-8">
            <InfoRow icon={<MapPin size={18} />} label="Address">
              <address className="not-italic text-[15px] text-[#2B1B14] leading-relaxed">
                {SITE.address.line1},<br />
                {SITE.address.locality}, {SITE.address.city},<br />
                {SITE.address.state} {SITE.address.postal}
              </address>
              <a href={SITE.googleDirectionsUrl} target="_blank" rel="noreferrer" className="btn-ghost mt-4 inline-flex" data-testid="contact-directions">Get Directions <ArrowUpRight size={14} /></a>
            </InfoRow>
            <InfoRow icon={<Phone size={18} />} label="Call">
              <a href={tel()} className="font-display text-3xl text-[#8A1F11] link-underline" data-testid="contact-phone">{SITE.phoneDisplay}</a>
              <a href={wa()} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.22em] font-semibold text-[#2B1B14] link-underline" data-testid="contact-whatsapp"><MessageCircle size={14} /> WhatsApp</a>
            </InfoRow>
            <InfoRow icon={<Clock size={18} />} label="Hours">
              <div className="text-[15px] text-[#2B1B14]">
               {SITE.hoursLabel}
              </div>
            </InfoRow>
             </div>
          <div className="md:col-span-7 aspect-[4/3] rounded-2xl overflow-hidden border border-[#6B564B]/20" data-testid="contact-map">
            <iframe
              title={`${SITE.name} location`}
              src={SITE.googleMapsEmbed}
              className="w-full h-full grayscale-[0.15]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-[#2B1B14] text-[#FBF6EE]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="eyebrow text-[#E8A33D] mb-4">Reserve a Table</div>
            <h2 className="h-display text-5xl md:text-6xl leading-[0.95] tracking-[-0.02em]">Save<br /> your seat.</h2>
            <p className="mt-6 text-[15px] text-[#FBF6EE]/75 max-w-sm leading-relaxed">
              Drop your details and we'll call to confirm. For same-day bookings, just dial the number above — quicker that way.
            </p>
          </div>

          <div className="md:col-span-7">
            {status !== "success" ? (
              <motion.form onSubmit={submit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-5">
                <Field label="Your Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required testid="contact-reserve-name" />
                <div className="grid grid-cols-2 gap-5">
                  <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} type="tel" required testid="contact-reserve-phone" />
                  <Field label="Guests" value={form.party_size} onChange={(v) => setForm({ ...form, party_size: v })} type="number" min={1} max={30} required testid="contact-reserve-guests" />
                </div>
                <Field label="Date & Time" value={form.date_time} onChange={(v) => setForm({ ...form, date_time: v })} type="datetime-local" required testid="contact-reserve-datetime" />
                <Field label="Anything else? (optional)" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} testid="contact-reserve-notes" textarea />
                {status === "error" && <div className="text-sm text-[#E8A33D]" data-testid="contact-reserve-error">{error}</div>}
                <button type="submit" disabled={status === "submitting"} className="btn-primary bg-[#FBF6EE] text-[#8A1F11] hover:bg-[#E8A33D] justify-center disabled:opacity-70" style={{ background: "#FBF6EE", color: "#8A1F11" }} data-testid="contact-reserve-submit">
                  {status === "submitting" ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : "Request Reservation"}
                </button>
              </motion.form>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center md:text-left" data-testid="contact-reserve-success">
                <div className="w-16 h-16 rounded-full bg-[#E8A33D] text-[#2B1B14] flex items-center justify-center mb-6"><Check size={26} /></div>
                <h3 className="font-display text-4xl leading-tight">Table on hold.</h3>
                <p className="mt-3 text-[#FBF6EE]/80 max-w-sm">Thanks, {form.name.split(" ")[0]}. We'll call you shortly on {form.phone} to confirm.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoRow({ icon, label, children }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-3 text-[#8A1F11]">{icon}<span className="eyebrow text-[#6B564B]">{label}</span></div>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, required, testid, type = "text", textarea, ...rest }) {
  const base = "w-full bg-transparent border-b border-[#FBF6EE]/30 focus:border-[#E8A33D] outline-none py-2.5 text-[15px] text-[#FBF6EE] placeholder:text-[#FBF6EE]/50 transition-colors";
  return (
    <label className="block">
      <span className="eyebrow text-[#E8A33D] block mb-2">{label}</span>
      {textarea ? (
        <textarea rows={2} value={value} onChange={(e) => onChange(e.target.value)} className={base} data-testid={testid} {...rest} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} className={base} data-testid={testid} {...rest} />
      )}
    </label>
  );
}
