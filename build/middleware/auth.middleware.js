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
exports.setAuthenticateJWT = void 0;
const setAuthenticateJWT = (server) => {
    server.decorate('authenticate', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.access_token;
        if (!token) {
            return reply.status(401).send({ message: 'Authentication required' });
        }
        const decoded = req.jwt.verify(token);
        req.user = decoded;
    }));
};
exports.setAuthenticateJWT = setAuthenticateJWT;
