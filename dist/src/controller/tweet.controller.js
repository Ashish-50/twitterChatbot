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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweetController = void 0;
const tweet_service_1 = require("../service/tweet.service");
class tweetController {
    constructor() {
        this.tweetService = new tweet_service_1.TweetCRUDService();
        this.createTweet = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { text } = req.body;
                const newTweet = yield this.tweetService.createTweet(text);
                res.status(201).json({
                    status: 'success',
                    message: 'Tweet added successfully',
                    data: newTweet,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getTweets = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const page = req.query.page;
                const limit = req.query.limit;
                const parsedPage = parseInt(page || '1', 10);
                const parsedLimit = parseInt(limit || '10', 10);
                const tweets = yield this.tweetService.getTweets(parsedPage, parsedLimit);
                res.status(200).json({
                    status: 'success',
                    message: 'Tweets retrieved successfully',
                    data: tweets,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.updateTweet = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { newText } = req.body;
                const updatedTweet = yield this.tweetService.updateTweet(id, newText);
                res.status(200).json({
                    status: 'success',
                    message: 'Tweet updated successfully',
                    data: updatedTweet,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteTweet = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedTweet = yield this.tweetService.deleteTweet(id);
                res.status(200).json({
                    status: 'success',
                    message: 'Tweet deleted successfully',
                    data: deletedTweet,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.tweetController = tweetController;
