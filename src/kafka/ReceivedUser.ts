import { getCustomRepository } from "typeorm";
import { consumerRemove, consumerSave, consumerUpdate } from "../app";
import { ReceivedUserRepositories } from "../repositories/ReceivedUserRepositories";




class ReceivedUser {

    async save() {

        await consumerSave.connect();

        await consumerSave.subscribe({ topic: "create_user", fromBeginning: true });

        await consumerSave.run({
            eachMessage: async ({ topic, partition, message }) => {

                const { value } = message;

                const { user_id, email, hashPassoword, role, name } = JSON.parse(value!.toString());

                const repository = getCustomRepository(ReceivedUserRepositories);

                try {

                    const user = repository.create({ registerId: user_id, email, password: hashPassoword, role, name });

                    await repository.save(user);

                } catch (error) {

                    throw error;
                }



            }
        })
    }

    async update() {

        await consumerUpdate.connect();

        await consumerUpdate.subscribe({ topic: "update_user", fromBeginning: true });

        await consumerUpdate.run({
            eachMessage: async ({ topic, partition, message }) => {

                const { value } = message;

                const { user_id, email, role } = JSON.parse(value!.toString());

                const repository = getCustomRepository(ReceivedUserRepositories);

                try {

                    const user = await repository.findOne({ registerId: user_id });

                    await repository.update(user!.registerId, { role });

                } catch (error) {

                    throw error;
                }

            }
        })
    }


    async remove() {

        await consumerRemove.connect();

        await consumerRemove.subscribe({ topic: "test", fromBeginning: true });

        await consumerRemove.run({
            eachMessage: async ({ topic, partition, message }) => {

                const { value } = message;

                const { user_id } = JSON.parse(value!.toString());

                const repository = getCustomRepository(ReceivedUserRepositories);

                try {
                    const user = await repository.findOneOrFail(user_id);

                    await repository.remove(user);

                } catch (error) {

                    throw error;
                }

            }
        })

    }
}

export { ReceivedUser };

