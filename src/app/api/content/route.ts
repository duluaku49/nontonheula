/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

const UPSTREAM = "https://tv.mierebusbot.my.id";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
  "Referer": `${UPSTREAM}/`,
  "Origin": UPSTREAM,
  "Accept": "application/json",
};

// Map our tab names to upstream action names
const TAB_MAP: Record<string, string> = {
  trending: "hero",
  new: "newly-added",
  top: "top-rated",
  series: "western-tv",
  movies: "movies",
  korea: "kdrama",
  china: "cdrama",
  japan: "anime",
  thailand: "thai-drama",
  anime: "anime",
  indonesia: "indonesian-movies",
  bollywood: "bollywood",
  action: "action",
  drama: "drama",
  romance: "romance",
  comedy: "comedy",
  horror: "horror",
  thriller: "thriller",
  crime: "crime",
  mystery: "mystery",
  "sci-fi": "sci-fi",
  fantasy: "fantasy",
  animation: "animation",
  documentary: "documentary",
  family: "family",
  history: "history",
  adventure: "adventure",
  war: "war",
  music: "music",
  reality: "reality",
  marvel: "marvel",
  dc: "dc",
  "imdb-top250": "imdb-top250",
  boxoffice: "boxoffice",
};

export async function GET(req: NextRequest) {
  const tab = req.nextUrl.searchParams.get("tab") || "trending";
  const page = req.nextUrl.searchParams.get("page") || "1";

  const action = TAB_MAP[tab] || tab;

  try {
    const url = `${UPSTREAM}/api/idx?action=${encodeURIComponent(action)}&page=${page}`;
    const res = await fetch(url, { headers: HEADERS, cache: "no-store" });
    
    if (!res.ok) {
      return NextResponse.json({ items: [], error: `Upstream ${res.status}` });
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e: any) {
    console.error("Content API Error:", e.message);
    return NextResponse.json({ items: [], error: e.message });
  }
}
