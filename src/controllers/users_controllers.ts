import {Request, Response} from "express";

import Users, {User} from "../models/user";
import {createToken} from "../libs/firebase-admin";

export const CreateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            throw {status: 406, message: 'invalid body params'};
        }
        const user: User = await Users.create({username, email, password});
        res.send(user);
    } catch (e) {
        res.status(e.status || 500).send(e.message);
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            throw {status: 406, message: 'invalid body params'};
        }
        const user: User | null = await Users.findOne({email, password});
        if (!user) {
            throw {status: 404, message: 'user not found'}
        }
        const token: string = await createToken(user);
        res.send(token);
    } catch (e) {
        res.status(e.status || 500).send(e.message);
    }
}

export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.session!.id;
        const user: User | null = await Users.findById(userId).select('-password -__v');

        if (!user) {
            throw {status: 404, message: 'user not found'};
        }

        res.send(user);

    } catch (e) {
        res.status(e.status || 500).send(e.message);
    }
}