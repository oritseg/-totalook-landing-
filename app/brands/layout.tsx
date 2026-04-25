import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Totalook.ai — תמונות מוצר וסרטונים למותגי אופנה בבינה מלאכותית",
  description:
    "הפלטפורמה החדשנית ביותר בישראל. תמונות מוצר וסרטוני אופנה באיכות מגזינית, על דוגמניות AI. בלי ימי צילום, בלי לוגיסטיקה.",
  openGraph: {
    title: "Totalook.ai — תמונות מוצר וסרטונים למותגי אופנה",
    description:
      "תמונות מוצר וסרטוני אופנה באיכות מגזינית, על דוגמניות AI. קטלוגים שלמים בכמויות גדולות.",
    type: "website",
    locale: "he_IL",
    images: [{ url: "/og-brands.png", width: 1200, height: 630 }],
  },
};

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
