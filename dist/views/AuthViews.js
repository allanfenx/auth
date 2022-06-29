"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(user) {
        return {
            id: user.registerId,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            update_at: user.update_at
        };
    }
};
