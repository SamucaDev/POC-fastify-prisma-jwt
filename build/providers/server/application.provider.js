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
exports.setListeners = exports.configJWT = exports.start = exports.setRoutes = exports.setSchemas = void 0;
const jwt_1 = __importDefault(require("@fastify/jwt"));
const schemas_provider_1 = require("./schemas.provider");
const routes_provider_1 = require("./routes.provider");
const setSchemas = (server) => {
    for (let schema of schemas_provider_1.schemas)
        server.addSchema(schema);
};
exports.setSchemas = setSchemas;
const setRoutes = (server) => {
    for (let route of routes_provider_1.routes)
        server.register(route.useCase, { prefix: `api/${route.url}` });
};
exports.setRoutes = setRoutes;
const start = (server) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('teste');
        yield server.listen({ port: parseInt(process.env.APP_PORT) });
        console.log(`Server has been started 👋 Port: ${process.env.APP_PORT}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
exports.start = start;
const configJWT = (server) => {
    server.register(jwt_1.default, { secret: process.env.JWT_SECRET });
    server.addHook('preHandler', (req, res, next) => {
        req.jwt = server.jwt;
        return next();
    });
};
exports.configJWT = configJWT;
const setListeners = (server) => {
    const listeners = ["SIGINT", "SIGTERM"];
    listeners.forEach((signal) => {
        process.on(signal, () => __awaiter(void 0, void 0, void 0, function* () {
            yield server.close();
            console.log("Server has been closed 👋");
            process.exit(0);
        }));
    });
};
exports.setListeners = setListeners;
