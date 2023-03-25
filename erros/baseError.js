class BaseError extends Error{
    constructor(message, statusCode, isOperational, description){
        super(message)
        this.statusCode = statusCode
        this.isOperational = isOperational
        this.description = description
    }
}

module.exports = {
    BaseError
}