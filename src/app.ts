import "reflect-metadata";
import "./database/connection"
import express from "express";
import { Kafka } from "kafkajs";
import cors from "cors";
import dotenv from "dotenv";
import { ReceivedUser } from "./kafka/ReceivedUser";
import AuthRoutes from "./routes/AuthRoutes";

dotenv.config({
    path: process.env.NODE_ENV === 'dev' ? 'dev.env' : '.env'
});

const kafka = new Kafka({
    clientId: "auth",
    brokers: [String(process.env.KAFKA_HOST)],
    ssl: true,
    sasl: {
        mechanism: "plain",
        username: String(process.env.KAFKA_USERNAME),
        password: String(process.env.KAFKA_PASSWORD)
    }
});

export const consumerSave = kafka.consumer({ groupId: "save" });
export const consumerUpdate = kafka.consumer({ groupId: "update" });
export const consumerRemove = kafka.consumer({ groupId: "remove" });




const app = express();
const port = process.env.APP_PORT_AUTH;

app.use(cors())
app.use(express.json());
app.use(AuthRoutes);

async function run() {

    const received = new ReceivedUser();

    received.save();
    received.update();
    received.remove();

    app.listen(port, () => {

        console.log("Aplication running!");
    });
}

run().catch(console.error);
