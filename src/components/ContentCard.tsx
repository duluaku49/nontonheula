"use client";

import Image from "next/image";
import Link from "next/link";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ContentCard({ item }: { item: any }) {
  const title = item.title || "Untitled";
  const poster = item.poster || "";
  const rating = item.rating || "";
  const year = item.year || "";
  const type = item.type === "movie" ? "FILM" : item.type === "tv" ? "SERIES" : "";
  const detailPath = item.detailPath || item.id || "";

  return (
    <Link href={`/watch/${encodeURIComponent(detailPath)}`} className="group card-hover block">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
        {poster ? (
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm8 2l5 4-5 4V8z" />
            </svg>
          </div>
        )}
        
        {/* Rating badge */}
        {rating && (
          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-md">
            ⭐ {rating}
          </div>
        )}
        
        {/* Type badge */}
        {type && (
          <div className="absolute top-2 right-2 bg-red-600/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {type}
          </div>
        )}
        
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/90 to-transparent" />
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <h3 className="text-white text-xs sm:text-sm font-semibold line-clamp-2 leading-tight">
            {title}
          </h3>
          {year && (
            <p className="text-gray-400 text-[10px] mt-0.5">{year}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
