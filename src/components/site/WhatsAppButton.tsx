import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ phone }: { phone: string }) {
  const cleanPhone = phone.replace(/\D/g, "");
  const href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    "Hello, I'm interested in Venus Universe. Please share details."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 md:bottom-24 right-4 md:right-5 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-[oklch(0.72_0.18_150)] animate-ping opacity-30" />
      <span className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-[oklch(0.62_0.18_150)] text-white shadow-luxe border border-white/20 group-hover:scale-105 transition">
        <MessageCircle size={26} />
      </span>
    </a>
  );
}
