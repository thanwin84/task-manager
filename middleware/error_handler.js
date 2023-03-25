
const {CustomApIError} = require('../erros/baseError')
const errorHandler = (error, req, res, next)=>{
    res.send(error.message)
}

module.exports = errorHandler