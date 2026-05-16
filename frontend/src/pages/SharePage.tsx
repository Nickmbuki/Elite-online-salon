import { motion } from "framer-motion";
import { Check, Copy, MessageCircle, Send, Share2, Smartphone } from "lucide-react";
import { useMemo, useState } from "react";

const shareText =
  "Book premium doorstep beauty care for hair, braids, bridal styling, nails, facials, children, and home visits with Elite Doorstep Salon.";

export function SharePage() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return "https://elite-doorstep-salon.example.com";
    }

    return window.location.origin;
  }, []);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${shareText} ${shareUrl}`);

  async function shareApp() {
    setStatus("");

    if (navigator.share) {
      await navigator.share({
        title: "Elite Doorstep Salon",
        text: shareText,
        url: shareUrl
      });
      setStatus("Share sheet opened.");
      return;
    }

    await copyLink();
  }

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setStatus("Link copied.");
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="section-shell">
      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow">Share</p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-espresso">Share Elite Doorstep Salon</h1>
        <p className="mt-5 text-lg leading-8 text-cocoa">
          Send the booking app to a bride, graduate, parent, professional, or friend preparing for a special day.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1fr_0.9fr]">
        <motion.section
          className="rounded-3xl border border-champagne bg-softWhite p-6 shadow-glow sm:p-8"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-espresso text-ivory">
              <Share2 size={24} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-3xl text-espresso">Invite someone to book</h2>
              <p className="mt-1 text-sm text-cocoa">Use native sharing, copy the app link, or send it through a common channel.</p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-ivory p-5">
            <p className="text-sm font-semibold text-espresso">App link</p>
            <p className="mt-2 break-words text-sm leading-7 text-cocoa">{shareUrl}</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={shareApp}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-5 py-4 text-sm font-semibold text-ivory shadow-glow transition hover:bg-cocoa focus-ring"
            >
              <Send size={18} aria-hidden="true" />
              Share App
            </button>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-roseGold/40 bg-ivory px-5 py-4 text-sm font-semibold text-espresso transition hover:border-roseGold focus-ring"
            >
              {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
              {copied ? "Copied" : "Copy Link"}
            </button>
          </div>

          {status ? <p className="mt-5 rounded-2xl bg-green-50 p-4 text-sm text-green-700">{status}</p> : null}
        </motion.section>

        <aside className="rounded-3xl bg-espresso p-6 text-ivory shadow-soft">
          <p className="font-display text-3xl">Quick share options</p>
          <div className="mt-6 space-y-3">
            <a
              className="flex items-center gap-3 rounded-2xl bg-ivory/10 p-4 text-sm font-semibold text-ivory transition hover:bg-ivory/15 focus-ring"
              href={`https://wa.me/?text=${encodedText}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={20} aria-hidden="true" />
              WhatsApp
            </a>
            <a
              className="flex items-center gap-3 rounded-2xl bg-ivory/10 p-4 text-sm font-semibold text-ivory transition hover:bg-ivory/15 focus-ring"
              href={`sms:?&body=${encodedText}`}
            >
              <Smartphone size={20} aria-hidden="true" />
              SMS
            </a>
            <a
              className="flex items-center gap-3 rounded-2xl bg-ivory/10 p-4 text-sm font-semibold text-ivory transition hover:bg-ivory/15 focus-ring"
              href={`mailto:?subject=Elite%20Doorstep%20Salon&body=${encodedText}`}
            >
              <Send size={20} aria-hidden="true" />
              Email
            </a>
          </div>
          <p className="mt-6 text-sm leading-7 text-champagne">
            Shared links open the installable PWA, where customers can browse services and request a collision-free booking slot.
          </p>
        </aside>
      </div>
    </main>
  );
}
