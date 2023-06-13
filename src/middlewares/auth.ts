import { RequestHandler } from 'express';
import jwt from "jsonwebtoken"

const auth: RequestHandler = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return res.status(401).send({ error: "Not authorized" })
    try {
        const decoded = jwt.verify(token, `${process.env.SECRET}`);
        (req as any).user = decoded
        next()
    } catch (error) {
        res.status(401).send({ error: "Not authorized" })
    }
}

export default auth