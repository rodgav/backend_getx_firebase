import * as admin from 'firebase-admin';
import {User} from "../models/user";

const serviceAccount = require('../../service-account.json');
const app = admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

const auth = app.auth();


export const createToken = async (user: User): Promise<string> => {
    const userId = user._id.toString();
    return await auth.createCustomToken(userId, {
        id: userId,
        username: user.username,
        email: user.email
    });
};

export const verifyToken = async (idToken: string): Promise<any> => {
    return await auth.verifyIdToken(idToken);
}
