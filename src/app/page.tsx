"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ContentGrid from "@/components/ContentGrid";
import { ContentItem } from "@/lib/api";

const CATEGORIES = [
  { id: "trending", label: "🔥 Trending", active: true },
  { id: "new", label: "🆕 Terbaru" },
  { id: "top", label: "⭐ Top Rated" },
  { id: "series", label: "📺 Series" },
  { id: "movies", label: "🎞️ Movies" },
];

const REGIONS = [
  { id: "korea", label: "🇰🇷 Korea" },
  { id: "china", label: "🇨🇳 China" },
  { id: "japan", label: "🇯🇵 Japan" },
  { id: "thailand", label: "🇹🇭 Thailand" },
  { id: "anime", label: "🗾 Anime" },
];

export default function HomePage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("trending");

  useEffect(() => {
    fetchContent(activeTab);
  }, [activeTab]);

  async function fetchContent(tab: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/content?tab=${tab}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      setItems([]);
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-14">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-96 bg-gradient-to-b from-red-900/20 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
              Nonton<span className="text-red-500">Heula</span> 🍿
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-lg">
              Streaming film & series terlengkap. K-Drama, C-Drama, Anime, dan lainnya. Gratis!
            </p>
          </div>
        </div>

        {/* Category pills */}
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`pill ${activeTab === cat.id ? "pill-active" : "pill-inactive"}`}
              >
                {cat.label}
              </button>
            ))}
            <div className="w-px h-8 bg-white/10 mx-1 flex-shrink-0 self-center" />
            {REGIONS.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setActiveTab(reg.id)}
                className={`pill ${activeTab === reg.id ? "pill-active" : "pill-inactive"}`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <ContentGrid items={items} loading={loading} />

        {/* Footer */}
        <footer className="border-t border-white/5 mt-12 py-8 text-center text-gray-600 text-xs px-4">
          <p>© 2026 NontonHeula. Powered by TheMovieBox API.</p>
          <p className="mt-1">Kami tidak menyimpan file video apapun di server.</p>
        </footer>
      </main>
    </>
  );
}
