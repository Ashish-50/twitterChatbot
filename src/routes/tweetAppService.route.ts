import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { TweetAppController } from "../controller/tweetAppController.controller";

export class TweetAppServiceRoute implements Routes {
     public path = '/tweetApp';
     public router= Router();
     public tweetApp = new TweetAppController();

     constructor(){
        this.initializeRoutes()
     }
     private initializeRoutes(){
        this.router.post('/',this.tweetApp.addTweet),
        this.router.get('/user',this.tweetApp.aboutme)
        this.router.delete('/:id',this.tweetApp.deleteTweet)
     }
}