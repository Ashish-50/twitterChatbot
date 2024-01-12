"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
class UserRoute {
    constructor() {
        this.path = '/user';
        this.router = (0, express_1.Router)();
        this.user = new user_controller_1.UserController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/userLogin`, this.user.userLogin);
    }
}
exports.UserRoute = UserRoute;
