"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const auth_route_1 = require("../../routes/auth.route");
const user_route_1 = require("../../routes/user.route");
exports.routes = [
    {
        useCase: user_route_1.userRoutes,
        url: 'users'
    },
    {
        useCase: auth_route_1.authRoutes,
        url: 'auth'
    }
];
