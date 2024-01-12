"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const tweet_1 = require("./src/routes/tweet");
const tweetAppService_route_1 = require("./src/routes/tweetAppService.route");
const user_1 = require("./src/routes/user");
const app = new app_1.App([
    new tweet_1.TweetRoute(),
    new tweetAppService_route_1.TweetAppServiceRoute(),
    new user_1.UserRoute(),
]);
try {
    app.listen();
}
catch (error) {
    console.log(error);
}
