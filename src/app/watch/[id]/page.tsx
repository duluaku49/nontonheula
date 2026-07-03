"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, use } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const decodedId = decodeURIComponent(id);
  const [detail, setDetail] = useState<any>(null);
  const [streamUrl, setStreamUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeEp, setActiveEp] = useState<any>(null);

  useEffect(() => { fetchDetail(); }, [id]);

  async function fetchDetail() {
    setLoading(true);
    try {
      const res = await fetch(`/api/detail?id=${encodeURIComponent(decodedId)}`);
      const data = await res.json();
      const d = data?.data || data;
      setDetail(d);
      const eps = d?.episodes || d?.episode_list || [];
      const firstEp = eps[0] || null;
      setActiveEp(firstEp);
      loadStream(decodedId, firstEp);
    } catch { setDetail(null); }
    setLoading(false);
  }

  async function loadStream(contentId: string, ep: any) {
    setStreamUrl("");
    try {
      const params = new URLSearchParams({ id: contentId, detailPath: contentId });
      if (ep) params.set("ep", ep.id || ep.episode_id || String(ep.number || 1));
      const res = await fetch(`/api/source?${params}`);
      const data = await res.json();
      const url = data?.url || data?.data?.url || data?.stream_url || data?.data?.stream_url || "";
      setStreamUrl(url);
    } catch { setStreamUrl(""); }
  }

  function selectEp(ep: any) {
    setActiveEp(ep);
    loadStream(decodedId, ep);
  }

  if (loading) return (
    <>
      <Navbar />
      <main style={{ paddingTop: 56, maxWidth: 900, margin: "0 auto", padding: "70px 16px 32px" }}>
        <div className="skeleton" style={{ width: "100%", paddingTop: "56.25%", borderRadius: 12, marginBottom: 20 }} />
        <div className="skeleton" style={{ height: 32, width: 300, marginBottom: 10 }} />
        <div className="skeleton" style={{ height: 16, width: "80%" }} />
      </main>
    </>
  );

  if (!detail) return (
    <>
      <Navbar />
      <main style={{ paddingTop: 56, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>😕</div>
          <p style={{ color: "#8888aa", marginBottom: 16 }}>Konten tidak ditemukan</p>
          <Link href="/" style={{ color: "#6c63ff" }}>← Kembali</Link>
        </div>
      </main>
    </>
  );

  const title = detail.title || detail.name || "Untitled";
  const poster = detail.poster || detail.posterHQ || "";
  const desc = detail.description || detail.overview || "";
  const rating = detail.rating || "";
  const year = detail.year || "";
  const genre = detail.genre || "";
  const episodes = detail.episodes || detail.episode_list || [];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 56, minHeight: "100vh" }}>
        {/* Video Player */}
        <div style={{ background: "#000", width: "100%" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div className="video-wrap">
              {streamUrl ? (
                <iframe src={streamUrl} allowFullScreen allow="autoplay; encrypted-media" />
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#555566" }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>⏳</div>
                  <p style={{ fontSize: 14 }}>Memuat video...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detail */}
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px 16px" }}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {/* Poster */}
            {poster && (
              <div style={{ flexShrink: 0, width: 100, borderRadius: 10, overflow: "hidden", position: "relative", aspectRatio: "2/3" }}>
                <Image src={poster} alt={title} fill style={{ objectFit: "cover" }} unoptimized />
              </div>
            )}

            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ fontSize: "clamp(18px, 4vw, 28px)", fontWeight: 900, marginBottom: 8 }}>{title}</h1>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                {rating && <span style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", padding: "3px 10px", borderRadius: 6, fontSize: 13, fontWeight: 700 }}>⭐ {rating}</span>}
                {year && <span style={{ background: "rgba(255,255,255,0.06)", color: "#8888aa", padding: "3px 10px", borderRadius: 6, fontSize: 13 }}>{year}</span>}
                {genre && <span style={{ background: "rgba(108,99,255,0.12)", color: "#9b93ff", padding: "3px 10px", borderRadius: 6, fontSize: 13 }}>{genre}</span>}
              </div>
              {desc && <p style={{ color: "#8888aa", fontSize: 14, lineHeight: 1.7, maxWidth: 600 }}>{desc}</p>}
            </div>
          </div>

          {/* Episodes */}
          {episodes.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 12 }}>📺 Episode</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {episodes.map((ep: any, idx: number) => {
                  const isActive = activeEp === ep;
                  return (
                    <button key={ep.id || idx} onClick={() => selectEp(ep)} style={{
                      padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                      border: "none", cursor: "pointer", transition: "all 0.2s",
                      background: isActive ? "linear-gradient(135deg,#6c63ff,#ff6584)" : "rgba(255,255,255,0.06)",
                      color: isActive ? "#fff" : "#8888aa",
                      boxShadow: isActive ? "0 4px 14px rgba(108,99,255,0.3)" : "none",
                    }}>
                      {ep.title || ep.name || `EP ${idx + 1}`}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
