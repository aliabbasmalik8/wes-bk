import { Service } from "typedi";
import handleError from "../handleError";
import UserService from "./user.service";

@Service()
class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    login = handleError(async(req, res) => {
        const token = await this.userService.login(req.body)
        res.status(200).send(token)
    })

    signup = handleError(async(req, res) => {
        const token = await this.userService.signup(req.body)
        res.status(200).send(token)
    })

    getUser = handleError(async(req, res) => {
        const user = await this.userService.getUserById((req as any).user.id)
        res.status(200).send(user)
    })

    updateUser = handleError(async(req, res) => {
        const updatedUser = await this.userService.updateUser(req.body, (req as any).user.id)
        res.status(200).send(updatedUser)
    })
}

export default UserController