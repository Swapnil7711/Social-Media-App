
class CustomeErrorHandler extends Error {

    constructor(statusCode, message) {
        super(),
            this.statusCode = statusCode,
            this.message = message
    }

    static alreadyExists(message) {
        return new CustomeErrorHandler(409, message)
    }

    static wrongCredentials(message) {
        return new CustomeErrorHandler(401, message)
    }

    static Unauthorized(message) {
        return new CustomeErrorHandler(401, message)
    }


}

export default CustomeErrorHandler