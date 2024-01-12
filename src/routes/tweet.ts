import  { Router } from 'express';
import { tweetController } from '../controller/tweet.controller';
import { Routes } from '../interface/routes.interface';

export class TweetRoute implements Routes {
    public path = '/tweet'
    public router = Router();
    public tweet = new tweetController();
    constructor(){
        this.initializeRoutes()
    }
    private initializeRoutes(){
        this.router.post(`${this.path}/createtweet`,this.tweet.createTweet),
        this.router.get(`${this.path}/gettweet`,this.tweet.getTweets)
        this.router.put(`${this.path}/updateTweet/:id`,this.tweet.updateTweet)
        this.router.delete(`${this.path}/deleteTweet/:id`,this.tweet.deleteTweet)
     }
}
