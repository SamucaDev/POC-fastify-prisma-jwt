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
exports.login = exports.findUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
function createUser(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const SALT_ROUNDS = 10;
        const { password, email, name } = req.body;
        const user = yield prisma_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            return reply.code(401).send({
                message: 'User already exists with this email',
            });
        }
        try {
            const hash = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
            const user = yield prisma_1.default.user.create({
                data: {
                    password: hash,
                    email,
                    name,
                },
            });
            return reply.code(201).send(user);
        }
        catch (e) {
            return reply.code(500).send(e);
        }
    });
}
exports.createUser = createUser;
function findUser(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { params } = req;
        const { id } = params;
        console.log();
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id
            }
        });
        return reply.code(200).send(user);
    });
}
exports.findUser = findUser;
;
function login(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield prisma_1.default.user.findUnique({ where: { email: email } });
        const isMatch = user && (yield bcrypt_1.default.compare(password, user.password));
        if (!user || !isMatch) {
            return reply.code(401).send({
                message: 'Invalid email or password',
            });
        }
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        const token = req.jwt.sign(payload);
        reply.setCookie('access_token', token, {
            path: '/',
            httpOnly: true,
            secure: true,
        });
        return { accessToken: token };
    });
}
exports.login = login;
