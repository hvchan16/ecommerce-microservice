import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: "client" | "user";
  };
}

export const authorizeRoles = (roles: Array<"client" | "user">) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res.sendStatus(403); // Forbidden
    }
  };
};
