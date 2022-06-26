import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class receivedUser1633961762168 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
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
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("received_user");
    }

}
