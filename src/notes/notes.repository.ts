import { Container, Service } from 'typedi';
import { Repository } from 'typeorm';
import dataSource from '../start/dataSource';
import Notes from './notes.entity';

const notesRepo = dataSource.getRepository(Notes)
Container.set(Repository<Notes>, notesRepo)

@Service()
class NotesRepository extends Repository<Notes> {
    constructor(private respository: Repository<Notes>) {
        super(respository.target, respository.manager, respository.queryRunner)
    }
}

export default NotesRepository