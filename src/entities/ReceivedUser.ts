import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("received_user")
class ReceivedUser {

    @PrimaryColumn()
    registerId: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: "admin" | "manager" | "client";

    @Column()
    created_at: Date;

    @Column()
    update_at: Date;
}

export { ReceivedUser };