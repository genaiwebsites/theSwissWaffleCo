import type { Metadata, Viewport } from "next";

const siteUrl = "https://www.theswisswaffle.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Swiss Waffle Co. — Layered Swissfully",
  description:
    "Layered Swissfully. Two crisp waffle halves with a molten filling, cut into a wedge and served warm in Lucknow until 2 a.m.",
  icons: {
    icon: "/assets/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "The Swiss Waffle Co.",
    title: "The Swiss Waffle Co. — Layered Swissfully",
    description:
      "Layered Swissfully. Two crisp waffle halves with a molten filling, cut into a wedge and served warm in Lucknow until 2 a.m.",
    images: [
      {
        url: `${siteUrl}/opengraph-image.png`,
        secureUrl: `${siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 1200,
        alt: "The Swiss Waffle Co. — Layered Swissfully",
        type: "image/png",
      },
      {
        url: `${siteUrl}/opengraph-image.jpg`,
        secureUrl: `${siteUrl}/opengraph-image.jpg`,
        width: 1200,
        height: 1200,
        alt: "The Swiss Waffle Co. — Layered Swissfully",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "The Swiss Waffle Co. — Layered Swissfully",
    description:
      "Layered Swissfully. Two crisp waffle halves with a molten filling, cut into a wedge and served warm in Lucknow until 2 a.m.",
    images: [
      {
        url: `${siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 1200,
        alt: "The Swiss Waffle Co. — Layered Swissfully",
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="image_src" href="https://www.theswisswaffle.com/opengraph-image.png" />
        <meta property="og:image:secure_url" content="https://www.theswisswaffle.com/opengraph-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
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
