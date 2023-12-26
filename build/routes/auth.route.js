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
exports.authRoutes = void 0;
const auth_login_controller_1 = require("../useCases/auth/login/auth-login.controller");
const auth_login_controller_2 = require("../useCases/auth/logout/auth-login.controller");
const auth_schema_1 = require("../schemas/auth.schema");
function authRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/login', {
            schema: {
                body: (0, auth_schema_1.$ref)('loginSchema'),
                response: {
                    201: (0, auth_schema_1.$ref)('loginResponseSchema'),
                },
            },
        }, auth_login_controller_1.login);
        app.delete('/logout', {
            preHandler: [app.authenticate]
        }, () => auth_login_controller_2.logout);
        app.log.info('auth routes registered');
    });
}
exports.authRoutes = authRoutes;
