"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";

export default function ContentCard({ item }: { item: any }) {
  const title = item.title || "Untitled";
  const poster = item.poster || "";
  const rating = item.rating || "";
  const year = item.year || "";
  const type = item.type === "movie" ? "FILM" : item.type === "tv" ? "SERIES" : "";
  const detailPath = encodeURIComponent(item.detailPath || item.id || "");

  return (
    <Link href={`/watch/${detailPath}`} className="card block">
      <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", background: "#1e1e28", aspectRatio: "2/3" }}>
        {poster ? (
          <Image src={poster} alt={title} fill sizes="(max-width:640px) 33vw, 20vw"
            style={{ objectFit: "cover", transition: "transform 0.3s" }} unoptimized />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#333", fontSize: 32 }}>🎬</div>
        )}

        {/* Rating */}
        {rating && (
          <div style={{ position: "absolute", top: 6, left: 6, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)", borderRadius: 6, padding: "2px 7px", fontSize: 11, fontWeight: 700, color: "#fbbf24" }}>
            ⭐ {rating}
          </div>
        )}

        {/* Type badge */}
        {type && (
          <div style={{ position: "absolute", top: 6, right: 6, background: "linear-gradient(135deg,#6c63ff,#ff6584)", borderRadius: 5, padding: "2px 6px", fontSize: 9, fontWeight: 800, color: "#fff", letterSpacing: "0.5px" }}>
            {type}
          </div>
        )}

        {/* Bottom fade */}
        <div style={{ position: "absolute", inset: "50% 0 0 0", background: "linear-gradient(to top, rgba(15,15,19,0.97) 0%, transparent 100%)" }} />

        {/* Title */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 10px" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#f0f0f5", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{title}</p>
          {year && <p style={{ fontSize: 10, color: "#8888aa", marginTop: 2 }}>{year}</p>}
        </div>
      </div>
    </Link>
  );
}
