import { Phone, MessageCircle } from "lucide-react";
import { SITE, tel, wa } from "../data/site";

export default function MobileBottomBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBF6EE] border-t border-[#6B564B]/20 backdrop-blur-md"
      data-testid="mobile-bottom-bar">
      <div className="grid grid-cols-2">
        <a href={tel()} className="flex items-center justify-center gap-2 py-3.5 bg-[#8A1F11] text-[#FBF6EE] text-[12px] uppercase tracking-[0.18em] font-semibold" data-testid="bottom-call">
          <Phone size={16} /> Call {SITE.phoneDisplay.split(" ")[0]}
        </a>
        <a href={wa()} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3.5 bg-[#2B1B14] text-[#FBF6EE] text-[12px] uppercase tracking-[0.18em] font-semibold" data-testid="bottom-whatsapp">
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </div>
  );
}
