import { RequestHandler } from 'express';
import { Service } from "typedi";
import { loginSchema, signupSchema, updateUserSchema } from "./schemas/schemas";
import UserRepository from "./user.repository";
import bcrypt from "bcrypt"
import { genToken } from "./user.entity";
import BadRequestException from '../exceptions/BadRequestException';
import NotFoundException from '../exceptions/NotFoundException';

@Service()
class UserService {
    constructor(
        private readonly userRepo: UserRepository
    ) {}

    async login(body: unknown) {
        const { email, password } = await loginSchema.validate(body)
        const user = await this.userRepo.findOneBy({ email })
        if(!user) throw new BadRequestException("invalid credentials")
        const isPassCorrect = await bcrypt.compare(password, user.password)
        if(!isPassCorrect) throw new BadRequestException("invalid credentials")
        const token = genToken(user)
        return token
    }

    async signup(body: unknown) {
        const validated = await signupSchema.validate(body)
        const exists = await this.userRepo.findOneBy({ email: validated.email })
        if(exists) throw new BadRequestException("user already exists")
        const user = this.userRepo.create(validated)
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(user.password, salt)
        user.password = hashedPass
        await this.userRepo.save(user)
        const token = genToken(user)
        return token
    }

    async getUserById(id: number) {
        const user = await this.userRepo.findOneBy({ id })
        if(!user) throw new NotFoundException("User was not found")
        return user
    }

    async updateUser(body: unknown, id: number) {
        const { firstName, lastName } = await updateUserSchema.validate(body)
        const { affected } = await this.userRepo.update({ id }, { firstName, lastName })
        if(!affected) throw new BadRequestException("User was not updated")
        return { message: "updated successfully" }
    }
}

export default UserService