"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    async authenticade(request, response) {
        const { email, password } = request.body;
        const service = new AuthService_1.AuthService();
        try {
            const { token, user } = await service.autheticade({ email, password });
            return response.json({ user, token });
        }
        catch (error) {
            return response.status(401).json({ erro: error.message });
        }
    }
}
exports.AuthController = AuthController;
