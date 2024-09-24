import { Request, Response, NextFunction } from "express";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = `Bearer ${process.env.AUTH_TOKEN}`;

  if (authHeader === token) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
