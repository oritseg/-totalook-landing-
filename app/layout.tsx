import type { Metadata } from "next";
import { Playfair_Display, Assistant } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Totalook.ai — תמונות מוצר וסרטונים לאופנה צנועה בבינה מלאכותית",
  description:
    "הראשונים בישראל באופנה צנועה. תמונות מוצר וסרטוני אופנה באיכות מגזינית, על דוגמניות AI צנועות. בלי ימי צילום, בלי לוגיסטיקה.",
  openGraph: {
    title: "Totalook.ai — אופנה צנועה בבינה מלאכותית",
    description:
      "תמונות מוצר וסרטוני אופנה באיכות מגזינית, על דוגמניות AI צנועות.",
    type: "website",
    locale: "he_IL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${playfair.variable} ${assistant.variable}`}>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
