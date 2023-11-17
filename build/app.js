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
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = require("./modules/user/user.route");
const user_schema_1 = require("./modules/user/user.schema");
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
dotenv_1.default.config();
const server = (0, fastify_1.default)({ logger: false });
server.register(jwt_1.default, { secret: process.env.JWT_SECRET });
server.addHook('preHandler', (req, res, next) => {
    req.jwt = server.jwt;
    console.log('Eu passo aqui em todas as etapas da requisição');
    return next();
});
server.register(cookie_1.default, {
    secret: 'some-secret-key',
    hook: 'preHandler',
});
for (let schema of [...user_schema_1.userSchemas])
    server.addSchema(schema);
server.register(user_route_1.userRoutes, { prefix: 'api/users' });
const listeners = ['SIGINT', 'SIGTERM'];
listeners.forEach((signal) => {
    process.on(signal, () => __awaiter(void 0, void 0, void 0, function* () {
        yield server.close();
        console.log('Server has been closed 👋');
        process.exit(0);
    }));
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen({ port: parseInt(process.env.APP_PORT) });
        console.log(`Server has been started 👋 Port: ${process.env.APP_PORT}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();
