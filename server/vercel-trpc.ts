export type VercelTrpcRequest = {
  url?: string;
  query?: Record<string, string | string[] | undefined>;
};

export function resolveVercelTrpcPath(req: VercelTrpcRequest) {
  const fromQuery = req.query?.trpc;
  if (Array.isArray(fromQuery)) return fromQuery.join("/");
  if (typeof fromQuery === "string" && fromQuery) return fromQuery;

  const pathname = new URL(req.url ?? "/", "http://localhost").pathname;
  return pathname.replace(/^\/api\/trpc\/?/, "");
}
