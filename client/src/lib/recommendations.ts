/* Soft Signal style reminder: keep data presentation opinionated, editorial, and human rather than catalog-like. */

export type Format = "movie" | "show";

export type Title = {
  id: string;
  format: Format;
  title: string;
  year: number;
  runtime: string;
  genres: string[];
  tags: string[];
  description: string;
  reason: string;
  director?: string;
  palette: string;
  poster?: string;
  accent: string;
};

export const titles: Title[] = [
  {
    id: "quiet-girl",
    format: "movie",
    title: "The Quiet Girl",
    year: 2022,
    runtime: "1h 35m",
    genres: ["Drama", "Coming-of-age"],
    tags: ["tender", "slow-burn", "intimate"],
    description: "A withdrawn girl discovers a different kind of family during one luminous Irish summer.",
    reason: "You like stories that take their time and leave a little light on.",
    director: "Colm Bairéad",
    palette: "from-[#26323a] via-[#526558] to-[#c8a66a]",
    poster: "/manus-storage/reelwise-poster-night_4f335cc3.jpg",
    accent: "#c68f4b",
  },
  {
    id: "petite-maman",
    format: "movie",
    title: "Petite Maman",
    year: 2021,
    runtime: "1h 12m",
    genres: ["Drama", "Fantasy"],
    tags: ["tender", "intimate", "magical"],
    description: "A child meets a mysterious new friend while exploring the woods behind her grandmother's house.",
    reason: "A small, precise film about grief, play, and the strange shape of memory.",
    director: "Céline Sciamma",
    palette: "from-[#d5c8b1] via-[#8a9d7e] to-[#c96243]",
    accent: "#c96243",
  },
  {
    id: "after-yang",
    format: "movie",
    title: "After Yang",
    year: 2021,
    runtime: "1h 36m",
    genres: ["Sci-fi", "Drama"],
    tags: ["quiet", "philosophical", "tender"],
    description: "When a family's android companion stops working, they begin to notice the life that was already there.",
    reason: "Thoughtful science fiction with more warmth than machinery.",
    director: "Kogonada",
    palette: "from-[#b9d0d2] via-[#d9b38d] to-[#314954]",
    accent: "#547b80",
  },
  {
    id: "past-lives",
    format: "movie",
    title: "Past Lives",
    year: 2023,
    runtime: "1h 46m",
    genres: ["Romance", "Drama"],
    tags: ["yearning", "intimate", "quiet"],
    description: "Two childhood friends revisit the roads not taken across two decades and two cities.",
    reason: "For the evenings when the feeling matters more than the plot.",
    director: "Celine Song",
    palette: "from-[#8a5442] via-[#d7b08f] to-[#293c4a]",
    accent: "#af654b",
  },
  {
    id: "perfect-days",
    format: "movie",
    title: "Perfect Days",
    year: 2023,
    runtime: "2h 4m",
    genres: ["Drama", "Slice of life"],
    tags: ["quiet", "ritual", "observational"],
    description: "A Tokyo caretaker finds a rich rhythm in the small, repeatable beauty of ordinary days.",
    reason: "A reset button disguised as a film.",
    director: "Wim Wenders",
    palette: "from-[#526e63] via-[#dfc9a0] to-[#b7674b]",
    accent: "#b7674b",
  },
  {
    id: "field-notes",
    format: "show",
    title: "Field Notes",
    year: 2024,
    runtime: "2 seasons",
    genres: ["Drama", "Mystery"],
    tags: ["slow-burn", "moody", "observational"],
    description: "A young archivist returns to a coastal town where every family keeps one story off the record.",
    reason: "You liked the slow burn. Try this.",
    director: "Mara Evers",
    palette: "from-[#b4bd9a] via-[#e5c89b] to-[#a65b45]",
    poster: "/manus-storage/reelwise-poster-moss_eda4db8d.jpg",
    accent: "#a65b45",
  },
  {
    id: "the-bear",
    format: "show",
    title: "The Bear",
    year: 2022,
    runtime: "3 seasons",
    genres: ["Comedy", "Drama"],
    tags: ["urgent", "ensemble", "messy"],
    description: "A gifted chef returns home to run the family sandwich shop, bringing ambition and old wounds with him.",
    reason: "The comfort of a pressure cooker: messy, funny, and deeply felt.",
    director: "Christopher Storer",
    palette: "from-[#c75b42] via-[#e0b276] to-[#32373a]",
    accent: "#d94f3d",
  },
  {
    id: "slow-horses",
    format: "show",
    title: "Slow Horses",
    year: 2022,
    runtime: "4 seasons",
    genres: ["Thriller", "Drama"],
    tags: ["wry", "ensemble", "sharp"],
    description: "Disgraced spies in an overlooked department find that the work is never quite as quiet as promised.",
    reason: "A smart, dry thriller with characters worth following home.",
    director: "Will Smith",
    palette: "from-[#4d5f5a] via-[#b9a681] to-[#bc5c46]",
    accent: "#bc5c46",
  },
  {
    id: "station-eleven",
    format: "show",
    title: "Station Eleven",
    year: 2021,
    runtime: "Limited series",
    genres: ["Drama", "Sci-fi"],
    tags: ["tender", "haunting", "hopeful"],
    description: "A travelling theatre troupe carries art and memory across a changed world.",
    reason: "Big questions told through close, beautiful human details.",
    director: "Patrick Somerville",
    palette: "from-[#3e5050] via-[#c3b183] to-[#d96b4a]",
    accent: "#d96b4a",
  },
  {
    id: "fleabag",
    format: "show",
    title: "Fleabag",
    year: 2016,
    runtime: "2 seasons",
    genres: ["Comedy", "Drama"],
    tags: ["wry", "intimate", "messy"],
    description: "A fiercely funny woman tries to keep moving while grief keeps finding the gaps.",
    reason: "For when you want a laugh that knows exactly where it hurts.",
    director: "Phoebe Waller-Bridge",
    palette: "from-[#9b4b43] via-[#d59a79] to-[#e7d3af]",
    accent: "#9b4b43",
  },
  {
    id: "severance",
    format: "show",
    title: "Severance",
    year: 2022,
    runtime: "2 seasons",
    genres: ["Sci-fi", "Thriller"],
    tags: ["precise", "eerie", "philosophical"],
    description: "Office workers undergo a procedure that divides their work memories from their personal lives.",
    reason: "A very clean office with some very strange things underneath.",
    director: "Dan Erickson",
    palette: "from-[#b6c8c8] via-[#8ba5a0] to-[#c6a77d]",
    accent: "#527b76",
  },
];

