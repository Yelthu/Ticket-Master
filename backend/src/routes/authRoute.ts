import express, { Request, Response, NextFunction } from "express";
import { registerUser, loingUser } from "../controllers/authController";

const router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    await registerUser(req, res, next);
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    await loingUser(req, res, next);
});

export default router;