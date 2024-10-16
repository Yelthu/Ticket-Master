import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const toekn = req.headers.authorization?.split(' ')[1];

    if (!toekn) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const payload = verifyToken(toekn);

    if (!payload) {
        return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = payload as JwtPayload;
    next();
}