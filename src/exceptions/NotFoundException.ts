
class NotFoundException extends Error {
    constructor(message: string) {
        super(JSON.stringify({ message, status: 404 }))
    }
}

export default NotFoundException