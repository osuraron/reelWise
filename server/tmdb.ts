import { ENV } from "./_core/env";

export type LiveFormat = "movie" | "show";

export type LiveTitle = {
  id: string;
  format: LiveFormat;
  title: string;
  year: number;
  rating?: number;
  runtime: string;
  genres: string[];
  tags: string[];
  description: string;
  reason: string;
  palette: string;
  poster?: string;
  accent: string;
};

type TmdbDiscoverResult = {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  overview?: string;
  poster_path?: string | null;
  genre_ids?: number[];
  vote_average?: number;
  popularity?: number;
};

type TmdbDiscoverResponse = { results: TmdbDiscoverResult[] };

const API_BASE = "https://api.themoviedb.org/3";
const POSTER_BASE = "https://image.tmdb.org/t/p/w780";
const CACHE_MS = 15 * 60 * 1000;
const palettes = [
  "from-[#1e4d52] via-[#437a7a] to-[#b3d2c2]",
  "from-[#7d2f2a] via-[#bd604a] to-[#e7bc8a]",
  "from-[#263449] via-[#6f82a3] to-[#c4b2b7]",
  "from-[#3b4231] via-[#829064] to-[#d8c7a0]",
  "from-[#4a3248] via-[#9a6d8c] to-[#e0bcbb]",
  "from-[#244252] via-[#5b92a6] to-[#d1d7c9]",
];

const movieGenres: Record<number, string> = {
  12: "Adventure", 14: "Fantasy", 16: "Animation", 18: "Drama", 27: "Horror", 28: "Action", 35: "Comedy", 36: "History", 53: "Thriller", 80: "Crime", 99: "Documentary", 878: "Sci-fi", 9648: "Mystery", 10402: "Music", 10749: "Romance", 10751: "Family", 10752: "War", 37: "Western",
};

const showGenres: Record<number, string> = {
  16: "Animation", 18: "Drama", 35: "Comedy", 37: "Western", 80: "Crime", 99: "Documentary", 9648: "Mystery", 10751: "Family", 10759: "Action", 10762: "Kids", 10763: "News", 10764: "Reality", 10765: "Sci-fi", 10766: "Soap", 10767: "Talk", 10768: "War",
};

const cache = new Map<LiveFormat, { expiresAt: number; titles: LiveTitle[] }>();

export function clearTmdbCache() {
  cache.clear();
}

function formatGenres(ids: number[] | undefined, format: LiveFormat) {
  const source = format === "movie" ? movieGenres : showGenres;
  const genres = (ids ?? []).map((id) => source[id]).filter(Boolean);
  return genres.length ? genres.slice(0, 3) : [format === "movie" ? "Cinema" : "Series"];
}

function asLiveTitle(item: TmdbDiscoverResult, format: LiveFormat, index: number): LiveTitle | null {
  const title = item.title ?? item.name;
  if (!title) return null;

  const genres = formatGenres(item.genre_ids, format);
  const year = Number.parseInt((item.release_date ?? item.first_air_date ?? "").slice(0, 4), 10) || new Date().getFullYear();
  const score = Math.round((item.vote_average ?? 0) * 10);

  return {
    id: `tmdb-${format}-${item.id}`,
    format,
    title,
    year,
    rating: typeof item.vote_average === "number" && item.vote_average > 0 ? Math.round(item.vote_average * 10) / 10 : undefined,
    runtime: format === "movie" ? "Feature" : "Series",
    genres,
    tags: [...genres.map((genre) => genre.toLowerCase()), "live-discovery", year >= 2020 ? "current" : "essential"],
    description: item.overview || "A live discovery from the Reelwise catalogue, ready for your next watchlist moment.",
    reason: score >= 75 ? `A well-received ${genres[0].toLowerCase()} pick from the live catalogue.` : `A fresh ${genres[0].toLowerCase()} discovery to keep the queue moving.`,
    palette: palettes[index % palettes.length]!,
    poster: item.poster_path ? `${POSTER_BASE}${item.poster_path}` : undefined,
    accent: "#d94f3d",
  };
}

async function discoverPage(format: LiveFormat, page: number): Promise<TmdbDiscoverResponse> {
  if (!ENV.tmdbApiKey) throw new Error("TMDB_API_KEY is not configured");

  const endpoint = format === "movie" ? "discover/movie" : "discover/tv";
  const query = new URLSearchParams({
    api_key: ENV.tmdbApiKey,
    language: "en-US",
    page: String(page),
    sort_by: "popularity.desc",
    include_adult: "false",
    "vote_count.gte": "80",
    "vote_average.gte": "5.8",
  });
  const response = await fetch(`${API_BASE}/${endpoint}?${query.toString()}`);
  if (!response.ok) throw new Error(`TMDB discovery failed with ${response.status}`);
  return (await response.json()) as TmdbDiscoverResponse;
}

export async function discoverLiveTitles(format: LiveFormat): Promise<LiveTitle[]> {
  const existing = cache.get(format);
  if (existing && existing.expiresAt > Date.now()) return existing.titles;

  const pages = await Promise.all([1, 2, 3].map((page) => discoverPage(format, page)));
  const titles = pages
    .flatMap((page) => page.results)
    .map((item, index) => asLiveTitle(item, format, index))
    .filter((item): item is LiveTitle => Boolean(item));
  cache.set(format, { titles, expiresAt: Date.now() + CACHE_MS });
  return titles;
}
