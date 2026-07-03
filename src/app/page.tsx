"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ContentGrid from "@/components/ContentGrid";

const TABS = [
  { id: "hero", label: "🔥 Trending" },
  { id: "newly-added", label: "🆕 Terbaru" },
  { id: "top-rated", label: "⭐ Top" },
  { id: "movies", label: "🎬 Film" },
  { id: "kdrama", label: "🇰🇷 K-Drama" },
  { id: "cdrama", label: "🇨🇳 C-Drama" },
  { id: "anime", label: "🗾 Anime" },
  { id: "thai-drama", label: "🇹🇭 Thai" },
  { id: "action", label: "💥 Action" },
  { id: "horror", label: "👻 Horror" },
  { id: "romance", label: "💕 Romance" },
  { id: "comedy", label: "😂 Comedy" },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function HomePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => { load(activeTab); }, [activeTab]);

  async function load(tab: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/content?tab=${tab}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch { setItems([]); }
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 56, minHeight: "100vh" }}>

        {/* Hero Banner */}
        <div style={{ position: "relative", padding: "48px 16px 32px", maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)", borderRadius: 999, padding: "4px 14px", marginBottom: 16 }}>
            <span style={{ width: 7, height: 7, background: "#6c63ff", borderRadius: "50%", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 12, color: "#6c63ff", fontWeight: 600 }}>STREAMING GRATIS</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 12 }}>
            Nonton Film &amp; Series
            <br />
            <span style={{ background: "linear-gradient(135deg, #6c63ff, #ff6584)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Tanpa Batas 🍿
            </span>
          </h1>
          <p style={{ color: "#8888aa", fontSize: 15, maxWidth: 500, lineHeight: 1.6 }}>
            K-Drama, C-Drama, Anime, Film &amp; Series Internasional — semua gratis di Nonton Heula.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px 12px" }}>
          <div className="scrollbar-hide" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`pill ${activeTab === t.id ? "pill-on" : "pill-off"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <ContentGrid items={items} loading={loading} />

        {/* Footer */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 40, padding: "24px 16px", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#555566" }}>© 2026 Nonton Heula. Powered by third-party streaming API.</p>
          <p style={{ fontSize: 11, color: "#444455", marginTop: 4 }}>Kami tidak menyimpan file video di server kami.</p>
        </footer>
      </main>
    </>
  );
}
