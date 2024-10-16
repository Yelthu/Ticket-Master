import { Request, Response, NextFunction } from "express";
import { ticketSchema } from "../validation/ticket";
import { AppDataSource } from "../config/data-source";
import { Ticket } from "../entity/Ticket";

export const registerTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = ticketSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { title, description } = req.body;

        const ticketRepository = AppDataSource.getRepository(Ticket);

        const newTicket = ticketRepository.create({ title, description });
        await ticketRepository.save(newTicket);

        res.status(200).json({ message: 'Your ticket created successfuly' });

    } catch (error) {
        next(error);
    }
}

export const getTicket = async (res: Response, next: NextFunction) => {

    try {
        const ticketRepository = AppDataSource.getRepository(Ticket);

        const tickets = await ticketRepository.find();

        if (!tickets) return res.status(400).json({ message: `The tickets can't retirve!` });

        res.status(200).json(tickets);

    } catch (error) {
        next(error);
    }

}