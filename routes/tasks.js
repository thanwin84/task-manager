const express = require('express')
const router = express.Router()
const {
    getAllTasks,
    createAtask,
    getSingleTask,
    updateAtask,
    deleteATask,
} = require('./../controllers/tasks')


router.route('/')
.get(getAllTasks)
.post(createAtask)


router.route('/:id')
.get(getSingleTask)
.patch(updateAtask)
.delete(deleteATask)

module.exports = router;