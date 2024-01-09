import { App } from "./app";
import {TweetAppServiceRoute} from './src/routes/tweetAppService.route'

const app = new App([
new TweetAppServiceRoute()
]);

try {
    app.listen()
} catch (error) {
    console.log(error)
}