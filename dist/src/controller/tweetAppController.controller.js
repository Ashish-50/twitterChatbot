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
exports.TweetAppController = void 0;
const tweetAppService_service_1 = require("../service/tweetAppService.service");
class TweetAppController {
    constructor() {
        this.tweetAppService = new tweetAppService_service_1.TweetAppService();
        this.addTweet = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.tweetAppService.addTweet();
                return res.status(response.status).json({
                    status: "success",
                    message: response.message,
                    data: response.data,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteTweet = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const response = yield this.tweetAppService.deleteTweet(id);
                return res.status(response.status).json({
                    status: "success",
                    message: response.message,
                    data: response.data,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.aboutme = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.tweetAppService.getUser();
                return res.status(response.status).json({
                    status: "success",
                    message: response.message,
                    data: response.data,
                });
            }
            catch (error) {
                next();
            }
        });
    }
}
exports.TweetAppController = TweetAppController;
