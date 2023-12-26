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
const user_schema_1 = require("../schemas/user.schema");
const user_find_controller_1 = require("../useCases/user/find/user-find.controller");
const create_usecase_1 = require("../useCases/user/create/create.usecase");
const user_find_all_controller_1 = require("../useCases/user/findAll/user-find-all.controller");
function userRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('/:id', {
            schema: {
                response: {
                    200: (0, user_schema_1.$ref)('findUserSchema')
                }
            },
            preHandler: [app.authenticate]
        }, user_find_controller_1.findUser);
        app.post('/', {
            schema: {
                body: (0, user_schema_1.$ref)('createUserSchema'),
                response: {
                    201: (0, user_schema_1.$ref)('createUserResponseSchema'),
                },
            },
        }, create_usecase_1.createUser);
        app.get('/', {
            schema: {
                response: {
                    200: (0, user_schema_1.$ref)('getUsersSchema'),
                }
            },
            preHandler: [app.authenticate]
        }, user_find_all_controller_1.getUsers);
        app.log.info('user routes registered');
    });
}
exports.userRoutes = userRoutes;
