import express, { Request, Response, NextFunction } from "express";
import { registerTicket, getTicket } from "../controllers/ticketController";

const router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    await registerTicket(req, res, next);
});

router.get('/get', async (req: Request, res: Response, next: NextFunction) => {
    await getTicket(res, next);
});

export default router;