import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import SmoothScroll from "@/src/components/smoothScroll";

const inter = Inter({ subsets: ["latin"] });

const syne = Syne({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://furqanramadhan.com"), // Update with your actual domain later
  title: {
    default: "Furqan Ramadhan | Portfolio",
    template: "%s | Furqan Ramadhan",
  },
  description:
    "Official Portfolio of Furqan Ramadhan. Frontend Developer & Informatics Student at Universitas Syiah Kuala. Specialized in Data Engineering and Full Stack Development.",
  keywords: [
    "Furqan Ramadhan",
    "Furqan",
    "Frontend Developer",
    "Next.js Portfolio",
    "Universitas Syiah Kuala",
    "Data Engineer",
  ],
  authors: [
    { name: "Furqan Ramadhan", url: "https://github.com/furqanramadhan" },
  ],
  creator: "Furqan Ramadhan",
  openGraph: {
    title: "Furqan Ramadhan | Portfolio",
    description:
      "Frontend Developer & Informatics Student at Universitas Syiah Kuala.",
    url: "https://github.com/furqanramadhan",
    siteName: "Furqan Ramadhan Portfolio",
    images: [
      {
        url: "/assets/image/home/home-1.jpeg", // Synced with your current home photo
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/assets/image/logo/icon_dark.svg",
    apple: "/assets/image/logo/icon_dark.svg",
  },
  verification: {
    google: "QNRD12HvAn5I9ktIjolB89WybBWKxDCOY1wWT3tiNc8", // You might want to update this later
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Furqan Ramadhan",
  url: "https://github.com/furqanramadhan",
  image: "https://github.com/furqanramadhan.png", // Direct link to your GitHub avatar
  sameAs: [
    "https://www.linkedin.com/in/furqan-ramadhan-a86808179",
    "https://github.com/furqanramadhan",
    "mailto:furqan2682@gmail.com",
  ],
  jobTitle: "Frontend Developer",
  worksFor: {
    "@type": "Organization",
    name: "Universitas Syiah Kuala",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} ${syne.variable}`}>
        <SmoothScroll />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}
        <Analytics />
      </body>
    </html>
  );
}
