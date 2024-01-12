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
exports.openAi = exports.twitterAxiosClient = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const openai_1 = __importDefault(require("openai"));
const twitterAxiosConfig = {
    baseURL: config_1.twitterConfig.apiEndpoint,
    headers: {
        'Content-Type': 'application/json',
    },
};
const twitterAxiosClient = axios_1.default.create(twitterAxiosConfig);
exports.twitterAxiosClient = twitterAxiosClient;
twitterAxiosClient.interceptors.request.use((config) => __awaiter(void 0, void 0, void 0, function* () {
    if (!config.url || !config.method) {
        throw new Error('Request config must include URL and method.');
    }
    const token = {
        key: config_1.twitterConfig.accessToken.key,
        secret: config_1.twitterConfig.accessToken.secret,
    };
    try {
        const oauthData = config_1.oauth.authorize({ url: config.baseURL + config.url, method: config.method }, token);
        const oauthHeader = config_1.oauth.toHeader(oauthData);
        config.headers.Authorization = oauthHeader.Authorization;
        return config;
    }
    catch (error) {
        throw new Error('Error during OAuth authorization: ' + error.message);
    }
}));
//openAI
const openAi = new openai_1.default({
    apiKey: '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' // This is the default and can be omitted
});
exports.openAi = openAi;
