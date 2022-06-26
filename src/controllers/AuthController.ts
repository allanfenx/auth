import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";


class AuthController {

    async authenticade(request: Request, response: Response) {

        const { email, password } = request.body;

        const service = new AuthService();

        try {
            const { token, user } = await service.autheticade({ email, password });

            return response.json({ user, token });
        } catch (error: any) {

            return response.status(401).json({ erro: error.message });
        }
    }
}

export { AuthController };