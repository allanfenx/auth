import { ReceivedUser } from "../entities/ReceivedUser";


export default {

    render(user: ReceivedUser) {

        return {
            id: user.registerId,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            update_at: user.update_at
        }
    }
}