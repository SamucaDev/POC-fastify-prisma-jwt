"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fastify_1 = __importDefault(require("fastify"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const application_provider_1 = require("./providers/server/application.provider");
dotenv_1.default.config();
const server = (0, fastify_1.default)({ logger: true });
(0, application_provider_1.configJWT)(server);
(0, auth_middleware_1.setAuthenticateJWT)(server);
(0, application_provider_1.setSchemas)(server);
(0, application_provider_1.setRoutes)(server);
(0, application_provider_1.setListeners)(server);
(0, application_provider_1.start)(server);
