"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetRoute = void 0;
const express_1 = require("express");
const tweet_controller_1 = require("../controller/tweet.controller");
class TweetRoute {
    constructor() {
        this.path = '/tweet';
        this.router = (0, express_1.Router)();
        this.tweet = new tweet_controller_1.tweetController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/createtweet`, this.tweet.createTweet),
            this.router.get(`${this.path}/gettweet`, this.tweet.getTweets);
        this.router.put(`${this.path}/updateTweet/:id`, this.tweet.updateTweet);
        this.router.delete(`${this.path}/deleteTweet/:id`, this.tweet.deleteTweet);
    }
}
exports.TweetRoute = TweetRoute;
