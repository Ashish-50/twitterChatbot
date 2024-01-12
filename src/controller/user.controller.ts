import { NextFunction, Request, Response } from 'express';
import {UserService} from '../service/user.service'

export class UserController {
    public user = new UserService();

    public userLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).send({ message: "Please enter email and password" });
            }
            const data = await this.user.userLogin(email, password);
            res.send({ message: "User logged in", data: data });
        } catch (error) {
            next(error)
        }
    }
}