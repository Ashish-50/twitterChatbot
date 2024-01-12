"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetCronController = void 0;
const tweetAppService_service_1 = require("../service/tweetAppService.service");
const node_cron_1 = __importDefault(require("node-cron"));
const client_1 = require("../utils/client");
let cronJob = null;
class TweetCronController {
    constructor() {
        this.tweetAppService = new tweetAppService_service_1.TweetAppService();
        this.startCron = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (cronJob === null) {
                    cronJob = node_cron_1.default.schedule('*/1 * * * *', () => __awaiter(this, void 0, void 0, function* () {
                        try {
                            console.log('Running task every 5 minutes');
                            // Fetch the latest tweet from the database
                            const latestTweet = yield this.tweetAppService.fetchLatestTweetFromDB();
                            if (!latestTweet) {
                                console.log('No more tweets to process. Stopping cron job.');
                                if (cronJob !== null) {
                                    cronJob.stop();
                                    cronJob = null;
                                }
                                return;
                            }
                            const tweet = {
                                text: latestTweet.text,
                            };
                            const response = yield client_1.twitterAxiosClient.post(`/2/tweets`, tweet);
                            if (response.status === 201) {
                                yield this.tweetAppService.deleteTweetFromDB(latestTweet.id);
                                console.log('Tweet posted successfully');
                            }
                            else {
                                console.error('Failed to post tweet to Twitter');
                            }
                        }
                        catch (error) {
                            console.error('Error during cron job:', error);
                            // Stop the cron job if an error occurs
                            if (cronJob !== null) {
                                cronJob.stop();
                                cronJob = null;
                            }
                        }
                    }));
                    res.send({ message: 'Cron job started', status: true });
                }
                else {
                    res.send('Cron job is already running');
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.stopCron = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (cronJob !== null) {
                    cronJob.stop();
                    cronJob = null;
                    res.send({ message: 'Cron job stopped', status: false });
                }
                else {
                    res.send('No cron job is running');
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TweetCronController = TweetCronController;
