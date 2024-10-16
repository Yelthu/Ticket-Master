import express, { Request, Response } from "express";
import 'dotenv/config';

const app = express();
const PORT: number = 8000;

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        message: "Server is healthy",
        code: 200,
        success: false
    })
})

app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
})