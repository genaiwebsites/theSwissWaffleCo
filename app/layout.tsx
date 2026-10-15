import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://theswisswaffle.co"),
  title: "The Swiss Waffle Co. — Layered Swissfully",
  description:
    "Layered Swissfully. Two crisp waffle halves with a molten filling, cut into a wedge and served warm in Lucknow until 2 a.m.",
  icons: {
    icon: "/assets/favicon.svg",
    apple: "/assets/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://theswisswaffle.co",
    siteName: "The Swiss Waffle Co.",
    title: "The Swiss Waffle Co. — Layered Swissfully",
    description:
      "Layered Swissfully. Two crisp waffle halves with a molten filling, cut into a wedge and served warm in Lucknow until 2 a.m.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "The Swiss Waffle Co.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Swiss Waffle Co. — Layered Swissfully",
    description:
      "Layered Swissfully. Two crisp waffle halves with a molten filling, cut into a wedge and served warm in Lucknow until 2 a.m.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "The Swiss Waffle Co.",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#DE301F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <noscript>
          <style>{`.hero-title{opacity:1!important;visibility:visible!important}`}</style>
        </noscript>
        <script src="/assets/js/vendor/gsap.min.js" defer></script>
        <script src="/assets/js/vendor/ScrollTrigger.min.js" defer></script>
        <script src="/assets/js/vendor/SplitText.min.js" defer></script>
        <script src="/assets/js/vendor/DrawSVGPlugin.min.js" defer></script>
        <script src="/assets/js/vendor/lenis.min.js" defer></script>
        <script src="/assets/js/vendor/motion.js" defer></script>
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
