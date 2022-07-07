"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const typeorm_1 = require("typeorm");
const ReceivedUserRepositories_1 = require("../repositories/ReceivedUserRepositories");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const AuthViews_1 = __importDefault(require("../views/AuthViews"));
const fs_1 = require("fs");
class AuthService {
    async autheticade({ email, password }) {
        const repository = (0, typeorm_1.getCustomRepository)(ReceivedUserRepositories_1.ReceivedUserRepositories);
        if (!email || !password)
            throw new Error("Credentials invalid");
        const userFind = await repository.findOne({ email });
        if (!userFind)
            throw new Error("Credentials invalid");
        if (!await (0, bcrypt_1.compare)(password, userFind.password))
            throw new Error("Credentials invalid");
        const privateKey = (0, fs_1.readFileSync)("./privateKey.pem");
        const token = (0, jsonwebtoken_1.sign)({ role: userFind.role, name: userFind.name, groups: userFind.role }, privateKey, {
            algorithm: 'RS256',
            subject: userFind.registerId,
            expiresIn: 6000
        });
        const user = AuthViews_1.default.render(userFind);
        return { user, token };
    }
}
exports.AuthService = AuthService;
