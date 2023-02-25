
const {CustomApIError} = require('../erros/custom-error')
const errorHandler = (error, req, res, next)=>{
    if (error instanceof CustomApIError){
        res.status(error.statusCode).json({message: error.message})
    }
    res.status(505).json({message: error})
}

module.exports = errorHandler