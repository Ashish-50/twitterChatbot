"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauth = exports.twitterConfig = exports.dbConnection = exports.TWITTER_API_ENDPOINT = exports.TWITTER_ACCESS_TOKEN_SECRET = exports.TWITTER_ACCESS_TOKEN_KEY = exports.TWITTER_CONSUMER_SECRET = exports.TWITTER_CONSUMER_KEY = exports.CREDENTIAL = exports.ORIGIN = exports.NODE_ENV = exports.CHATAPI = exports.PORT = void 0;
const oauth_1_0a_1 = __importDefault(require("oauth-1.0a"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.CHATAPI = process.env.CHATAPI;
exports.NODE_ENV = process.env.NODE_ENV;
exports.ORIGIN = process.env.ORIGIN;
exports.CREDENTIAL = process.env.CREDENTIAL === 'true';
exports.TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY || '';
exports.TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || '';
exports.TWITTER_ACCESS_TOKEN_KEY = process.env.TWITTER_ACCESS_TOKEN || '';
exports.TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET || '';
exports.TWITTER_API_ENDPOINT = process.env.TWITTER_API_ENDPOINT || '';
exports.dbConnection = {
    DBURL: 'mongodb://localhost:27017/twitter',
};
exports.twitterConfig = {
    consumer: {
        key: exports.TWITTER_CONSUMER_KEY,
        secret: exports.TWITTER_CONSUMER_SECRET,
    },
    accessToken: {
        key: exports.TWITTER_ACCESS_TOKEN_KEY,
        secret: exports.TWITTER_ACCESS_TOKEN_SECRET,
    },
    apiEndpoint: exports.TWITTER_API_ENDPOINT,
};
exports.oauth = new oauth_1_0a_1.default({
    consumer: exports.twitterConfig.consumer,
    signature_method: 'HMAC-SHA1',
    hash_function: (baseString, key) => crypto_1.default.createHmac('sha1', key).update(baseString).digest('base64'),
});
