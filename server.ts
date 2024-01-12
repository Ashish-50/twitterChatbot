import { App } from "./app";
import { TweetRoute } from "./src/routes/tweet";
import {TweetAppServiceRoute} from './src/routes/tweetAppService.route'
import { UserRoute } from "./src/routes/user";

const app = new App([
    new TweetRoute(),
new TweetAppServiceRoute(),
new UserRoute(),
]);

try {
    app.listen()
} catch (error) {
    console.log(error)
}