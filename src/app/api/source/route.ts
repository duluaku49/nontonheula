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
  const id = req.nextUrl.searchParams.get("id");
  const ep = req.nextUrl.searchParams.get("ep") || "";
  const detailPath = req.nextUrl.searchParams.get("detailPath") || id;

  if (!id && !detailPath) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const params = new URLSearchParams();
    params.set("id", id || "");
    if (ep) params.set("episode", ep);
    if (detailPath) params.set("detailPath", detailPath);

    const res = await fetch(
      `${UPSTREAM}/api/stream?${params.toString()}`,
      { headers: HEADERS, cache: "no-store" }
    );
    if (!res.ok) {
      return NextResponse.json({ error: "Source not found" }, { status: 404 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
