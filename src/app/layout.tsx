import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  ),
  title: {
    default:
      "AbroadPack Nepal — Packing list and supplies for students going abroad",
    template: "%s · AbroadPack Nepal",
  },
  description:
    "Build your abroad packing list online, see the weight against your baggage limit, and check every item at our Kathmandu office before you pay. For Nepali students flying to Germany, Australia, USA and more.",
  keywords: [
    "abroad packing list Nepal",
    "students going abroad Nepal",
    "study abroad shopping Kathmandu",
    "luggage weight calculator Nepal",
    "Nepal to Germany packing",
  ],
  openGraph: {
    type: "website",
    locale: "en_NP",
    siteName: "AbroadPack Nepal",
    title: "Everything you need to take abroad, in one trip",
    description:
      "Pick what you need, we collect it from Kathmandu wholesalers, you inspect it before paying.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AbroadPack Nepal",
    description: "Packing list and supplies for Nepali students going abroad.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
