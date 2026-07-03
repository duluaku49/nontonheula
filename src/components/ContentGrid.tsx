"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import ContentCard from "./ContentCard";

export default function ContentGrid({ items, title, loading }: { items: any[], title?: string, loading?: boolean }) {
  if (loading) return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px" }}>
      {title && <h2 style={{ fontWeight: 800, fontSize: 18, marginBottom: 14, color: "#f0f0f5" }}>{title}</h2>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ aspectRatio: "2/3" }} />
        ))}
      </div>
    </div>
  );

  if (!items || items.length === 0) return (
    <div style={{ textAlign: "center", padding: "60px 16px", color: "#8888aa" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🎬</div>
      <p>Tidak ada konten tersedia</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px" }}>
      {title && <h2 style={{ fontWeight: 800, fontSize: 18, marginBottom: 14, color: "#f0f0f5" }}>{title}</h2>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
        {items.map((item: any, idx: number) => (
          <ContentCard key={item.id || idx} item={item} />
        ))}
      </div>
    </div>
  );
}
