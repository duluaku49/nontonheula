/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE = "https://h5-api.aoneroom.com";
const CDN_IMAGE = "https://pbcdnw.aoneroom.com";

export interface ContentItem {
  id: string;
  title: string;
  title_en?: string;
  cover: string;
  score?: number;
  year?: string;
  type?: string; // movie | series
  category?: string;
  episodes?: number;
  description?: string;
  genres?: string[];
  status?: string;
}

export interface ContentDetail extends ContentItem {
  episodes_list?: Episode[];
  sources?: VideoSource[];
  cast?: string[];
  director?: string;
  duration?: string;
  country?: string;
}

export interface Episode {
  id: string;
  number: number;
  title?: string;
  source_url?: string;
}

export interface VideoSource {
  quality: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

// Fetch trending/home content
export async function fetchHome(): Promise<ContentItem[]> {
  try {
    const res = await fetch(`${API_BASE}/h5/v3/home?platform=web&lang=id`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36",
        "Referer": "https://tv.mierebusbot.my.id/",
      },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return parseContentList(data);
  } catch {
    return [];
  }
}

// Fetch content by category/filter
export async function fetchCategory(
  category: string,
  page: number = 1
): Promise<ContentItem[]> {
  try {
    const res = await fetch(
      `${API_BASE}/h5/v3/filter?platform=web&lang=id&category=${category}&page=${page}&size=24`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36",
          "Referer": "https://tv.mierebusbot.my.id/",
        },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return parseContentList(data);
  } catch {
    return [];
  }
}

// Search content
export async function searchContent(query: string): Promise<ContentItem[]> {
  try {
    const res = await fetch(
      `${API_BASE}/h5/v3/search?platform=web&lang=id&keyword=${encodeURIComponent(query)}&page=1&size=24`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36",
          "Referer": "https://tv.mierebusbot.my.id/",
        },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return parseContentList(data);
  } catch {
    return [];
  }
}

// Fetch detail of a content
export async function fetchDetail(id: string): Promise<ContentDetail | null> {
  try {
    const res = await fetch(
      `${API_BASE}/h5/v3/detail?platform=web&lang=id&id=${id}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36",
          "Referer": "https://tv.mierebusbot.my.id/",
        },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return parseDetail(data);
  } catch {
    return null;
  }
}

// Fetch episode source/stream URL
export async function fetchEpisodeSource(
  id: string,
  episodeId: string
): Promise<VideoSource[]> {
  try {
    const res = await fetch(
      `${API_BASE}/h5/v3/source?platform=web&lang=id&id=${id}&episode_id=${episodeId}`,
      {
        cache: "no-store",
        headers: {
          "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36",
          "Referer": "https://tv.mierebusbot.my.id/",
        },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return parseVideoSources(data);
  } catch {
    return [];
  }
}

// --- Parsers (flexible to handle different API response shapes) ---

function parseContentList(data: any): ContentItem[] {
  // Try common response structures
  const items =
    data?.data?.list ||
    data?.data?.items ||
    data?.data?.results ||
    data?.data?.data ||
    data?.list ||
    data?.items ||
    data?.data ||
    [];

  if (!Array.isArray(items)) {
    // If data.data is an object with sections
    if (data?.data && typeof data.data === "object") {
      const allItems: ContentItem[] = [];
      for (const key of Object.keys(data.data)) {
        const section = data.data[key];
        if (Array.isArray(section)) {
          allItems.push(...section.map(mapContentItem).filter(Boolean));
        } else if (section?.list && Array.isArray(section.list)) {
          allItems.push(...section.list.map(mapContentItem).filter(Boolean));
        }
      }
      return allItems;
    }
    return [];
  }

  return items.map(mapContentItem).filter(Boolean) as ContentItem[];
}

function mapContentItem(item: any): ContentItem | null {
  if (!item) return null;
  return {
    id: String(item.id || item.vod_id || item.content_id || ""),
    title: item.title || item.name || item.vod_name || "",
    title_en: item.title_en || item.name_en || "",
    cover: fixImageUrl(item.cover || item.poster || item.vod_pic || item.image || ""),
    score: parseFloat(item.score || item.rating || item.vod_score || "0"),
    year: item.year || item.release_year || "",
    type: item.type || item.vod_type || "",
    category: item.category || item.class_name || "",
    episodes: item.episodes || item.total_episodes || 0,
    description: item.description || item.desc || item.vod_content || "",
    genres: item.genres || (item.genre ? item.genre.split(",") : []),
  };
}

function parseDetail(data: any): ContentDetail | null {
  const item = data?.data || data;
  if (!item) return null;

  const base = mapContentItem(item);
  if (!base) return null;

  return {
    ...base,
    episodes_list: parseEpisodes(item.episodes || item.episode_list || item.sources || []),
    cast: item.cast || item.actors ? (item.cast || item.actors.split?.(",") || []) : [],
    director: item.director || "",
    duration: item.duration || "",
    country: item.country || item.area || "",
  };
}

function parseEpisodes(episodes: any): Episode[] {
  if (!Array.isArray(episodes)) return [];
  return episodes.map((ep: any, idx: number) => ({
    id: String(ep.id || ep.episode_id || idx + 1),
    number: ep.number || ep.episode_number || idx + 1,
    title: ep.title || ep.name || `Episode ${idx + 1}`,
    source_url: ep.source_url || ep.url || "",
  }));
}

function parseVideoSources(data: any): VideoSource[] {
  const sources = data?.data?.sources || data?.data?.list || data?.data || [];
  if (!Array.isArray(sources)) {
    if (data?.data?.url) {
      return [{ quality: "auto", url: data.data.url }];
    }
    return [];
  }
  return sources.map((s: any) => ({
    quality: s.quality || s.label || "auto",
    url: s.url || s.src || "",
  }));
}

function fixImageUrl(url: string): string {
  if (!url) return "/placeholder.jpg";
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("http")) return url;
  return `${CDN_IMAGE}${url.startsWith("/") ? "" : "/"}${url}`;
}
