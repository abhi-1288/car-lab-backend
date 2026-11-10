import type { Request, Response, NextFunction } from "express";
import { config } from "../config";

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-admin-token") || req.header("authorization")?.replace("Bearer ", "");
  if (!token || token !== config.adminToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
