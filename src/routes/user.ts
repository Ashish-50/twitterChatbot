import  { Router } from 'express';
import { Routes } from '../interface/routes.interface';
import { UserController } from '../controller/user.controller';

export class UserRoute implements Routes {
    public path = '/user';
    public router= Router();
    public user = new UserController();
    constructor(){
        this.initializeRoutes()
     }
     private initializeRoutes(){
        this.router.post(`${this.path}/userLogin`,this.user.userLogin)
    }
}