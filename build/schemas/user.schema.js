"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.userSchemas = exports.getUsersSchema = exports.findUserSchema = exports.createUserResponseSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string(),
});
exports.createUserResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string(),
    name: zod_1.z.string()
});
exports.findUserSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.getUsersSchema = zod_1.z.array(zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string(),
    name: zod_1.z.string()
}));
_a = (0, fastify_zod_1.buildJsonSchemas)({
    findUserSchema: exports.findUserSchema,
    getUsersSchema: exports.getUsersSchema,
    createUserSchema: exports.createUserSchema,
    createUserResponseSchema: exports.createUserResponseSchema,
}, { $id: 'user_schema' }), exports.userSchemas = _a.schemas, exports.$ref = _a.$ref;
