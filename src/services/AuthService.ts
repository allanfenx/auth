import { getCustomRepository } from "typeorm";
import { ReceivedUserRepositories } from "../repositories/ReceivedUserRepositories";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import AuthViews from "../views/AuthViews";
import { readFileSync } from "fs";

type User = {
    email: string,
    password: string
}

class AuthService {

    async autheticade({ email, password }: User) {

        const repository = getCustomRepository(ReceivedUserRepositories);

        if (!email || !password) throw new Error("Credentials invalid");

        const userFind = await repository.findOne({ email });

        if (!userFind) throw new Error("Credentials invalid");

        if (!await compare(password, userFind.password)) throw new Error("Credentials invalid");

        const privateKey = readFileSync("./privateKey.pem");

        const token = sign({ role: userFind.role, name: userFind.name, groups: [userFind.role] }, privateKey, {
            algorithm: 'RS256',
            subject: userFind.registerId,
            expiresIn: 6000
        })

        const user = AuthViews.render(userFind);

        return { user, token };
    }
}

export { AuthService };