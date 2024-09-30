import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: "client" | "user";
  };
}

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log("forbidden", err);
        return res
          .sendStatus(403)
          .json({ message: "Unauthorized: No token provided." });
      }

      req.user = user as { id: number; email: string; role: "client" | "user" };
      next();
    });
  } else {
    console.log("something went wrong");
    res.sendStatus(401).json({ message: "Unauthorized: Invalid token" }); // Unauthorized
  }
};
