import { Request, Response, NextFunction } from "express";
import { loginSchema, userSchema } from "../validation/user";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { username, email, password } = req.body;

        const userRepository = AppDataSource.getRepository(User);

        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({ username, email, password: hashedPassword });
        await userRepository.save(newUser);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error)
    }
}

export const loingUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { email, password } = req.body;

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({ where: { email } })
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).json({ message: 'Invalid email or password' });

        const token = generateToken({ id: user.id, email: user.email });

        return res.status(200).json({ token });

    } catch (error) {
        next(error);
    }

}
