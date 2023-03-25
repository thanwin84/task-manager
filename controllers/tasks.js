const Task = require('../models/task')
const {httpStatusCodes} = require('../lib/httpStatusCodes')
const {Api404Error} = require('../erros/apiErrors')

const getAllTasks = async(req, res, next)=>{
    try {
        const taskList = await Task.find();
        res.status(httpStatusCodes.OK).render('../views/home.ejs', {tasks: taskList})
    } catch (error) {
        next(error)
    }
}

const createAtask = async(req, res, next)=>{
    try {
        const task = await Task.create(
            {
                name: req.body.name,
                completed: req.body.completed
            }
        )
        task.save()
        res.status(httpStatusCodes.CREATED).redirect('/api/v1/tasks')
        
    } catch (error) {
        // res.status(500).json({message: error})
        next(new Api404Error(`No task exist with ${id}`))
    }
}

const getSingleTask = async(req, res, next)=>{
    const id = req.params.id;
    try {
        const task = await Task.findById(id)
        if (!task){
            return next(new Api404Error(`No task exist with ${id}`))
        }
        res.status(httpStatusCodes.OK).render('../views/edit_task.ejs', {task: task})
    } catch (error) {
        next(error)
    }
}

const updateAtask = async(req, res, next)=>{

   try {
        const id = req.params.id;
        const result = await Task.updateOne(
            {_id: id},
            {$set: {name: req.body.name, completed: Boolean(req.body.myclick)}},
            {runValidators:true}
        )
        
        if (!result.acknowledged){
            return next(new Api404Error(`No task exist with ${id}`))
        }
        res.status(httpStatusCodes.OK).redirect('/api/v1/tasks')
   } catch (error) {
        // res.status(500).json({message: error})
        next(error)
   }
}

const deleteATask = async(req, res, next)=>{
    try {
        const id = req.params.id;
        const task = await Task.findOneAndDelete({_id: id})
        if (!task){
            return next(new Api404Error(`No task exist with ${id}`))
        }
        res.status(httpStatusCodes.OK).redirect('/api/v1/tasks')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllTasks,
    createAtask,
    getSingleTask,
    updateAtask,
    deleteATask
}