import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Check } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ReserveDialog({ open, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", party_size: 2, date_time: "", notes: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setStatus("idle"); setError("");
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end md:items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          data-testid="reserve-dialog"
        >
          <motion.div
            className="absolute inset-0 bg-[#2B1B14]/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative w-full md:w-[560px] bg-[#FBF6EE] md:rounded-3xl rounded-t-3xl p-8 md:p-10 shadow-2xl max-h-[92vh] overflow-y-auto"
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.7, 0, 0.3, 1] }}
          >
            <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full border border-[#2B1B14]/25 flex items-center justify-center" aria-label="Close" data-testid="reserve-close">
              <X size={18} />
            </button>

            {status !== "success" && (
              <>
                <div className="eyebrow mb-3">Reserve a Table</div>
                <h3 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-[-0.02em] text-[#2B1B14]">Save your seat.</h3>
                <p className="mt-3 text-sm text-[#6B564B] max-w-sm">Drop your details — we'll ring you back to confirm the timing.</p>

                <form onSubmit={submit} className="mt-8 grid grid-cols-1 gap-4">
                  <Field label="Your Name" name="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required testid="reserve-name" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Phone" name="phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required testid="reserve-phone" type="tel" />
                    <Field label="Guests" name="party_size" value={form.party_size} onChange={(v) => setForm({ ...form, party_size: v })} required testid="reserve-guests" type="number" min={1} max={30} />
                  </div>
                  <Field label="Date & Time" name="date_time" value={form.date_time} onChange={(v) => setForm({ ...form, date_time: v })} required testid="reserve-datetime" type="datetime-local" />
                  <Field label="Anything else? (optional)" name="notes" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} testid="reserve-notes" textarea />

                  {status === "error" && <div className="text-sm text-[#8A1F11]" data-testid="reserve-error">{error}</div>}

                  <button type="submit" disabled={status === "submitting"} className="btn-primary justify-center mt-2 disabled:opacity-70" data-testid="reserve-submit">
                    {status === "submitting" ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : "Request Reservation"}
                  </button>
                  <p className="text-[11px] text-[#6B564B] leading-relaxed">We'll only use your details to confirm this booking.</p>
                </form>
              </>
            )}

            {status === "success" && (
              <div className="py-8 text-center" data-testid="reserve-success">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#8A1F11] text-[#FBF6EE] flex items-center justify-center mb-6">
                  <Check size={28} />
                </div>
                <h3 className="font-display text-4xl leading-tight text-[#2B1B14]">Table on hold.</h3>
                <p className="mt-3 text-[#6B564B] max-w-sm mx-auto">Thanks, {form.name.split(" ")[0]}. We'll call you shortly on {form.phone} to confirm.</p>
                <button onClick={onClose} className="btn-ghost mt-8" data-testid="reserve-done">Close</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, name, value, onChange, required, testid, type = "text", textarea, ...rest }) {
  const base = "w-full bg-transparent border-b border-[#2B1B14]/30 focus:border-[#8A1F11] outline-none py-2.5 text-[15px] text-[#2B1B14] placeholder:text-[#6B564B]/60 transition-colors";
  return (
    <label className="block">
      <span className="eyebrow block mb-1.5">{label}</span>
      {textarea ? (
        <textarea rows={2} name={name} value={value} onChange={(e) => onChange(e.target.value)} className={base} data-testid={testid} {...rest} />
      ) : (
        <input type={type} name={name} value={value} onChange={(e) => onChange(e.target.value)} required={required} className={base} data-testid={testid} {...rest} />
      )}
    </label>
  );
}
