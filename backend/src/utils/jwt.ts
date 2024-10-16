import jwt, { JwtPayload } from "jsonwebtoken";

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
}
export const verifyToken = (token: string): JwtPayload | null => {
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET as string);

        if (typeof decode === 'object') {
            return decode as JwtPayload;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}