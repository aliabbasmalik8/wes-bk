import { Router } from "express"
import Container from "typedi"
import auth from "../middlewares/auth"
import UserController from "../user/user.controller"

const userController = Container.get(UserController)

const users = Router()

users.post("/login", userController.login)
users.post("/signup", userController.signup)
users.get("/getUser", auth, userController.getUser)
users.put("/updateUser", auth, userController.updateUser)

export { users as userRouter }