"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receivedUser1633961762168 = void 0;
const typeorm_1 = require("typeorm");
class receivedUser1633961762168 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "received_user",
            columns: [
                {
                    name: "registerId",
                    isUnique: true,
                    isPrimary: true,
                    type: "uuid",
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "50"
                },
                {
                    name: "email",
                    isUnique: true,
                    type: "varchar",
                    length: "80"
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "role",
                    type: "enum",
                    enum: ["client", "manager", "admin"]
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "Now()"
                },
                {
                    name: "update_at",
                    type: "timestamp",
                    default: "Now()"
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("received_user");
    }
}
exports.receivedUser1633961762168 = receivedUser1633961762168;
