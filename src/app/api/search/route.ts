/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

const UPSTREAM = "https://tv.mierebusbot.my.id";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
  "Referer": `${UPSTREAM}/`,
  "Origin": UPSTREAM,
  "Accept": "application/json",
};

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const page = req.nextUrl.searchParams.get("page") || "1";
  if (!q.trim()) {
    return NextResponse.json({ items: [] });
  }

  try {
    const res = await fetch(
      `${UPSTREAM}/api/idx?action=search&q=${encodeURIComponent(q)}&page=${page}`,
      { headers: HEADERS, cache: "no-store" }
    );
    if (!res.ok) {
      return NextResponse.json({ items: [] });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ items: [], error: e.message });
  }
}
