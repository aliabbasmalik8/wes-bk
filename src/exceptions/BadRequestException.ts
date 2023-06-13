
class BadRequestException extends Error {
    constructor(message: string) {
        super(JSON.stringify({ message, status: 400 }))
    }
}

export default BadRequestException