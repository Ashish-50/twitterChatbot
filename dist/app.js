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
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("./src/config");
const mongoose_1 = require("mongoose");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
const tweetAppService_service_1 = require("./src/service/tweetAppService.service");
const error_middleware_1 = require("./src/middleware/error.middleware");
class App {
    constructor(routes) {
        this.tweetAppService = new tweetAppService_service_1.TweetAppService();
        this.app = (0, express_1.default)();
        this.env = config_1.NODE_ENV || 'development';
        this.port = config_1.PORT || 3990;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }
    listen() {
        try {
            this.server = this.app.listen(this.port, () => {
                console.info(`=================================`);
                console.info(`======= ENV: ${this.env} =======`);
                console.info(`🚀 App listening on the port ${this.port}`);
                console.info(`=================================`);
            });
            this.server.timeout = 0;
        }
        catch (error) {
            console.log(error);
        }
    }
    scheduleCronJob() {
        node_cron_1.default.schedule('*/1 * * *', () => {
            console.log('job is executing in every 1 minute');
            this.tweetAppService.addTweet();
        });
    }
    getServer() {
        return this.app;
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info(config_1.dbConnection.DBURL);
                yield (0, mongoose_1.connect)(config_1.dbConnection.DBURL);
                console.info('Connected to database');
            }
            catch (err) {
                console.error('DB connection failed');
            }
        });
    }
    initializeMiddlewares() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)({ origin: config_1.ORIGIN, credentials: config_1.CREDENTIAL }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
        this.app.use('/health', (req, res) => {
            res.send({
                state: 'ready',
            });
        });
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.ErrorMiddleware);
    }
}
exports.App = App;
