"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ContentGrid from "@/components/ContentGrid";
import { ContentItem } from "@/lib/api";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (q) {
      search(q);
    }
  }, [q]);

  async function search(query: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      setItems([]);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-1">
          Hasil pencarian: <span className="text-red-500">&quot;{q}&quot;</span>
        </h1>
        <p className="text-gray-500 text-sm mb-4">
          {loading ? "Mencari..." : `${items.length} hasil ditemukan`}
        </p>
      </div>
      <ContentGrid items={items} loading={loading} />
    </>
  );
}

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-14">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="skeleton h-8 w-64 rounded mb-4" />
            </div>
          }
        >
          <SearchContent />
        </Suspense>
      </main>
    </>
  );
}
