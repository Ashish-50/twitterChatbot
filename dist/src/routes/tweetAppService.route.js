"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetAppServiceRoute = void 0;
const express_1 = require("express");
const tweetAppController_controller_1 = require("../controller/tweetAppController.controller");
class TweetAppServiceRoute {
    constructor() {
        this.path = '/tweetApp';
        this.router = (0, express_1.Router)();
        this.tweetApp = new tweetAppController_controller_1.TweetAppController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, this.tweetApp.addTweet),
            this.router.get(`${this.path}/`, this.tweetApp.aboutme);
        this.router.delete(`${this.path}/`, this.tweetApp.deleteTweet);
    }
}
exports.TweetAppServiceRoute = TweetAppServiceRoute;
