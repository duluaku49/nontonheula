"use client";

import ContentCard from "./ContentCard";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface ContentGridProps {
  items: any[];
  title?: string;
  loading?: boolean;
}

export default function ContentGrid({ items, title, loading }: ContentGridProps) {
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        {title && <h2 className="text-xl font-bold text-white mb-4">{title}</h2>}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] rounded-lg skeleton" />
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500 text-lg">Tidak ada konten tersedia</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {title && <h2 className="text-xl font-bold text-white mb-4">{title}</h2>}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
        {items.map((item: any, idx: number) => (
          <ContentCard key={item.id || idx} item={item} />
        ))}
      </div>
    </div>
  );
}
