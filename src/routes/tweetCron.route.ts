import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { TweetCronController } from "../controller/tweetCron.controller";

export class TweetCronRoute implements Routes{
    public path = '/tweetcron';
    public router = Router();
    public tweetcron = new TweetCronController();
    
    constructor(){
        this.initializeRoutes()
     }
     private initializeRoutes(){
        this.router.get(`${this.path}/startcron`,this.tweetcron.startCron),
        this.router.get(`${this.path}/stopcron`,this.tweetcron.stopCron)
     }
}