export type WatchedItem = { id: string; watchedAt: string };

export function scoreTitle(title: Title, watched: WatchedItem[], skipped: string[]) {
  const watchedTitles = watched.map((item) => titles.find((candidate) => candidate.id === item.id)).filter(Boolean) as Title[];
  const genreCounts = watchedTitles.flatMap((item) => item.genres).reduce<Record<string, number>>((acc, genre) => {
    acc[genre] = (acc[genre] ?? 0) + 1;
    return acc;
  }, {});
  const tagCounts = watchedTitles.flatMap((item) => item.tags).reduce<Record<string, number>>((acc, tag) => {
    acc[tag] = (acc[tag] ?? 0) + 1;
    return acc;
  }, {});
  const genreScore = title.genres.reduce((sum, genre) => sum + (genreCounts[genre] ?? 0) * 11, 0);
  const tagScore = title.tags.reduce((sum, tag) => sum + (tagCounts[tag] ?? 0) * 7, 0);
  const formatBoost = watchedTitles.filter((item) => item.format === title.format).length * 5;
  const skipPenalty = skipped.includes(title.id) ? 16 : 0;
  return 35 + genreScore + tagScore + formatBoost + title.year / 100 - skipPenalty;
}

export function getRecommendation(format: Format, watched: WatchedItem[], skipped: string[], excludeId?: string) {
  const candidates = titles
    .filter((title) => title.format === format && !watched.some((item) => item.id === title.id) && title.id !== excludeId)
    .sort((a, b) => scoreTitle(b, watched, skipped) - scoreTitle(a, watched, skipped));
  return candidates[0] ?? titles.find((title) => title.format === format && title.id !== excludeId) ?? titles.find((title) => title.format === format)!;
}

export function getMatchScore(title: Title, watched: WatchedItem[]) {
  const watchedTitles = watched.map((item) => titles.find((candidate) => candidate.id === item.id)).filter(Boolean) as Title[];
  if (!watchedTitles.length) return 92;
  const sharedGenres = watchedTitles.flatMap((item) => item.genres).filter((genre) => title.genres.includes(genre)).length;
  const sharedTags = watchedTitles.flatMap((item) => item.tags).filter((tag) => title.tags.includes(tag)).length;
  return Math.min(98, 78 + sharedGenres * 5 + sharedTags * 3);
}

export function getSignalSummary(watched: WatchedItem[]) {
  const watchedTitles = watched.map((item) => titles.find((candidate) => candidate.id === item.id)).filter(Boolean) as Title[];
  const counts = watchedTitles.flatMap((item) => item.genres).reduce<Record<string, number>>((acc, genre) => {
    acc[genre] = (acc[genre] ?? 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
}
