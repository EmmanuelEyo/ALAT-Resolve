// apps/api/src/index.ts
import express from "express";
import type { Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:4000; script-src 'self' 'unsafe-inline'"
  );
  next();
});


app.get(
  "/.well-known/appspecific/com.chrome.devtools.json",
  (_req: Request, res: Response) => {
    res.status(204).send();
  }
);

app.get("/", (_req: Request, res: Response) => {
  res.send(
    "ALAT Resolve API - running. Use GET /health for JSON status (and see logs)."
  );
});

app.get("/health", (_req: Request, res: Response) => res.json({ ok: true }));

app.get("/debug/headers", (req: Request, res: Response) => {
  res.json({ headers: req.headers });
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () =>
  console.log(`API running on http://localhost:${port} (env PORT=${port})`)
);