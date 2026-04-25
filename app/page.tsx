"use client";

import { motion } from "framer-motion";
import {
  MessageCircle, Users, Sparkles, Globe, Maximize2,
  Star, ImageIcon, Zap, UserCheck, MapPin, GripVertical,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState, useCallback, useEffect, type FormEvent } from "react";

const WA_URL =
  "https://wa.me/972509005440?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%A8%D7%90%D7%99%D7%AA%D7%99%20%D7%90%D7%AA%20Totalook.ai%20%D7%95%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const PROMISES = [
  { icon: Star, text: "הראשונים בישראל באופנה צנועה" },
  { icon: ImageIcon, text: "תמונות מוצר וסרטוני אופנה" },
  { icon: Zap, text: "אספקה מהירה — שבריר מהזמן והעלות של צילום רגיל" },
  { icon: UserCheck, text: "דוגמניות אקסקלוסיביות משלכם" },
  { icon: MapPin, text: "כל רקע, כל מיקום בעולם" },
];

/* ─── Interactive Before/After Slider ─── */
function ComparisonSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !dragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = rect.right - clientX; // RTL
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  useEffect(() => {
    const up = () => { dragging.current = false; };
    const move = (e: MouseEvent) => handleMove(e.clientX);
    const touchMove = (e: TouchEvent) => handleMove(e.touches[0]!.clientX);
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchend", up);
    window.addEventListener("touchmove", touchMove, { passive: true });
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchend", up);
      window.removeEventListener("touchmove", touchMove);
    };
  }, [handleMove]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/4] max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 cursor-col-resize select-none"
      onMouseDown={() => { dragging.current = true; }}
      onTouchStart={() => { dragging.current = true; }}
    >
      {/* After — full layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/gallery/after-1.png" alt="אחרי" className="absolute inset-0 w-full h-full object-cover" />

      {/* Before — clipped (RTL: clip from left) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${100 - position}%)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gallery/before-1.jpg" alt="לפני" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white/90 z-10"
        style={{ right: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 right-0 w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center">
          <GripVertical className="w-4 h-4 text-ink-muted" />
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-5 right-5 text-xs font-medium bg-white/90 text-ink px-3 py-1.5 rounded-full z-20 shadow-sm">
        לפני — תמונת מקור
      </span>
      <span className="absolute top-5 left-5 text-xs font-medium bg-teal text-white px-3 py-1.5 rounded-full z-20 shadow-sm">
        אחרי — דוגמנית AI
      </span>
    </div>
  );
}

/* ─── Contact Form ─── */
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      // Send via WhatsApp as fallback (no backend needed)
      const name = data.get("name") as string;
      const phone = data.get("phone") as string;
      const brand = data.get("brand") as string;
      const msg = `שלום, אני ${name} מ-${brand}. טלפון: ${phone}. אשמח לשמוע פרטים על Totalook.ai`;
      window.open(`https://wa.me/972509005440?text=${encodeURIComponent(msg)}`, "_blank");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="text-teal text-sm font-medium py-4">
        תודה! נחזור אליכם בהקדם.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input
          name="name"
          type="text"
          required
          placeholder="שם"
          className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-teal"
        />
        <input
          name="phone"
          type="tel"
          required
          placeholder="טלפון"
          className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-teal"
        />
      </div>
      <input
        name="brand"
        type="text"
        placeholder="שם המותג"
        className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-teal"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-teal hover:bg-teal-hover text-white font-normal rounded-[9999px] transition-colors text-sm disabled:opacity-50 h-12 leading-none pt-[1px]"
      >
        {status === "sending" ? "שולח..." : "שלחו פרטים"}
      </button>
    </form>
  );
}

