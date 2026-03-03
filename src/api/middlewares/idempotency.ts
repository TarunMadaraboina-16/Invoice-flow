import { Request, Response, NextFunction } from "express";

const cache = new Map<string, any>();

export function idempotencyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const key = req.headers["idempotency-key"] as string;

  if (!key) {
    return res.status(400).json({ error: "Missing idempotency-key" });
  }

  if (cache.has(key)) {
    return res.status(200).json(cache.get(key));
  }

  const originalJson = res.json.bind(res);

  res.json = (body: any): Response => {
    cache.set(key, body);
    return originalJson(body);
  };

  next();
}