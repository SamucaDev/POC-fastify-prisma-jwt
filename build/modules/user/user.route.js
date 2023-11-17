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
exports.userRoutes = void 0;
const user_schema_1 = require("./user.schema");
const user_controller_1 = require("./user.controller");
function userRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('/:id', {
            schema: {
                response: {
                    200: (0, user_schema_1.$ref)('findUserSchema')
                }
            }
        }, user_controller_1.findUser);
        app.post('/', {
            schema: {
                body: (0, user_schema_1.$ref)('createUserSchema'),
                response: {
                    201: (0, user_schema_1.$ref)('createUserResponseSchema'),
                },
            },
        }, user_controller_1.createUser);
        app.post('/login', {
            schema: {
                body: (0, user_schema_1.$ref)('loginSchema'),
                response: {
                    201: (0, user_schema_1.$ref)('loginResponseSchema'),
                },
            },
        }, user_controller_1.login);
        app.delete('/logout', () => { });
        app.log.info('user routes registered');
    });
}
exports.userRoutes = userRoutes;
