import { EntityRepository, Repository } from "typeorm";
import { ReceivedUser } from "../entities/ReceivedUser";

@EntityRepository(ReceivedUser)
class ReceivedUserRepositories extends Repository<ReceivedUser>{ }

export { ReceivedUserRepositories }