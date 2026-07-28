import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (index == null) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {index != null && (
        <motion.div
          className="fixed inset-0 z-[70] bg-[#2B1B14]/95 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          data-testid="lightbox"
        >
          <button onClick={onClose} className="absolute top-6 right-6 w-11 h-11 rounded-full border border-[#FBF6EE]/40 text-[#FBF6EE] flex items-center justify-center" aria-label="Close" data-testid="lightbox-close">
            <X size={20} />
          </button>
          <button onClick={onPrev} className="absolute left-4 md:left-8 w-12 h-12 rounded-full border border-[#FBF6EE]/40 text-[#FBF6EE] flex items-center justify-center" aria-label="Previous">
            <ChevronLeft size={22} />
          </button>
          <motion.img
            key={index}
            src={images[index]}
            alt=""
            className="max-h-[85vh] max-w-[92vw] object-contain rounded-lg"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          />
          <button onClick={onNext} className="absolute right-4 md:right-8 w-12 h-12 rounded-full border border-[#FBF6EE]/40 text-[#FBF6EE] flex items-center justify-center" aria-label="Next">
            <ChevronRight size={22} />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#FBF6EE]/70 text-xs tracking-[0.2em] uppercase">
            {index + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
