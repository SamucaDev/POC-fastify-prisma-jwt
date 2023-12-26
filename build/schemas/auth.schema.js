"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.authSchemas = exports.loginResponseSchema = exports.loginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const fastify_zod_1 = require("fastify-zod");
exports.loginSchema = zod_1.default.object({
    email: zod_1.default
        .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    })
        .email(),
    password: zod_1.default.string().min(6),
});
exports.loginResponseSchema = zod_1.default.object({
    accessToken: zod_1.default.string(),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    loginSchema: exports.loginSchema,
    loginResponseSchema: exports.loginResponseSchema
}, { $id: 'auth_schema' }), exports.authSchemas = _a.schemas, exports.$ref = _a.$ref;
