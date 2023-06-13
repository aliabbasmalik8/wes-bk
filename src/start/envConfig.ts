import { config } from "dotenv"

const envConfig = () => {
    const NODE_ENV = process.env.NODE_ENV?.trim();
    config({ path: `.env.${NODE_ENV}` })
}

export default envConfig