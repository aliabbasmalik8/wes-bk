import { Express, json } from "express"
import cors from "cors"
import { Routes } from "../constants/routes"
import { userRouter } from "../routers/user"
import { notesRouter } from "../routers/notes"

const getRoutes = (app: Express) => {
    app.use(json())
    app.use(cors())
    app.use(Routes.USERS, userRouter)
    app.use(Routes.NOTES, notesRouter)
}

export default getRoutes