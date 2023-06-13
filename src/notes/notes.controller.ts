import { Service } from "typedi";
import handleError from "../handleError";
import NotesService from "./notes.service";

@Service()
class NotesController {
    constructor(
        private readonly notesService: NotesService
    ) {}

    getNotes = handleError(async(req, res) => {
        const notes = await this.notesService.getNotes((req as any).user.id)
        res.status(200).send(notes)
    })

    createNote = handleError(async(req, res) => {
        const note = await this.notesService.createNote(req.body, (req as any).user.id)
        res.status(200).send(note)
    })

    updateNote = handleError(async(req, res) => {
        const result = await this.notesService.updateNote(req.body, (req as any).user.id)
        res.status(200).send(result)
    })

    deleteNote = handleError(async(req, res) => {
        const result = await this.notesService.deleteNote(+req.params.id)
        res.status(200).send(result)
    })

    searchAndFilter = handleError(async(req, res) => {
        const notes = await this.notesService.searchAndFilter(req.query, (req as any).user.id)
        res.status(200).send(notes)
    })
}

export default NotesController