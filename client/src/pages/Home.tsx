/* Soft Signal style reminder: an asymmetric editorial spread, warm paper surfaces, restrained signal red, and recommendation-first hierarchy. */

import { useEffect, useMemo, useState } from "react";
import { Archive, ArrowUpRight, Bookmark, Check, ChevronRight, Compass, Film, Library, RotateCcw, Sparkles, Tv, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getMatchReason, getMatchScore, getRecommendation, getSignalSummary, titles, type Format, type TasteProfile, type Title, type WatchedItem } from "@/lib/recommendations";

const WATCHED_KEY = "reelwise-watched";
const SKIPPED_KEY = "reelwise-skipped";
const WATCH_LATER_KEY = "reelwise-watch-later";
const TASTE_PROFILE_KEY = "reelwise-taste-profile";

type View = "tonight" | "archive" | "watchlist";
type WatchLaterItem = { id: string; savedAt: string; title: Title };

function readStorage<T>(key: string, fallback: T): T {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

function PosterArt({ title, className = "" }: { title: Title; className?: string }) {
  return (
    <div className={`poster-art relative overflow-hidden ${className}`}>
      {title.poster ? (
        <img src={title.poster} alt={`${title.title} artwork`} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${title.palette}`} />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(150deg,transparent_32%,rgba(16,23,24,0.18)_100%)]" />
      <div className="absolute left-4 top-4 max-w-[78%] font-sans text-[9px] font-bold uppercase tracking-[0.22em] text-white/80">{title.format === "movie" ? "Feature" : "Series"}</div>
      {!title.poster && (
        <div className="absolute bottom-5 left-5 right-5 text-white/90">
          <div className="mb-2 h-px w-9 bg-white/70" />
          <p className="font-serif text-[clamp(1.7rem,3vw,2.8rem)] leading-[0.9] tracking-[-0.045em]">{title.title}</p>
        </div>
      )}
      <div className="absolute bottom-4 right-4 flex items-center gap-1 font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-white/75">RW <span className="h-1 w-1 rounded-full bg-[#d94f3d]" /></div>
    </div>
  );
}

function SignalLine() {
  return <span aria-hidden="true" className="signal-line" />;
}

const starterFavorites = titles.filter((title) => ["past-lives", "anatomy-of-a-fall", "the-holdovers", "the-bear", "severance", "fleabag"].includes(title.id));
const tasteSignals = [
  { id: "human", label: "Quiet & human", note: "intimate stories with room to breathe", genres: ["Drama", "Romance"], tags: ["tender", "intimate", "quiet"] },
  { id: "mystery", label: "Sharp mysteries", note: "tension, ambiguity, and good questions", genres: ["Thriller", "Mystery"], tags: ["precise", "moody", "sharp"] },
  { id: "ideas", label: "Ideas after dark", note: "science fiction and philosophical turns", genres: ["Sci-fi", "Fantasy"], tags: ["philosophical", "eerie", "haunting"] },
  { id: "wit", label: "Warm & witty", note: "funny, generous, character-led worlds", genres: ["Comedy", "Family"], tags: ["warm", "wry", "ensemble"] },
  { id: "momentum", label: "A little momentum", note: "adventure, crime, and a moving plot", genres: ["Action", "Adventure", "Crime"], tags: ["urgent", "current", "live-discovery"] },
] as const;

function Onboarding({ onComplete }: { onComplete: (profile: TasteProfile) => void }) {
  const [step, setStep] = useState<0 | 1>(0);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [signalIds, setSignalIds] = useState<string[]>([]);
  const selectedFavorites = starterFavorites.filter((title) => favoriteIds.includes(title.id));

  function toggleFavorite(id: string) {
    setFavoriteIds((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current);
  }

  function toggleSignal(id: string) {
    setSignalIds((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current);
  }

  function finish() {
    const selectedSignals = tasteSignals.filter((signal) => signalIds.includes(signal.id));
    const profile: TasteProfile = {
      favoriteIds,
      genres: Array.from(new Set([...selectedFavorites.flatMap((title) => title.genres), ...selectedSignals.flatMap((signal) => signal.genres)])),
      tags: Array.from(new Set([...selectedFavorites.flatMap((title) => title.tags), ...selectedSignals.flatMap((signal) => signal.tags)])),
      completedAt: new Date().toISOString(),
    };
    onComplete(profile);
  }

  return (
    <main className="dark-cinema min-h-screen overflow-hidden bg-[#111311] px-5 py-7 text-[#f6efe2] sm:px-8 sm:py-10">
      <div className="paper-grain" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col border border-[#f6efe2]/15 bg-[#171b17]/95 px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,.34)] sm:px-10 sm:py-11">
        <div className="flex items-center justify-between gap-6 border-b border-[#f6efe2]/12 pb-5"><div className="flex items-center gap-3"><span className="brand-mark"><img src="/manus-storage/reelwise-signal-glyph_882a2283.png" alt="" /></span><span className="font-serif text-[1.55rem] tracking-[-0.05em]">reel<span className="text-[#d94f3d]">/</span>wise</span></div><span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#a9aaa1]">Opening signal · {step + 1}/2</span></div>
        {step === 0 ? (
          <div className="flex flex-1 flex-col justify-center py-10"><p className="eyebrow"><span className="eyebrow-dot" />A quick first read</p><h1 className="mt-5 max-w-3xl font-serif text-[clamp(3.6rem,8vw,7.2rem)] leading-[0.83] tracking-[-0.075em]">What already<br /><em>stayed with you?</em></h1><p className="mt-7 max-w-xl font-sans text-[15px] leading-[1.6] text-[#c3c5bb]">Choose up to three favorites. We will borrow their genres and emotional signals to make the first recommendation feel less random.</p><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{starterFavorites.map((title) => <button key={title.id} onClick={() => toggleFavorite(title.id)} className={`group border p-4 text-left transition-colors ${favoriteIds.includes(title.id) ? "border-[#d94f3d] bg-[#2b312b]" : "border-[#f6efe2]/13 bg-[#1e241f] hover:border-[#f6efe2]/35"}`}><div className="flex items-center justify-between gap-4"><span className="font-serif text-2xl leading-[.9] tracking-[-0.05em]">{title.title}</span>{favoriteIds.includes(title.id) && <Check className="h-4 w-4 shrink-0 text-[#d94f3d]" />}</div><p className="mt-4 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-[#a9aaa1]">{title.genres.slice(0, 2).join(" · ")}</p></button>)}</div><div className="mt-10 flex flex-wrap items-center gap-4"><Button onClick={() => setStep(1)} className="h-11 rounded-none bg-[#d94f3d] px-5 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-none hover:bg-[#ba3f31]">Continue <ChevronRight className="ml-2 h-3.5 w-3.5" /></Button><button onClick={() => setStep(1)} className="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#a9aaa1] hover:text-[#f6efe2]">Skip this step</button><span className="ml-auto font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#858a80]">{favoriteIds.length}/3 chosen</span></div></div>
        ) : (
          <div className="flex flex-1 flex-col justify-center py-10"><p className="eyebrow"><span className="eyebrow-dot" />Set the mood</p><h1 className="mt-5 max-w-3xl font-serif text-[clamp(3.6rem,8vw,7.2rem)] leading-[0.83] tracking-[-0.075em]">What do you<br /><em>reach for?</em></h1><p className="mt-7 max-w-xl font-sans text-[15px] leading-[1.6] text-[#c3c5bb]">Choose up to three directions. Your watched history will take over and refine this initial signal as you use the room.</p><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{tasteSignals.map((signal) => <button key={signal.id} onClick={() => toggleSignal(signal.id)} className={`min-h-36 border p-5 text-left transition-colors ${signalIds.includes(signal.id) ? "border-[#d94f3d] bg-[#2b312b]" : "border-[#f6efe2]/13 bg-[#1e241f] hover:border-[#f6efe2]/35"}`}><div className="flex items-start justify-between gap-4"><span className="font-serif text-[1.65rem] leading-[.95] tracking-[-0.045em]">{signal.label}</span>{signalIds.includes(signal.id) && <Check className="h-4 w-4 shrink-0 text-[#d94f3d]" />}</div><p className="mt-4 font-sans text-xs leading-[1.45] text-[#a9aaa1]">{signal.note}</p></button>)}</div><div className="mt-10 flex flex-wrap items-center gap-4"><Button onClick={finish} className="h-11 rounded-none bg-[#d94f3d] px-5 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-none hover:bg-[#ba3f31]">Build my signal <Sparkles className="ml-2 h-3.5 w-3.5" /></Button><button onClick={() => setStep(0)} className="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#a9aaa1] hover:text-[#f6efe2]">Back</button><button onClick={finish} className="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#858a80] hover:text-[#f6efe2]">Skip for now</button><span className="ml-auto font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#858a80]">{signalIds.length}/3 chosen</span></div></div>
        )}
      </div>
    </main>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("tonight");
  const [format, setFormat] = useState<Format>("movie");
  const [watched, setWatched] = useState<WatchedItem[]>(() => readStorage<WatchedItem[]>(WATCHED_KEY, []));
  const [skipped, setSkipped] = useState<string[]>(() => readStorage<string[]>(SKIPPED_KEY, []));
  const [watchLater, setWatchLater] = useState<WatchLaterItem[]>(() => readStorage<WatchLaterItem[]>(WATCH_LATER_KEY, []));
  const [tasteProfile, setTasteProfile] = useState<TasteProfile | null>(() => readStorage<TasteProfile | null>(TASTE_PROFILE_KEY, null));
  const [currentId, setCurrentId] = useState<string>("");
  const [isChanging, setIsChanging] = useState(false);
  const movieDiscovery = trpc.catalogue.discover.useQuery({ format: "movie" }, { staleTime: 15 * 60 * 1000, retry: 1 });
  const showDiscovery = trpc.catalogue.discover.useQuery({ format: "show" }, { staleTime: 15 * 60 * 1000, retry: 1 });
  const liveReady = Boolean(movieDiscovery.data?.length && showDiscovery.data?.length);
  const liveLoading = movieDiscovery.isLoading || showDiscovery.isLoading;
  const liveError = movieDiscovery.isError || showDiscovery.isError;
  const liveCatalogue = useMemo<Title[]>(
    () => [...(movieDiscovery.data ?? []), ...(showDiscovery.data ?? [])],
    [movieDiscovery.data, showDiscovery.data],
  );
  const catalogue = useMemo<Title[]>(() => (liveReady ? liveCatalogue : titles), [liveCatalogue, liveReady]);
  const availableCatalogue = useMemo<Title[]>(() => catalogue.filter((title) => !watchLater.some((item) => item.id === title.id)), [catalogue, watchLater]);
  const archiveCatalogue = useMemo<Title[]>(() => [...catalogue, ...titles], [catalogue]);

  const recommendation = useMemo(() => {
    const selected = catalogue.find((title) => title.id === currentId);
    const selectedIsLive = currentId.startsWith("tmdb-");
    if (selected && selected.format === format && !watched.some((item) => item.id === selected.id) && !skipped.includes(selected.id) && !watchLater.some((item) => item.id === selected.id) && (!liveReady || selectedIsLive)) return selected;
    return getRecommendation(format, watched, skipped, undefined, availableCatalogue, tasteProfile ?? undefined);
  }, [availableCatalogue, catalogue, currentId, format, liveReady, skipped, tasteProfile, watchLater, watched]);

  const archiveTitles = useMemo(
    () => watched.map((item) => archiveCatalogue.find((title) => title.id === item.id)).filter(Boolean) as Title[],
    [archiveCatalogue, watched],
  );
  const signalSummary = useMemo(() => getSignalSummary(watched, archiveCatalogue, tasteProfile ?? undefined), [archiveCatalogue, tasteProfile, watched]);
  const formatCount = catalogue.filter((title) => title.format === format).length;

  useEffect(() => {
    if (recommendation && currentId !== recommendation.id) setCurrentId(recommendation.id);
  }, [currentId, recommendation]);

  function transitionTo(nextId: string) {
    setIsChanging(true);
    setCurrentId(nextId);
    window.setTimeout(() => setIsChanging(false), 120);
  }

  function chooseFormat(nextFormat: Format) {
    setFormat(nextFormat);
    setCurrentId("");
    setView("tonight");
  }

  function markWatched() {
    if (!recommendation) return;
    const item = { id: recommendation.id, watchedAt: new Date().toISOString() };
    const nextWatched = [...watched.filter((entry) => entry.id !== item.id), item];
    setWatched(nextWatched);
    window.localStorage.setItem(WATCHED_KEY, JSON.stringify(nextWatched));
    const nextWatchLater = watchLater.filter((item) => item.id !== recommendation.id);
    setWatchLater(nextWatchLater);
    window.localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(nextWatchLater));
    const nextCatalogue = availableCatalogue.filter((title) => title.id !== recommendation.id);
    const next = getRecommendation(format, nextWatched, skipped, recommendation.id, nextCatalogue, tasteProfile ?? undefined);
    if (next) transitionTo(next.id);
    toast.success("Added to your watched archive", { description: recommendation.title });
  }

  function skipTitle() {
    if (!recommendation) return;
    const nextSkipped = Array.from(new Set([...skipped, recommendation.id]));
    setSkipped(nextSkipped);
    window.localStorage.setItem(SKIPPED_KEY, JSON.stringify(nextSkipped));
    const next = getRecommendation(format, watched, nextSkipped, recommendation.id, availableCatalogue, tasteProfile ?? undefined);
    if (next) transitionTo(next.id);
    toast("Passed for now", { description: "We’ll keep the signal moving." });
  }

  function surpriseMe() {
    const next = getRecommendation(format, watched, skipped, recommendation?.id, availableCatalogue, tasteProfile ?? undefined);
    if (next) transitionTo(next.id);
  }

  function removeFromArchive(id: string) {
    const nextWatched = watched.filter((entry) => entry.id !== id);
    setWatched(nextWatched);
    window.localStorage.setItem(WATCHED_KEY, JSON.stringify(nextWatched));
    toast("Returned to your pool", { description: archiveCatalogue.find((title) => title.id === id)?.title });
  }

  function addToWatchLater() {
    if (!recommendation) return;
    if (watchLater.some((item) => item.id === recommendation.id)) {
      toast("Already in Watch later", { description: recommendation.title });
      return;
    }
    const item = { id: recommendation.id, savedAt: new Date().toISOString(), title: recommendation };
    const nextWatchLater = [item, ...watchLater];
    setWatchLater(nextWatchLater);
    window.localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(nextWatchLater));
    const nextCatalogue = availableCatalogue.filter((title) => title.id !== recommendation.id);
    const next = getRecommendation(format, watched, skipped, recommendation.id, nextCatalogue, tasteProfile ?? undefined);
    if (next) transitionTo(next.id);
    toast.success("Saved to Watch later", { description: recommendation.title });
  }

  function removeFromWatchLater(id: string) {
    const nextWatchLater = watchLater.filter((item) => item.id !== id);
    setWatchLater(nextWatchLater);
    window.localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(nextWatchLater));
    toast("Removed from Watch later");
  }

  function startWatchingLater(item: WatchLaterItem) {
    removeFromWatchLater(item.id);
    setFormat(item.title.format);
    setCurrentId(item.id);
    setView("tonight");
  }

  function completeOnboarding(profile: TasteProfile) {
    setTasteProfile(profile);
    window.localStorage.setItem(TASTE_PROFILE_KEY, JSON.stringify(profile));
    setCurrentId("");
    toast.success("Your opening signal is set", { description: "Your first recommendation now has a point of view." });
  }

  const hasHistory = watched.length > 0 || Boolean(tasteProfile?.genres.length || tasteProfile?.tags.length);
  const matchReason = recommendation ? getMatchReason(recommendation, watched, tasteProfile ?? undefined) : "You’ve reached the end of this format’s active queue.";

  if (!tasteProfile) return <Onboarding onComplete={completeOnboarding} />;

  return (
    <div className="dark-cinema min-h-screen overflow-x-hidden bg-[#111311] text-[#f6efe2]">
      <div className="paper-grain" aria-hidden="true" />
      <header className="relative z-10 border-b border-[#2d302d]/10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 py-5 sm:px-8 lg:px-12">
          <button onClick={() => { setView("tonight"); setFormat("movie"); }} className="group flex items-center gap-3 text-left" aria-label="Return to Reelwise recommendations">
            <span className="brand-mark"><img src="/manus-storage/reelwise-signal-glyph_882a2283.png" alt="" /></span>
            <span className="font-serif text-[1.55rem] leading-none tracking-[-0.05em]">reel<span className="text-[#d94f3d]">/</span>wise</span>
          </button>
          <div className="hidden items-center gap-4 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#72736d] sm:flex">
            <span>Personal screening room</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#d94f3d]" />
            <span>{watched.length} in archive · {watchLater.length} saved</span>
          </div>
          <button onClick={() => setView(view === "watchlist" ? "tonight" : "watchlist")} className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#2d302d] transition-colors hover:text-[#d94f3d] sm:hidden">
            {view === "watchlist" ? "Tonight" : `Later ${watchLater.length}`}<ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-89px)] max-w-[1500px] lg:grid-cols-[190px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[#2d302d]/10 px-6 py-10 lg:flex lg:flex-col lg:justify-between">
          <nav className="space-y-2" aria-label="Primary">
            <p className="mb-5 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-[#95958d]">Your room</p>
            <button onClick={() => setView("tonight")} className={`side-nav-item ${view === "tonight" ? "is-active" : ""}`}><Compass className="h-4 w-4" />Tonight</button>
            <button onClick={() => setView("archive")} className={`side-nav-item ${view === "archive" ? "is-active" : ""}`}><Archive className="h-4 w-4" />Watched <span className="ml-auto tabular-nums text-[#96968f]">{watched.length}</span></button>
            <button onClick={() => setView("watchlist")} className={`side-nav-item ${view === "watchlist" ? "is-active" : ""}`}><Bookmark className="h-4 w-4" />Watch later <span className="ml-auto tabular-nums text-[#96968f]">{watchLater.length}</span></button>
          </nav>
          <div className="space-y-4">
            <SignalLine />
            <p className="font-sans text-[11px] leading-[1.55] text-[#777870]">A little less browsing.<br />A little more watching.</p>
            <button onClick={() => { setWatched([]); window.localStorage.removeItem(WATCHED_KEY); toast("Archive cleared"); }} className="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#aaa99f] transition-colors hover:text-[#d94f3d]">Clear archive</button>
          </div>
        </aside>

        <main className="min-w-0 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="mb-8 flex items-center justify-between gap-5 border-b border-[#2d302d]/10 pb-5">
            <div className="flex items-center gap-1 rounded-full border border-[#2d302d]/12 p-1">
              <button onClick={() => chooseFormat("movie")} className={`format-tab ${format === "movie" ? "is-active" : ""}`}><Film className="h-3.5 w-3.5" />Movies</button>
              <button onClick={() => chooseFormat("show")} className={`format-tab ${format === "show" ? "is-active" : ""}`}><Tv className="h-3.5 w-3.5" />TV shows</button>
            </div>
            <div className="hidden items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#999990] sm:flex"><span className="text-[#d94f3d]">{liveReady ? "Live catalogue" : "Edition 01"}</span><span>/</span><span>{formatCount} titles</span></div>
          </div>

          {liveLoading && !liveReady && <p className="mb-6 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a8b84]">Refreshing the live catalogue…</p>}
          {liveError && !liveReady && <div role="status" className="mb-6 border-l-2 border-[#d94f3d] bg-[#f8f2e9] px-4 py-3 font-sans text-xs leading-[1.55] text-[#666861]">The live catalogue is temporarily unavailable. Reelwise is showing the local shelf while it reconnects.</div>}

          {view === "tonight" ? (
            <section className="animate-in fade-in duration-500" aria-labelledby="tonight-heading">
              <div className="mb-9 max-w-3xl">
                <p className="eyebrow"><span className="eyebrow-dot" />A recommendation for tonight</p>
                <div className="mt-4 flex items-end justify-between gap-5">
                  <h1 id="tonight-heading" className="font-serif text-[clamp(3.8rem,8vw,7.4rem)] leading-[0.82] tracking-[-0.075em]">One good<br /><em>choice.</em></h1>
                  <button onClick={surpriseMe} className="group mb-1 hidden items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#777870] transition-colors hover:text-[#d94f3d] sm:flex">Surprise me <RotateCcw className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-[-45deg]" /></button>
                </div>
              </div>

              <div className={`recommendation-spread ${isChanging ? "is-changing" : ""}`}>
                <div className="relative min-w-0">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="eyebrow"><span className="h-px w-6 bg-[#d94f3d]" />{hasHistory ? "Picked from your signal" : "A considered place to start"}</p>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.17em] text-[#9a9a91]">{format === "movie" ? "Movie 01" : "Series 01"}</span>
                  </div>
                  {recommendation && (
                    <div className="featured-card">
                      <div className="poster-wrap">
                        <PosterArt key={recommendation.id} title={recommendation} className="aspect-[4/5] w-full" />
                        <div className="poster-caption"><span>Reelwise selection</span><span>{recommendation.year}</span></div>
                      </div>
                      <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                        <div>
                          <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#85867e]"><span>{recommendation.year}</span><span className="h-1 w-1 rounded-full bg-[#d94f3d]" /><span>{recommendation.runtime}</span><span className="h-1 w-1 rounded-full bg-[#b2b0a5]" /><span>{recommendation.genres[0]}</span></div>
                          <h2 className="max-w-[560px] font-serif text-[clamp(2.8rem,5.5vw,5.9rem)] leading-[0.87] tracking-[-0.07em]">{recommendation.title}</h2>
                          {recommendation.director && <p className="mt-5 font-sans text-xs text-[#777870]">A film by <span className="text-[#2d302d]">{recommendation.director}</span></p>}
                          <p className="mt-7 max-w-[420px] font-sans text-[15px] leading-[1.55] text-[#60625c]">{recommendation.description}</p>
                        </div>
                        <div className="mt-10 flex flex-wrap items-center gap-3">
                          <Button onClick={markWatched} className="h-11 rounded-none bg-[#d94f3d] px-5 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-none transition-all hover:bg-[#ba3f31] active:scale-[0.97]"><Check className="mr-2 h-3.5 w-3.5" />I watched this</Button>
                          <Button onClick={addToWatchLater} variant="outline" className="h-11 rounded-none border-[#2d302d]/18 bg-[#f8f2e9] px-5 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#555650] shadow-none transition-all hover:border-[#d94f3d]/50 hover:bg-white active:scale-[0.97]"><Bookmark className="mr-2 h-3.5 w-3.5" />Watch later</Button>
                          <Button onClick={skipTitle} variant="outline" className="h-11 rounded-none border-[#2d302d]/18 bg-transparent px-5 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#555650] shadow-none transition-all hover:border-[#d94f3d]/50 hover:bg-[#f8f2e9] active:scale-[0.97]"><X className="mr-2 h-3.5 w-3.5" />Not for me</Button>
                          <button onClick={surpriseMe} className="group flex h-11 items-center gap-2 px-2 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#777870] transition-colors hover:text-[#d94f3d] sm:hidden">Surprise me <RotateCcw className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-[-45deg]" /></button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <aside className="pt-1 lg:pl-3">
                  <div className="why-note">
                    <div className="mb-5 flex items-center justify-between"><p className="eyebrow"><Sparkles className="h-3.5 w-3.5 text-[#d94f3d]" />Why this</p><span className="font-sans text-[10px] font-bold text-[#d94f3d]">{recommendation ? `${getMatchScore(recommendation, watched, archiveCatalogue, tasteProfile ?? undefined)}%` : "—"}</span></div>
                    <p className="font-serif text-[1.65rem] leading-[1.03] tracking-[-0.04em]">{recommendation ? `“${matchReason}”` : "“You’ve reached the end of this format’s active queue.”"}</p>
                    <div className="mt-7 h-px w-full bg-[#2d302d]/12" />
                    <p className="mt-4 font-sans text-[12px] leading-[1.55] text-[#777870]">{hasHistory ? "The more you watch, the more this little room starts to understand your taste." : "Start with a title. Reelwise will tune the next one around what you actually finish."}</p>
                  </div>
                  <div className="mt-8 hidden border-t border-[#2d302d]/12 pt-5 lg:block"><p className="eyebrow mb-3">Your current signal</p>{signalSummary.length ? <div className="space-y-2">{signalSummary.map(([genre, count]) => <div key={genre} className="flex items-center justify-between font-sans text-[12px] text-[#777870]"><span>{genre}</span><span className="tabular-nums text-[#2d302d]">{count} {count === 1 ? "title" : "titles"}</span></div>)}</div> : <p className="font-sans text-[12px] leading-[1.5] text-[#999990]">No patterns yet. Your first watch starts the signal.</p>}</div>
                </aside>
              </div>

              <div className="mt-14 border-t border-[#2d302d]/10 pt-6"><div className="flex items-center justify-between gap-5"><div><p className="eyebrow mb-2">More from the shelf</p><p className="font-serif text-[1.7rem] tracking-[-0.04em]">Keep the evening open.</p></div><button onClick={() => setView("archive")} className="hidden items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#777870] transition-colors hover:text-[#d94f3d] sm:flex">See archive <ArrowUpRight className="h-3.5 w-3.5" /></button></div><div className="mt-6 grid gap-3 sm:grid-cols-3">{catalogue.filter((title) => title.format === format && title.id !== recommendation?.id && !watched.some((item) => item.id === title.id) && !skipped.includes(title.id) && !watchLater.some((item) => item.id === title.id)).slice(0, 3).map((title) => <button key={title.id} onClick={() => transitionTo(title.id)} className="shelf-card group text-left"><div className={`shelf-thumb bg-gradient-to-br ${title.palette}`}>{title.poster && <img src={title.poster} alt="" className="h-full w-full object-cover opacity-85" />}<span className="absolute bottom-3 left-3 right-3 font-serif text-[1.65rem] leading-[0.85] tracking-[-0.05em] text-white drop-shadow-sm">{title.title}</span></div><div className="flex items-center justify-between pt-3"><span className="font-sans text-[11px] text-[#666861]">{title.genres[0]} · {title.year}</span><ChevronRight className="h-3.5 w-3.5 text-[#9a9a91] transition-transform group-hover:translate-x-1 group-hover:text-[#d94f3d]" /></div></button>)}</div></div>
            </section>
          ) : view === "archive" ? (
            <section className="animate-in fade-in duration-500" aria-labelledby="archive-heading">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow"><span className="eyebrow-dot" />Your watched archive</p><h1 id="archive-heading" className="mt-4 font-serif text-[clamp(3.8rem,8vw,7.4rem)] leading-[0.82] tracking-[-0.075em]">What stayed.</h1></div><div className="max-w-[260px] font-sans text-[12px] leading-[1.55] text-[#777870]">A growing record of the stories you made time for. Your next recommendation learns from this shelf.</div></div>
              {!archiveTitles.length ? (
                <div className="empty-archive"><Library className="h-7 w-7 text-[#d94f3d]" /><p className="mt-5 font-serif text-3xl tracking-[-0.05em]">Your shelf is still open.</p><p className="mt-3 max-w-sm font-sans text-sm leading-[1.55] text-[#777870]">Mark a recommendation as watched and it will land here, shaping what Reelwise picks next.</p><Button onClick={() => setView("tonight")} className="mt-7 h-11 rounded-none bg-[#2d302d] px-5 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-none hover:bg-[#d94f3d]">Find something to watch <ChevronRight className="ml-2 h-3.5 w-3.5" /></Button></div>
              ) : (
                <div className="archive-list">{archiveTitles.map((title, index) => <article key={title.id} className="archive-row" style={{ animationDelay: `${index * 40}ms` }}><div className="archive-index">0{index + 1}</div><PosterArt title={title} className="h-24 w-16 shrink-0 sm:h-32 sm:w-[5.2rem]" /><div className="min-w-0 flex-1"><div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#96968e]"><span>{title.format === "movie" ? "Movie" : "TV show"}</span><span className="h-1 w-1 rounded-full bg-[#d94f3d]" /><span>{title.year}</span></div><h2 className="truncate font-serif text-[clamp(1.8rem,3.2vw,3rem)] leading-none tracking-[-0.055em]">{title.title}</h2><p className="mt-2 truncate font-sans text-xs text-[#777870]">{title.genres.join(" · ")}</p></div><button onClick={() => removeFromArchive(title.id)} aria-label={`Remove ${title.title} from archive`} className="archive-remove"><X className="h-4 w-4" /></button></article>)}</div>
              )}
              <div className="mt-12 grid gap-5 border-t border-[#2d302d]/10 pt-6 sm:grid-cols-2"><div><p className="eyebrow mb-3">Your taste, in brief</p><p className="font-serif text-2xl leading-[1.05] tracking-[-0.05em]">{signalSummary.length ? `You keep coming back to ${signalSummary.map(([genre]) => genre.toLowerCase()).join(", ")}.` : "A pattern will appear after your first watch."}</p></div><div className="flex items-end justify-start sm:justify-end"><button onClick={() => { setView("tonight"); setCurrentId(""); }} className="group flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#777870] hover:text-[#d94f3d]">Back to tonight <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></button></div></div>
            </section>
          ) : (
            <section className="animate-in fade-in duration-500" aria-labelledby="watch-later-heading">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow"><span className="eyebrow-dot" />Your saved list</p><h1 id="watch-later-heading" className="mt-4 font-serif text-[clamp(3.8rem,8vw,7.4rem)] leading-[0.82] tracking-[-0.075em]">For later.</h1></div><div className="max-w-[260px] font-sans text-[12px] leading-[1.55] text-[#777870]">A calm place to keep the titles you want to make time for. Saved titles stay out of the active queue until you choose one.</div></div>
              {!watchLater.length ? (
                <div className="empty-archive"><Bookmark className="h-7 w-7 text-[#d94f3d]" /><p className="mt-5 font-serif text-3xl tracking-[-0.05em]">Keep something for later.</p><p className="mt-3 max-w-sm font-sans text-sm leading-[1.55] text-[#777870]">Use Watch later on any recommendation and it will wait here until you are ready.</p><Button onClick={() => setView("tonight")} className="mt-7 h-11 rounded-none bg-[#2d302d] px-5 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-none hover:bg-[#d94f3d]">Find something to save <ChevronRight className="ml-2 h-3.5 w-3.5" /></Button></div>
              ) : (
                <div className="archive-list">{watchLater.map((item, index) => <article key={item.id} className="archive-row" style={{ animationDelay: `${index * 40}ms` }}><div className="archive-index">0{index + 1}</div><PosterArt title={item.title} className="h-24 w-16 shrink-0 sm:h-32 sm:w-[5.2rem]" /><div className="min-w-0 flex-1"><div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#96968e]"><span>{item.title.format === "movie" ? "Movie" : "TV show"}</span><span className="h-1 w-1 rounded-full bg-[#d94f3d]" /><span>{item.title.year}</span></div><h2 className="truncate font-serif text-[clamp(1.8rem,3.2vw,3rem)] leading-none tracking-[-0.055em]">{item.title.title}</h2><p className="mt-2 truncate font-sans text-xs text-[#777870]">{item.title.genres.join(" · ")}</p></div><div className="flex shrink-0 items-center gap-2"><button onClick={() => startWatchingLater(item)} className="h-9 border border-[#2d302d]/18 bg-[#f8f2e9] px-3 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#555650] transition-colors hover:border-[#d94f3d]/50 hover:text-[#d94f3d]">Watch now</button><button onClick={() => removeFromWatchLater(item.id)} aria-label={`Remove ${item.title.title} from Watch later`} className="archive-remove"><X className="h-4 w-4" /></button></div></article>)}</div>
              )}
            </section>
          )}
        </main>
      </div>
      <footer className="relative z-10 border-t border-[#2d302d]/10 px-5 py-5 sm:px-8 lg:hidden"><div className="flex items-center justify-between font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#999990]"><span>Reelwise · Edition 01</span><button onClick={() => setView(view === "archive" ? "tonight" : "archive")} className="text-[#2d302d]">{view === "archive" ? "Return to tonight" : `Archive · ${watched.length}`}</button></div></footer>
    </div>
  );
}
