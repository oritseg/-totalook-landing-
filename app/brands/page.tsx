"use client";

import { motion } from "framer-motion";
import {
  MessageCircle, Users, Sparkles, Globe, Maximize2,
  Zap, ImageIcon, UserCheck, Layers, GripVertical,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";

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
  { icon: Zap, text: "מהירות תפעולית — קטלוג שלם בשבריר מהזמן" },
  { icon: ImageIcon, text: "תמונות מוצר וסרטוני אופנה באיכות מגזינית" },
  { icon: UserCheck, text: "נבחרת דוגמניות אקסקלוסיבית משלכם" },
  { icon: Globe, text: "כל רקע, כל מיקום בעולם" },
  { icon: Layers, text: "קטלוגים שלמים בכמויות גדולות" },
];

/* ─── Before/After Slider ─── */
function ComparisonSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !dragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = rect.right - clientX;
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
      <img src="/gallery/brands-after.png" alt="אחרי" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${100 - position}%)` }}>
        <img src="/gallery/brands-before.png" alt="לפני" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="absolute top-0 bottom-0 w-[2px] bg-white/90 z-10" style={{ right: `${position}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 right-0 w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center">
          <GripVertical className="w-4 h-4 text-ink-muted" />
        </div>
      </div>
      <span className="absolute top-5 right-5 text-xs font-medium bg-white/90 text-ink px-3 py-1.5 rounded-full z-20 shadow-sm">לפני — תמונת מקור</span>
      <span className="absolute top-5 left-5 text-xs font-medium bg-teal text-white px-3 py-1.5 rounded-full z-20 shadow-sm">אחרי — דוגמנית AI</span>
    </div>
  );
}

/* ─── Page ─── */
export default function BrandsPage() {
  return (
    <div className="brands-page">
      {/* ── Nav ── */}
      <nav className="fixed top-0 right-0 left-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-8 sm:px-10 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-ink">
            Totalook<span className="text-teal">.ai</span>
          </span>
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
        {/* ── Hero ── */}
        <section className="bg-cream" style={{ paddingTop: '10rem', paddingBottom: '3rem' }}>
          <div className="max-w-6xl mx-auto px-8 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                <motion.h1
                  variants={fadeIn}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.2] mb-8"
                >
                  תמונות מוצר וסרטונים למותגי אופנה בבינה מלאכותית
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
                className="max-h-[50vh] md:max-h-none"
              >
                <ComparisonSlider />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Trust Bar ── */}
        <section className="py-20 md:py-28 bg-ink text-white">
          <div className="max-w-6xl mx-auto px-8 sm:px-10">
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }} variants={fadeIn}
              className="text-2xl md:text-3xl font-bold text-center mb-14"
            >
              למה מותגים בוחרים ב-Totalook
            </motion.h2>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }} variants={stagger}
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

        {/* ── 4 Pillars ── */}
        <section className="py-24 md:py-32 bg-cream">
          <div className="max-w-5xl mx-auto px-8 sm:px-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }} variants={stagger}>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-ink mb-8 text-center">
                איך אנחנו עובדים
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-ink-light leading-relaxed mb-28 text-center max-w-3xl mx-auto">
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
                  <h3 className="text-xl font-bold text-ink">מותאם למותג שלכם</h3>
                  <p className="text-base text-ink-light leading-relaxed">
                    כל הפקה מותאמת אישית לשפה החזותית של המותג — סגנון, אווירה, קהל יעד. דוגמניות שמתאימות בדיוק ללוק שאתם מחפשים.
                  </p>
                </motion.div>
                <motion.div variants={fadeIn} className="space-y-5 px-2">
                  <Globe className="w-7 h-7 text-ink/30" strokeWidth={1.25} />
                  <h3 className="text-xl font-bold text-ink">הפקות מסביב לעולם</h3>
                  <p className="text-base text-ink-light leading-relaxed">
                    הציבו את הקולקציה שלכם בכל מקום שתחלמו עליו — מרחובות פריז ועד חופי יוון, גגות תל אביב או סטודיו לבן מינימליסטי.
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

        {/* ── Model Gallery ── */}
        <section className="py-20 md:py-28 bg-cream">
          <div className="max-w-6xl mx-auto px-8 sm:px-10">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }} variants={fadeIn}
              className="text-3xl md:text-4xl font-bold text-ink text-center mb-6">
              נבחרת הפרזנטורים שלכם: התאמה מדויקת לכל קהל יעד
            </motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }} variants={fadeIn}
              className="text-base text-ink-light text-center mb-14 max-w-2xl mx-auto leading-relaxed">
              אלו רק דוגמאות — אנחנו יוצרים כל דוגמן ודוגמנית בהתאמה מלאה למותג שלכם: גיל, מראה, סגנון, כל מה שתבקשו.
            </motion.p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { src: "/models/sienna.png", alt: "Sienna" },
                { src: "/models/model-sitting.png", alt: "דוגמנית יושבת" },
                { src: "/models/idris.png", alt: "Idris" },
                { src: "/models/valentina.png", alt: "Valentina" },
                { src: "/models/kai.png", alt: "Kai" },
                { src: "/models/model-couple.png", alt: "זוג במדבר" },
              ].map((img, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }} variants={fadeIn}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                  <Image src={img.src} alt={img.alt} fill className="object-cover object-top" sizes="(max-width: 768px) 45vw, 30vw" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-32 md:py-40 bg-ink">
          <div className="max-w-3xl mx-auto px-8 sm:px-10 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }} variants={stagger}>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight">
                בואו נדבר
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-white/65 leading-relaxed mb-14 max-w-xl mx-auto">
                ספרו לנו על המותג שלכם ונבנה יחד את ההפקה הוויזואלית המושלמת — בלי ימי צילום, בלי לוגיסטיקה, רק תוצאות.
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
              <motion.div variants={fadeIn}>
                <span className="text-2xl font-bold text-white block mb-4">
                  Totalook<span className="text-teal">.ai</span>
                </span>
                <p className="text-sm text-white/45 max-w-sm mx-auto leading-relaxed">
                  תמונות מוצר וסרטונים למותגי אופנה בבינה מלאכותית. הפלטפורמה החדשנית ביותר בישראל.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-4 bg-[#0a0e14]">
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between text-[11px] text-white/20">
          <span>&copy; {new Date().getFullYear()} Totalook.ai</span>
          <span>All rights reserved.</span>
        </div>
      </footer>

      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 md:hidden w-14 h-14 bg-teal hover:bg-teal-hover rounded-full shadow-lg shadow-teal/30 flex items-center justify-center transition-colors"
        aria-label="לתיאום הפקה אישית"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
