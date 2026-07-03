import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NontonHeula - Nonton Film & Series Gratis",
  description: "Streaming film dan series terlengkap. K-Drama, C-Drama, Anime, Movies & Series internasional. Gratis!",
  keywords: "streaming film, nonton gratis, k-drama, c-drama, anime, series, movies",
  openGraph: {
    title: "NontonHeula - Nonton Film & Series Gratis",
    description: "Platform streaming film dan series terlengkap",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script src="https://telegram.org/js/telegram-web-app.js" defer />
      </head>
      <body className="min-h-full flex flex-col tg-miniapp">
        {children}
      </body>
    </html>
  );
}
