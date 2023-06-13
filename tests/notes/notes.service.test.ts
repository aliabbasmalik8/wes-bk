import { Repository, SelectQueryBuilder } from 'typeorm';
import { ValidationError } from 'yup';
import { NotesStatus } from '../../src/constants/noteStatus';
import BadRequestException from '../../src/exceptions/BadRequestException';
import Notes from '../../src/notes/notes.entity';
import NotesRepository from "../../src/notes/notes.repository";
import NotesService from "../../src/notes/notes.service"

jest.mock("../../src/notes/notes.repository.ts");

describe("notes.service.ts", () => {
    let notesService: NotesService;
    let mockNotesRepo: jest.Mocked<NotesRepository>;
    const user =  { 
        id: 1, 
        firstName: "John", 
        lastName: "Berzenk", 
        email: "john@email.com", 
        password: "$2b$10$MCFUGFLNjQJC8iUrX7FgA.RjSGePRmXfVgv1OC9GxR7D6zioq8.hW", 
        createAt: new Date(), 
        updatedAt: new Date() 
    };
    const notes: Notes[] = [
        { id: 1, title: 'note 1', description: 'note 1 description', status: NotesStatus.UNDONE, createAt: new Date(), updatedAt: new Date(), user },
        { id: 2, title: 'note 2', description: 'note 2 description', status: NotesStatus.UNDONE, createAt: new Date(), updatedAt: new Date(), user },
        { id: 3, title: 'note 3', description: 'note 3 description', status: NotesStatus.UNDONE, createAt: new Date(), updatedAt: new Date(), user },
        { id: 4, title: 'note 4', description: 'note 4 description', status: NotesStatus.UNDONE, createAt: new Date(), updatedAt: new Date(), user },
    ]

    beforeEach(() => {
        mockNotesRepo = new NotesRepository({} as Repository<Notes>) as any;
        notesService = new NotesService(mockNotesRepo)
    });

    it("should return notes", async() => {
        // arrange
        mockNotesRepo.findBy.mockResolvedValue(notes);

        // act
        const result = await notesService.getNotes(user.id)

        // expect
        expect(result).toBe(notes)
    });

    it("should create note when correct payload is passed", async() => {
        // arrange
        const payload = { title: "note 1", description: "note 1 description" };
        mockNotesRepo.create.mockReturnValue(notes[0]);

        // act
        const result = await notesService.createNote(payload, user.id);

        // expect
        expect(result).toBe(notes[0]);
    });

    it("should raise 'ValidationError' if payload passed to createNote is invalid", async() => {
        // arrange
        const payload = {}

        // act
        try {
            await notesService.createNote(payload, user.id);
        }

        // expect
        catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
        }
    });

    it("should update note when valid payload is sent", async() => {
        // arrange
        const payload = { id: 1, description: 'note 1 description' };
        mockNotesRepo.update.mockResolvedValue({ affected: 1, raw: null, generatedMaps: [] });

        // act
        const result = await notesService.updateNote(payload, user.id);

        // expect
        expect(result).toHaveProperty("message");
        expect(result.message).toEqual("updated successfully");
    });

    it("should raise 'ValidationError' if payload passed to updateNote is invalid", async() => {
        // arrange
        const payload = { description: {} };

        // act
        try {
            await notesService.updateNote(payload, user.id);
        }

        // expect
        catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
        }
    });

    it("should raise 'BadRequestException' if notes were not updated", async() => {
        // arrange
        const payload = { id: 1, description: 'note 1 description' };
        mockNotesRepo.update.mockResolvedValue({ affected: 0, raw: null, generatedMaps: [] });

        // act
        try {
            await notesService.updateNote(payload, user.id);
        }

        // expect
        catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    });

    it("should delete note with passed id", async() => {
        // arrange
        const noteId = 1;
        mockNotesRepo.delete.mockResolvedValue({ affected: 1, raw: null });

        // act
        const result = await notesService.deleteNote(noteId);

        // expect
        expect(result).toHaveProperty("message");
        expect(result.message).toEqual("successfully deleted note");
    });

    it("should raise 'BadRequestException' if notes were not deleted", async() => {
        // arrange
        const noteId = 1;
        mockNotesRepo.delete.mockResolvedValue({ affected: 0, raw: null });

        // act
        try {
            await notesService.deleteNote(noteId);
        }

        // expect
        catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    });

    it("should raise 'ValidationError' if invalid payload is sent to searchAndFilter", async() => {
        // arrange
        const payload = { title: {} }

        // act
        try {
            await notesService.searchAndFilter(payload, user.id);
        }

        // expect
        catch (error) {
            expect(error).toBeInstanceOf(ValidationError);
        }
    });

    it("should do anything it likes", async() => {
        // arrange
        const payload = { title: 'notes 1' }
        mockNotesRepo.createQueryBuilder.mockReturnValue({ getMany: async() => notes, andWhere: (...args) => {} } as SelectQueryBuilder<Notes>);
        
        // act
        const result = await notesService.searchAndFilter(payload, user.id);

        // expect
        expect(result).toEqual(notes);
    });
});
