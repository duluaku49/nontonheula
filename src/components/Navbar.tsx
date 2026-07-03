"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      setSearchOpen(false);
      setQ("");
    }
  };

  return (
    <nav style={{ background: "rgba(15,15,19,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div style={{ background: "linear-gradient(135deg, #6c63ff, #ff6584)", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 14 }}>▶</span>
          </div>
          <span style={{ fontWeight: 900, fontSize: 17, background: "linear-gradient(135deg, #6c63ff, #ff6584)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            NONTON HEULA
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5 text-sm" style={{ color: "#8888aa" }}>
          {[["Home", "/"], ["Series", "/category/series"], ["Movies", "/category/movies"], ["Anime", "/category/anime"], ["K-Drama", "/category/korea"]].map(([l, h]) => (
            <Link key={h} href={h} style={{ fontWeight: 500 }} className="hover:text-white transition-colors">{l}</Link>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex">
              <input
                autoFocus
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Cari film..."
                style={{ background: "#1e1e28", border: "1px solid rgba(108,99,255,0.4)", borderRadius: "8px 0 0 8px", padding: "7px 12px", color: "#f0f0f5", fontSize: 13, outline: "none", width: 200 }}
              />
              <button type="submit" style={{ background: "linear-gradient(135deg, #6c63ff, #ff6584)", border: "none", borderRadius: "0 8px 8px 0", padding: "7px 12px", cursor: "pointer", color: "#fff" }}>
                🔍
              </button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 8, padding: "7px 12px", color: "#8888aa", cursor: "pointer", fontSize: 16 }}>
              🔍
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
