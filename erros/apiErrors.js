const {BaseError} = require('./baseError')
const {httpStatusCodes} = require('../lib/httpStatusCodes')

class Api404Error extends BaseError{
    constructor(message, statusCode = httpStatusCodes.NOT_FOUND){
        super(message, statusCode)
    }
}

const n = new Api404Error("djfj")
console.log(n)
module.exports = {
    Api404Error
}