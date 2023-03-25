class CustomApIError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (message, statusCode)=>{
    return new CustomApIError(message, statusCode)
}

module.exports = {
    CustomApIError,
    createCustomError
}