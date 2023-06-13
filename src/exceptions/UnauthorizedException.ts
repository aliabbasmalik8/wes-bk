

class UnauthorizedException extends Error {
    constructor(message: string) {
        super(JSON.stringify({ message, status: 401 }))
    }
}

export default UnauthorizedException