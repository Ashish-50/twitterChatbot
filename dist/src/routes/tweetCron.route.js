"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetCronRoute = void 0;
const express_1 = require("express");
const tweetCron_controller_1 = require("../controller/tweetCron.controller");
class TweetCronRoute {
    constructor() {
        this.path = '/tweetcron';
        this.router = (0, express_1.Router)();
        this.tweetcron = new tweetCron_controller_1.TweetCronController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/startcron`, this.tweetcron.startCron),
            this.router.get(`${this.path}/stopcron`, this.tweetcron.stopCron);
    }
}
exports.TweetCronRoute = TweetCronRoute;
