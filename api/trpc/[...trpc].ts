import { createExpressMiddleware } from "@trpc/server/adapters/express";
import type { IncomingMessage, ServerResponse } from "node:http";
import { createContext } from "../../server/_core/context";
import { appRouter } from "../../server/routers";
import { resolveVercelTrpcPath } from "../../server/vercel-trpc";

type VercelRequest = IncomingMessage & {
  path?: string;
  query?: Record<string, string | string[] | undefined>;
};

const trpcHandler = createExpressMiddleware({
  router: appRouter,
  createContext,
});

export default function handler(req: VercelRequest, res: ServerResponse) {
  // Vercel invokes the function without Express's mounted-route metadata.
  // The tRPC Express adapter expects req.path, so recreate the procedure path
  // from the catch-all route before delegating to the shared application router.
  req.path = `/api/trpc/${resolveVercelTrpcPath(req)}`;
  return trpcHandler(req as never, res as never);
}
