"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = void 0;
const auth_schema_1 = require("../../schemas/auth.schema");
const user_schema_1 = require("../../schemas/user.schema");
exports.schemas = [
    ...user_schema_1.userSchemas,
    ...auth_schema_1.authSchemas
];
