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
    id: "worst-person",
    format: "movie",
    title: "The Worst Person in the World",
    year: 2021,
    runtime: "2h 8m",
    genres: ["Comedy", "Drama", "Romance"],
    tags: ["wry", "yearning", "messy"],
    description: "Four years in the life of a young woman trying to find her way through love, work, and the shape of a self.",
    reason: "A sharp, generous film for anyone still figuring it out.",
    director: "Joachim Trier",
    palette: "from-[#a95f4a] via-[#e1bb91] to-[#2f4650]",
    accent: "#a95f4a",
  },
  {
    id: "drive-my-car",
    format: "movie",
    title: "Drive My Car",
    year: 2021,
    runtime: "2h 59m",
    genres: ["Drama", "Literary"],
    tags: ["patient", "intimate", "philosophical"],
    description: "A theatre director and his driver build an unexpected language of trust while working through old grief.",
    reason: "Patient, literary, and quietly devastating in the best way.",
    director: "Ryûsuke Hamaguchi",
    palette: "from-[#718b89] via-[#d6b483] to-[#4e3d42]",
    accent: "#718b89",
  },
  {
    id: "the-holdovers",
    format: "movie",
    title: "The Holdovers",
    year: 2023,
    runtime: "2h 13m",
    genres: ["Comedy", "Drama"],
    tags: ["warm", "ensemble", "wry"],
    description: "A stranded teacher, a difficult student, and a grieving cook spend an unexpected Christmas together.",
    reason: "A warm ensemble piece with just enough winter in it.",
    director: "Alexander Payne",
    palette: "from-[#41575c] via-[#c98d65] to-[#e5cba5]",
    accent: "#c16b4e",
  },
  {
    id: "anatomy-of-a-fall",
    format: "movie",
    title: "Anatomy of a Fall",
    year: 2023,
    runtime: "2h 31m",
    genres: ["Thriller", "Drama"],
    tags: ["precise", "sharp", "moody"],
    description: "After a man's death in the French Alps, the line between a marriage and its story becomes the trial.",
    reason: "A precise mystery where every version of the truth has an edge.",
    director: "Justine Triet",
    palette: "from-[#8a918e] via-[#d9c6a0] to-[#8b4f46]",
    accent: "#8b4f46",
  },
  {
    id: "frances-ha",
    format: "movie",
    title: "Frances Ha",
    year: 2012,
    runtime: "1h 26m",
    genres: ["Comedy", "Drama"],
    tags: ["wry", "messy", "hopeful"],
    description: "A New York dancer keeps moving through friendship, apartments, and the awkward choreography of becoming herself.",
    reason: "Light on its feet, a little lost, and full of stubborn hope.",
    director: "Noah Baumbach",
    palette: "from-[#d37c67] via-[#dfb385] to-[#344a58]",
    accent: "#d37c67",
  },
  {
    id: "minari",
    format: "movie",
    title: "Minari",
    year: 2020,
    runtime: "1h 55m",
    genres: ["Drama", "Family"],
    tags: ["tender", "family", "hopeful"],
    description: "A Korean American family puts down roots in the Arkansas countryside and discovers what grows between them.",
    reason: "Tender without being tidy; a family story with real weather in it.",
    director: "Lee Isaac Chung",
    palette: "from-[#708761] via-[#d7b179] to-[#934f42]",
    accent: "#8b5d4f",
  },
  {
    id: "portrait-of-a-lady-on-fire",
    format: "movie",
    title: "Portrait of a Lady on Fire",
    year: 2019,
    runtime: "2h 2m",
    genres: ["Romance", "Drama"],
    tags: ["yearning", "intimate", "precise"],
    description: "On an isolated island, a painter is asked to make a portrait of a young woman who refuses to sit for it.",
    reason: "A love story built from glances, time, and the act of looking closely.",
    director: "Céline Sciamma",
    palette: "from-[#304b57] via-[#b76b4f] to-[#e2c89f]",
    accent: "#b76b4f",
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
  {
    id: "detectorists",
    format: "show",
    title: "Detectorists",
    year: 2014,
    runtime: "3 seasons",
    genres: ["Comedy", "Drama"],
    tags: ["quiet", "warm", "observational"],
    description: "Two friends search the English countryside for buried treasure while trying to keep life simple.",
    reason: "A soft-spoken comedy about friendship, patience, and the good things underfoot.",
    director: "Mackenzie Crook",
    palette: "from-[#7c9276] via-[#d5bd8e] to-[#b5694e]",
    accent: "#b5694e",
  },
  {
    id: "the-leftovers",
    format: "show",
    title: "The Leftovers",
    year: 2014,
    runtime: "3 seasons",
    genres: ["Drama", "Mystery"],
    tags: ["haunting", "philosophical", "tender"],
    description: "After a world-changing disappearance, the people left behind search for meaning without easy answers.",
    reason: "A strange, aching series that trusts you with the questions.",
    director: "Damon Lindelof",
    palette: "from-[#4b5961] via-[#c19a7a] to-[#54484e]",
    accent: "#b56e54",
  },
  {
    id: "the-americans",
    format: "show",
    title: "The Americans",
    year: 2013,
    runtime: "6 seasons",
    genres: ["Thriller", "Drama"],
    tags: ["precise", "moody", "urgent"],
    description: "Two undercover agents try to hold a family together while living inside an ever-tightening lie.",
    reason: "A tense spy story with the emotional detail of a marriage drama.",
    director: "Joe Weisberg",
    palette: "from-[#53636b] via-[#b9906e] to-[#8d4f46]",
    accent: "#8d4f46",
  },
  {
    id: "reservation-dogs",
    format: "show",
    title: "Reservation Dogs",
    year: 2021,
    runtime: "3 seasons",
    genres: ["Comedy", "Drama"],
    tags: ["warm", "ensemble", "hopeful"],
    description: "Four Indigenous teenagers hustle, dream, and mourn together in rural Oklahoma.",
    reason: "Funny, generous, and full of people who feel alive off-screen too.",
    director: "Sterlin Harjo",
    palette: "from-[#cf7657] via-[#d7b27d] to-[#456765]",
    accent: "#cf7657",
  },
  {
    id: "the-good-place",
    format: "show",
    title: "The Good Place",
    year: 2016,
    runtime: "4 seasons",
    genres: ["Comedy", "Fantasy"],
    tags: ["witty", "philosophical", "hopeful"],
    description: "A woman finds herself in the afterlife and realizes she may have been filed under the wrong category.",
    reason: "A bright, surprisingly deep comedy about becoming better together.",
    director: "Michael Schur",
    palette: "from-[#9fb4a2] via-[#ead4a6] to-[#71879b]",
    accent: "#71879b",
  },
  {
    id: "the-night-manager",
    format: "show",
    title: "The Night Manager",
    year: 2016,
    runtime: "2 seasons",
    genres: ["Thriller", "Drama"],
    tags: ["precise", "moody", "sharp"],
    description: "A hotel manager is recruited to infiltrate the inner circle of an international arms dealer.",
    reason: "A sleek thriller when you want the night to have a little more polish.",
    director: "David Farr",
    palette: "from-[#243e47] via-[#bd9977] to-[#b55b4b]",
    accent: "#b55b4b",
  },
  {
    id: "normal-people",
    format: "show",
    title: "Normal People",
    year: 2020,
    runtime: "Limited series",
    genres: ["Romance", "Drama"],
    tags: ["yearning", "intimate", "quiet"],
    description: "Two young people keep finding and losing each other as they grow into different versions of themselves.",
    reason: "A close-up study of connection, timing, and everything left unsaid.",
    director: "Lenny Abrahamson",
    palette: "from-[#455c60] via-[#dbb998] to-[#bc6757]",
    accent: "#bc6757",
  },
  {
    id: "dark",
    format: "show",
    title: "Dark",
    year: 2017,
    runtime: "3 seasons",
    genres: ["Sci-fi", "Mystery"],
    tags: ["precise", "eerie", "philosophical"],
    description: "A missing child opens a knot of secrets that binds four families across time.",
    reason: "For when you want your mystery to keep unfolding after the credits.",
    director: "Baran bo Odar",
    palette: "from-[#263b42] via-[#687d73] to-[#c79d79]",
    accent: "#687d73",
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
  const unseenCandidates = titles.filter(
    (title) => title.format === format && !watched.some((item) => item.id === title.id) && !skipped.includes(title.id) && title.id !== excludeId,
  );
  const fallbackCandidates = titles.filter(
    (title) => title.format === format && !watched.some((item) => item.id === title.id) && title.id !== excludeId,
  );
  const pool = unseenCandidates.length ? unseenCandidates : fallbackCandidates;
  const candidates = pool.sort((a, b) => {
    const scoreDifference = scoreTitle(b, watched, skipped) - scoreTitle(a, watched, skipped);
    return scoreDifference || a.title.localeCompare(b.title);
  });
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
