import Container from "typedi"
import { DataSource } from "typeorm"
import Notes from "../notes/notes.entity"
import User from "../user/user.entity"

const dataSource = new DataSource ({
    host: `${process.env.DB_HOST}`,
    port: +`${process.env.DB_PORT}`,
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    type: "postgres",
    synchronize: true,
    entities: [User, Notes]
})

Container.set(DataSource, dataSource)

export default dataSource