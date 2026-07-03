"use client";

import { useState, useEffect, use } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [detail, setDetail] = useState<any>(null);
  const [source, setSource] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [activeEp, setActiveEp] = useState<string>("");

  useEffect(() => {
    fetchDetail();
  }, [id]);

  async function fetchDetail() {
    setLoading(true);
    try {
      const res = await fetch(`/api/detail?id=${id}`);
      const data = await res.json();
      setDetail(data?.data || data);

      // Auto-load first episode or movie source
      const episodes = data?.data?.episodes || data?.data?.episode_list || [];
      if (episodes.length > 0) {
        const firstEp = episodes[0];
        setActiveEp(firstEp.id || firstEp.episode_id || "1");
        loadSource(id, firstEp.id || firstEp.episode_id || "1");
      } else {
        loadSource(id, "");
      }
    } catch {
      setDetail(null);
    }
    setLoading(false);
  }

  async function loadSource(contentId: string, epId: string) {
    try {
      let url = `/api/source?id=${contentId}`;
      if (epId) url += `&ep=${epId}`;
      const res = await fetch(url);
      const data = await res.json();
      const src = data?.data?.url || data?.data?.sources?.[0]?.url || data?.url || "";
      setSource(src);
    } catch {
      setSource("");
    }
  }

  function selectEpisode(epId: string) {
    setActiveEp(epId);
    setSource("");
    loadSource(id, epId);
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-grow pt-14 max-w-7xl mx-auto px-4 py-8">
          <div className="video-container skeleton rounded-lg mb-6" />
          <div className="skeleton h-8 w-64 rounded mb-3" />
          <div className="skeleton h-4 w-full rounded mb-2" />
          <div className="skeleton h-4 w-3/4 rounded" />
        </main>
      </>
    );
  }

  if (!detail) {
    return (
      <>
        <Navbar />
        <main className="flex-grow pt-14 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-4">Konten tidak ditemukan</p>
            <Link href="/" className="text-red-500 hover:text-red-400">
              ← Kembali
            </Link>
          </div>
        </main>
      </>
    );
  }

  const title = detail.title || detail.name || detail.vod_name || "Untitled";
  const desc = detail.description || detail.desc || detail.vod_content || "";
  const episodes = detail.episodes || detail.episode_list || [];
  const score = detail.score || detail.rating || 0;
  const year = detail.year || detail.release_year || "";
  const genres = detail.genres || (detail.genre ? detail.genre.split(",") : []);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-14">
        {/* Video Player */}
        <div className="bg-black">
          <div className="max-w-5xl mx-auto">
            <div className="video-container bg-gray-900">
              {source ? (
                <iframe
                  src={source}
                  allowFullScreen
                  allow="autoplay; encrypted-media; picture-in-picture"
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <p>Memuat video...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6">
          {/* Title & Meta */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
            {score > 0 && (
              <span className="text-yellow-400 font-semibold">⭐ {parseFloat(score).toFixed(1)}</span>
            )}
            {year && <span>{year}</span>}
            {genres.length > 0 && (
              <div className="flex gap-1.5">
                {genres.slice(0, 4).map((g: string, i: number) => (
                  <span key={i} className="bg-white/10 px-2 py-0.5 rounded text-xs">{g.trim()}</span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          {desc && (
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-3xl">{desc}</p>
          )}

          {/* Episode List */}
          {episodes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-white mb-3">📺 Episodes</h3>
              <div className="flex flex-wrap gap-2">
                {episodes.map((ep: any, idx: number) => {
                  const epId = String(ep.id || ep.episode_id || idx + 1);
                  return (
                    <button
                      key={epId}
                      onClick={() => selectEpisode(epId)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeEp === epId
                          ? "bg-red-600 text-white shadow-lg"
                          : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
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
