import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import jwt from "jsonwebtoken"

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

const genToken = (user: User) => {
    return jwt.sign({ ...user }, `${process.env.SECRET}`, { expiresIn: "15d" })
}

export default User
export { genToken }