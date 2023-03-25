const {BaseError} = require('./baseError')
const {httpStatusCodes} = require('../lib/httpStatusCodes')

class Api404Error extends BaseError {
    constructor(
        message,
        stutusCode = httpStatusCodes.NOT_FOUND,
        isOperational = true,
        description = 'Not Found'
    ){
        super(message, statusCode, isOperational, description)
    }
   
}


module.exports = {
    Api404Error
}