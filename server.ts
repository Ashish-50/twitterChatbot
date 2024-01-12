import { App } from "./app";
import { TweetRoute } from "./src/routes/tweet";
import {TweetAppServiceRoute} from './src/routes/tweetAppService.route'
import { TweetCronRoute } from "./src/routes/tweetCron.route";
import { UserRoute } from "./src/routes/user";

const app = new App([
    new TweetRoute(),
new TweetAppServiceRoute(),
new UserRoute(),
new TweetCronRoute()
]);

try {
    app.listen()
} catch (error) {
    console.log(error)
}