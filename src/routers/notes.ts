import { Router } from "express"
import Container from "typedi"
import auth from "../middlewares/auth"
import NotesController from "../notes/notes.controller"

const notesController = Container.get(NotesController)

const notes = Router()
notes.use("*", auth)

notes.get("/", notesController.getNotes)
notes.post("/createNote", notesController.createNote)
notes.put("/updateNote", notesController.updateNote)
notes.delete("/:id", notesController.deleteNote)
notes.post("/search", notesController.searchAndFilter)

export { notes as notesRouter }