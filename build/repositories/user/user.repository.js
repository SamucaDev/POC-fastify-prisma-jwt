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
exports.get = exports.find = exports.update = exports.create = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const model = prisma_1.default.user;
const create = (userObject) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model.create({
        data: Object.assign({}, userObject)
    });
    return user;
});
exports.create = create;
const update = () => { };
exports.update = update;
const find = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model.findUnique({
        where: query,
    });
    return user;
});
exports.find = find;
const get = () => { };
exports.get = get;
