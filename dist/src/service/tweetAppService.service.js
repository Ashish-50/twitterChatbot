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
exports.TweetAppService = void 0;
const axios_1 = __importDefault(require("axios"));
const client_1 = require("../utils/client");
const tweet_1 = require("../models/tweet");
class TweetAppService {
    addTweet() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const latestTweet = yield this.fetchLatestTweetFromDB();
                if (!latestTweet) {
                    throw new Error('No tweets available to post');
                }
                const tweet = {
                    text: latestTweet.text
                };
                const response = yield client_1.twitterAxiosClient.post(`/2/tweets`, tweet);
                if (response.status === 201) {
                    yield this.deleteTweetFromDB(latestTweet.id);
                    const responseBody = {
                        status: 200,
                        message: "Tweet posted successfully",
                        data: response.data
                    };
                    return responseBody;
                }
                else {
                    throw new Error('Failed to post tweet to Twitter');
                }
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    console.error((_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
                    throw new Error((_b = error.response) === null || _b === void 0 ? void 0 : _b.data);
                }
                else {
                    console.error(error);
                    throw new Error('An unexpected error occurred.');
                }
            }
        });
    }
    deleteTweet(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield client_1.twitterAxiosClient.delete(`/2/tweets/${id}`);
                const responseBody = {
                    status: 200,
                    message: "Tweet deleted successfully",
                    data: response.data
                };
                return responseBody;
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield client_1.twitterAxiosClient.get(`/2/users/me`);
                const responseBody = {
                    status: 200,
                    message: "",
                    data: response.data
                };
                return responseBody;
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    fetchLatestTweetFromDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const latestTweet = yield tweet_1.TweetModel.findOne().sort({ dateAndTime: -1 }).exec();
                return latestTweet;
            }
            catch (error) {
                console.error('Error fetching the latest tweet from the database:', error);
                throw error;
            }
        });
    }
    deleteTweetFromDB(tweetId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield tweet_1.TweetModel.findByIdAndDelete(tweetId).exec();
            }
            catch (error) {
                console.error('Error deleting the tweet from the database:', error);
                throw error;
            }
        });
    }
}
exports.TweetAppService = TweetAppService;
