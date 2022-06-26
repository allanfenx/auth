import "reflect-metadata";
import "./database/connection"
import express from "express";
import { Kafka } from "kafkajs";
import cors from "cors";

import { ReceivedUser } from "./kafka/ReceivedUser";
import AuthRoutes from "./routes/AuthRoutes";



const kafka = new Kafka({
    clientId: 'auth',
    brokers: ['localhost:9092'],
})

export const consumerSave = kafka.consumer({ groupId: "save" });
export const consumerUpdate = kafka.consumer({ groupId: "update" });
export const consumerRemove = kafka.consumer({ groupId: "remove" });




const app = express();
const port = 8085;

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
