import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../libs/firebase-admin";

declare  global {
    namespace Express {
        export interface Request {
            session?: {
                id: string;
                email: string;
                username: String;
            };
        }
    }
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {token} = req.headers;
        if (!token) {
            throw {status: 403, message: 'access denied'}
        }
        req.session = await verifyToken(token as string);
        next();
    } catch (e) {
        res.status(e.status || 403).send(e.message);
    }

}