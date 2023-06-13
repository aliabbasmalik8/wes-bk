import { Service } from "typedi";
import BadRequestException from "../exceptions/BadRequestException";
import NotesRepository from "./notes.repository";
import { createNoteSchema, searchAndFilterNoteSchema, updateNoteSchema } from "./schemas/schemas";

@Service()
class NotesService {
    constructor(
        private readonly notesRepo: NotesRepository
    ) {}

    async getNotes(userId: number) {
        return await this.notesRepo.findBy({ user: { id: userId } })
    }

    async createNote(body: unknown, userId: number) {
        const { title, description } = await createNoteSchema.validate(body)
        const note = this.notesRepo.create({ title, description, user: { id: userId } })
        await this.notesRepo.save(note)
        return note
    }

    async updateNote(body: unknown, userId: number) {
        const { id, title, description, status } = await updateNoteSchema.validate(body)
        const { affected } = await this.notesRepo.update({ id, user: { id: userId } }, { title, description, status })
        if(!affected) throw new BadRequestException("Note was not updated")
        return { message: "updated successfully" }
    }

    async deleteNote(noteId: number) {
        const { affected } = await this.notesRepo.delete({ id: noteId })
        if(!affected) throw new BadRequestException("No note was deleted")
        return { message: "successfully deleted note" }
    }

    async searchAndFilter(body: unknown, userId: number) {
        const { title, createdAfter, createdBefore, updatedAfter, updatedBefore, status } = await searchAndFilterNoteSchema.validate(body)
        const query = this.notesRepo.createQueryBuilder('notes')
        query.andWhere('notes.userId = :userId', { userId })
        if (createdAfter) query.andWhere('notes.createAt > :createdAfter', { createdAfter });
        if (createdBefore) query.andWhere('notes.createAt < :createdBefore', { createdBefore });
        if (updatedAfter) query.andWhere('notes.updatedAt > :updatedAfter', { updatedAfter });
        if (updatedBefore) query.andWhere('notes.updatedAt < :updatedBefore', { updatedBefore });
        if (title) query.andWhere('notes.title LIKE :title', { title: `%${title}%` })
        if (status) query.andWhere('notes.status = :status', { status })
        const notes = await query.getMany()
        return notes
    }
}

export default NotesService