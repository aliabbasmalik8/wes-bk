import Container, { Service } from "typedi";
import { Repository } from "typeorm"
import dataSource from "../start/dataSource";
import User from "./user.entity";

const userRepo = dataSource.getRepository(User)
Container.set(Repository<User>, userRepo)

@Service()
class UserRepository extends Repository<User> {
    constructor(private repository: Repository<User>) {
        super(repository.target, repository.manager, repository.queryRunner)
    }
}

export default UserRepository