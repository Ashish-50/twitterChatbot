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
exports.TweetCRUDService = void 0;
const tweet_1 = require("../models/tweet");
class TweetCRUDService {
    createTweet(text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTweet = yield tweet_1.TweetModel.create({ text });
                return newTweet;
            }
            catch (error) {
                throw new Error("something went wrong");
            }
        });
    }
    getTweets(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * limit;
                const tweets = yield tweet_1.TweetModel.find()
                    .sort({ dateAndTime: -1 })
                    .skip(skip)
                    .limit(limit)
                    .exec();
                return tweets;
            }
            catch (error) {
                throw new Error("something went wrong");
            }
        });
    }
    updateTweet(id, newText) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTweet = yield tweet_1.TweetModel.findByIdAndUpdate(id, { text: newText }, { new: true }).exec();
                if (!updatedTweet) {
                    throw new Error("something went wrong");
                }
                return updatedTweet;
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteTweet(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedTweet = yield tweet_1.TweetModel.findByIdAndDelete(id).exec();
                if (!deletedTweet) {
                    throw new Error("something went wrong");
                }
                return deletedTweet;
            }
            catch (error) {
                throw new Error("something went wrong");
            }
        });
    }
}
exports.TweetCRUDService = TweetCRUDService;
