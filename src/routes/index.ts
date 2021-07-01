import {Application} from "express";
import {CreateUser, getUserInfo, login} from '../controllers/users_controllers';
import {checkAuth} from "../middlewares/auth";

const routes = (app: Application) => {
    app.post('/create', CreateUser);
    app.post('/login', login);
    app.get('/get-user-info', checkAuth, getUserInfo);
};

export default routes;