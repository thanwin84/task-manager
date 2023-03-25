class BaseError extends Error{
    constructor(name, statusCode, isOperational, description){
        super(name)
        this.statusCode = statusCode
        this.isOperational = isOperational
        this.description = description
    }
}

module.exports = {
    BaseError
}