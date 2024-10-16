import express from "express";
import { AppDataSource } from "./config/data-source";
import authRoutes from './routes/authRoute';
import ticketRoute from './routes/ticketRoute';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((error) => console.log('Error during Data Source initialization:', error));

app.use('/auth', authRoutes);
app.use('/ticket', ticketRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});