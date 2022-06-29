"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumerRemove = exports.consumerUpdate = exports.consumerSave = void 0;
require("reflect-metadata");
require("./database/connection");
const express_1 = __importDefault(require("express"));
const kafkajs_1 = require("kafkajs");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ReceivedUser_1 = require("./kafka/ReceivedUser");
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
dotenv_1.default.config({
    path: process.env.NODE_ENV === 'dev' ? 'dev.env' : 'production.env'
});
const kafka = new kafkajs_1.Kafka({
    clientId: 'auth',
    brokers: [String(process.env.KAFKA_PORT)],
});
exports.consumerSave = kafka.consumer({ groupId: "save" });
exports.consumerUpdate = kafka.consumer({ groupId: "update" });
exports.consumerRemove = kafka.consumer({ groupId: "remove" });
const app = (0, express_1.default)();
const port = process.env.APP_PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(AuthRoutes_1.default);
async function run() {
    const received = new ReceivedUser_1.ReceivedUser();
    received.save();
    received.update();
    received.remove();
    app.listen(port, () => {
        console.log("Aplication running!");
    });
}
run().catch(console.error);