/* ─── Main Page ─── */
export default function HomePage() {
  return (
    <>
      {/* ── Nav ── */}
      <nav className="fixed top-0 right-0 left-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold tracking-tight text-ink">
              Totalook<span className="text-teal">.ai</span>
            </span>
            <span className="text-xs text-ink-muted">{"בס\"ד"}</span>
          </div>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-teal hover:bg-teal-hover text-white text-sm font-normal rounded-[9999px] transition-colors whitespace-nowrap h-11 leading-none pt-[1px] w-fit"
            style={{ paddingInline: '2rem' }}
          >
            <MessageCircle className="w-4 h-4" />
            לתיאום הפקה אישית
          </a>
        </div>
      </nav>

      <main>
        {/* ── 1. Hero ── */}
        <section className="bg-cream" style={{ paddingTop: '10rem', paddingBottom: '3rem' }}>
          <div className="max-w-6xl mx-auto px-8 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                <motion.h1
                  variants={fadeIn}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.2] mb-8"
                >
                  אופנה צנועה בסטנדרט של מגזין: הפקות יוקרה ללא ימי צילום
                </motion.h1>
                <motion.p
                  variants={fadeIn}
                  className="text-base md:text-lg lg:text-xl text-ink-light leading-relaxed mb-8"
                >
                  הכירו את הפלטפורמה החדשנית של Totalook המשלבת את טכנולוגיית ה-AI הכי מתקדמת שקיימת היום עם דיוק אופנתי חסר פשרות. בלי צילום, בלי סטודיו, בלי דוגמניות — רק תוצאות מגזיניות. קטלוגים שלמים וסרטוני אופנה בכמויות גדולות, באיכות מקסימלית ובעלות של שבריר מצילום רגיל.
                </motion.p>
                <motion.div variants={fadeIn}>
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-teal hover:bg-teal-hover text-white text-lg font-normal rounded-[9999px] transition-colors shadow-lg shadow-teal/25 whitespace-nowrap h-16 leading-none pt-[2px] w-fit"
                    style={{ paddingInline: '2.5rem', gap: '12px' }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    לתיאום הפקה אישית
                  </a>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative aspect-[3/4] md:aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 max-h-[50vh] md:max-h-none"
              >
                <Image
                  src="/models/modest-woman.jpg"
                  alt="דוגמנית AI בשמלה צנועה"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 2. Promises / Trust Bar ── */}
        <section className="py-16 md:py-20 bg-ink text-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              variants={fadeIn}
              className="text-2xl md:text-3xl font-bold text-center mb-14"
            >
              הסטנדרט החדש שלכם
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 text-center"
            >
              {PROMISES.map(({ icon: Icon, text }, i) => (
                <motion.div key={i} variants={fadeIn} className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal/15 flex items-center justify-center mb-1">
                    <Icon className="w-6 h-6 text-teal" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-medium leading-snug text-white/90">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="h-16 md:h-24 bg-cream" />

        {/* ── 3. Four Pillars — Editorial 2x2 ── */}
        <section className="py-20 md:py-28 bg-cream">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold text-ink mb-8 text-center"
              >
                איך אנחנו עובדים
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-lg text-ink-light leading-relaxed mb-28 text-center max-w-3xl mx-auto"
              >
                אנחנו דואגים להפקה — אתם מתמקדים ביצירה. תהליך העבודה שלנו מבוסס על מעטפת אישית ומקצועית שנועדה להעניק למותג שלכם את הסטנדרט הוויזואלי הגבוה ביותר.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-x-20 gap-y-20">
                <motion.div variants={fadeIn} className="space-y-5 px-2">
                  <Users className="w-7 h-7 text-ink/30" strokeWidth={1.25} />
                  <h3 className="text-xl font-bold text-ink">נבחרת דוגמניות ועקביות מוחלטת</h3>
                  <p className="text-base text-ink-light leading-relaxed">
                    אתם בונים איתנו צוות דוגמניות AI אקסקלוסיביות המלוות את המותג לאורך כל העונה. אותן פנים ואותה שפה חזותית בכל פריט ובכל זווית צילום.
                  </p>
                </motion.div>

                <motion.div variants={fadeIn} className="space-y-5 px-2">
                  <Sparkles className="w-7 h-7 text-ink/30" strokeWidth={1.25} />
                  <h3 className="text-xl font-bold text-ink">התאמה מלאה לסטנדרט הצניעות</h3>
                  <p className="text-base text-ink-light leading-relaxed">
                    המערכת שלנו מתוכננת מראש לאופנה צנועה. שרוולים, מכפלות וכיסויי ראש מוטמעים באופן טבעי ומדויק, ללא צורך בהסברים מורכבים.
                  </p>
                </motion.div>

                <motion.div variants={fadeIn} className="space-y-5 px-2">
                  <Globe className="w-7 h-7 text-ink/30" strokeWidth={1.25} />
                  <h3 className="text-xl font-bold text-ink">הפקות מסביב לעולם</h3>
                  <p className="text-base text-ink-light leading-relaxed">
                    הציבו את הקולקציה שלכם בכל מקום שתחלמו עליו — מרחובות אירופה ועד נופי בראשית — כולל הפקות קבוצתיות מורכבות ללא לוגיסטיקה.
                  </p>
                </motion.div>

                <motion.div variants={fadeIn} className="space-y-5 px-2">
                  <Maximize2 className="w-7 h-7 text-ink/30" strokeWidth={1.25} />
                  <h3 className="text-xl font-bold text-ink">איכות קצה לפרסום והפצה</h3>
                  <p className="text-base text-ink-light leading-relaxed">
                    הפקת קטלוגים שלמים וסרטוני אופנה בחדות מקסימלית (4K), המותאמים לקמפיינים גדולים, שלטי חוצות ודפוס יוקרתי.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="h-16 md:h-24 bg-cream" />

        {/* ── 4. Before / After — Interactive Slider ── */}
        <section className="py-20 md:py-28 bg-ink/[0.03]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold text-ink text-center mb-4"
            >
              לפני ואחרי
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              variants={fadeIn}
              className="text-base text-ink-muted text-center mb-14"
            >
              גררו את הידית כדי לראות את ההבדל
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              variants={fadeIn}
            >
              <ComparisonSlider />
            </motion.div>
          </div>
        </section>

        <div className="h-16 md:h-24 bg-cream" />

        {/* ── 5. Model Showcase (no duplicate of Hero image) ── */}
        <section className="py-20 md:py-28 bg-cream">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold text-ink text-center mb-6"
            >
              מענה ויזואלי מושלם לכל המשפחה: נשים, גברים וילדים
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              variants={fadeIn}
              className="text-base text-ink-light text-center mb-14 max-w-2xl mx-auto leading-relaxed"
            >
              המערכת שלנו רותמת את עוצמת הבינה המלאכותית כדי לייצר שפה חזותית עקבית לכל קהל יעד, בכל גיל ובכל לוקיישן שתבחרו.
            </motion.p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { src: "/models/modest-family.jpg", alt: "הפקה משפחתית" },
                { src: "/models/modest-boy.jpg", alt: "אופנת ילדים עם כיפה" },
                { src: "/gallery/after-1.png", alt: "שמלת ערב צנועה" },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0 }}
                  variants={fadeIn}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 90vw, 30vw"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. Final CTA — centered, editorial ── */}
        <section className="py-32 md:py-40 bg-ink">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeIn}
                className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight"
              >
                בואו נדבר
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-lg text-white/65 leading-relaxed mb-14 max-w-xl mx-auto"
              >
                אנחנו מזמינים אתכם להצטרף למהפכה הוויזואלית של האופנה הצנועה בישראל וליצור קטלוג שאי אפשר להתעלם ממנו.
              </motion.p>
              <motion.div variants={fadeIn} className="mb-14">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white hover:bg-white/90 text-ink text-lg font-normal rounded-[9999px] transition-colors shadow-lg whitespace-nowrap h-16 leading-none pt-[2px] w-fit"
                  style={{ paddingInline: '2.5rem', gap: '12px' }}
                >
                  <MessageCircle className="w-6 h-6" />
                  לתיאום הפקה אישית
                </a>
              </motion.div>

              {/* Logo + description — no border, smooth flow */}
              <motion.div variants={fadeIn}>
                <span className="text-2xl font-bold text-white block mb-4">
                  Totalook<span className="text-teal">.ai</span>
                </span>
                <p className="text-sm text-white/45 max-w-sm mx-auto leading-relaxed">
                  תמונות מוצר וסרטונים לאופנה צנועה בבינה מלאכותית. הראשונים בישראל.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Footer bottom bar ── */}
      <footer className="py-4 bg-[#0a0e14]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-[11px] text-white/20">
          <span>{"בס\"ד"}</span>
          <span>&copy; {new Date().getFullYear()} Totalook.ai. All rights reserved.</span>
        </div>
      </footer>

      {/* ── WhatsApp FAB (mobile) ── */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 md:hidden w-14 h-14 bg-teal hover:bg-teal-hover rounded-full shadow-lg shadow-teal/30 flex items-center justify-center transition-colors"
        aria-label="לתיאום הפקה אישית"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </>
  );
}
