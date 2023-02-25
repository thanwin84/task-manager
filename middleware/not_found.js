const notFound = (req, res)=>{
    res.status(400).send('Resource does not exist')
}

module.exports = notFound