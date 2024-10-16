import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload; // You can define the shape of `user` if needed
        }
    }
}