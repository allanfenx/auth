"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivedUser = void 0;
const typeorm_1 = require("typeorm");
const app_1 = require("../app");
const ReceivedUserRepositories_1 = require("../repositories/ReceivedUserRepositories");
class ReceivedUser {
    async save() {
        await app_1.consumerSave.connect();
        await app_1.consumerSave.subscribe({ topic: "create_user", fromBeginning: true });
        await app_1.consumerSave.run({
            eachMessage: async ({ topic, partition, message }) => {
                const { value } = message;
                const { user_id, email, hashPassoword, role, name } = JSON.parse(value.toString());
                const repository = (0, typeorm_1.getCustomRepository)(ReceivedUserRepositories_1.ReceivedUserRepositories);
                try {
                    const user = repository.create({ registerId: user_id, email, password: hashPassoword, role, name });
                    await repository.save(user);
                }
                catch (error) {
                    throw error;
                }
            }
        });
    }
    async update() {
        await app_1.consumerUpdate.connect();
        await app_1.consumerUpdate.subscribe({ topic: "update_user", fromBeginning: true });
        await app_1.consumerUpdate.run({
            eachMessage: async ({ topic, partition, message }) => {
                const { value } = message;
                const { user_id, email, role } = JSON.parse(value.toString());
                const repository = (0, typeorm_1.getCustomRepository)(ReceivedUserRepositories_1.ReceivedUserRepositories);
                try {
                    const user = await repository.findOne({ registerId: user_id });
                    await repository.update(user.registerId, { role });
                }
                catch (error) {
                    throw error;
                }
            }
        });
    }
    async remove() {
        await app_1.consumerRemove.connect();
        await app_1.consumerRemove.subscribe({ topic: "test", fromBeginning: true });
        await app_1.consumerRemove.run({
            eachMessage: async ({ topic, partition, message }) => {
                const { value } = message;
                const { user_id } = JSON.parse(value.toString());
                const repository = (0, typeorm_1.getCustomRepository)(ReceivedUserRepositories_1.ReceivedUserRepositories);
                try {
                    const user = await repository.findOneOrFail(user_id);
                    await repository.remove(user);
                }
                catch (error) {
                    throw error;
                }
            }
        });
    }
}
exports.ReceivedUser = ReceivedUser;
