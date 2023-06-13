import express from "express"

// Configure Enviornment Variables
import envConfig from "./start/envConfig"
envConfig()

// Initialize Connection With Database
import dataSource from "./start/dataSource"
dataSource.initialize()
    .then(() => console.log(`connected with database`))
    .catch(err => console.error(err))

import getRoutes from "./start/getRoutes"

const app = express()
getRoutes(app)

export default app