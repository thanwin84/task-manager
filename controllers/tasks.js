const Task = require('../models/task')
const {createCustomError} = require('../erros/custom-error')

const getAllTasks = async(req, res, next)=>{
    try {
        const taskList = await Task.find();
        // res.status(200).json(taskList)
        res.status(200).render('../views/home.ejs', {tasks: taskList})
    } catch (error) {
        console.log(error)
        //res.status(500).json({message: error})
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
        res.status(201).redirect('/api/v1/tasks')
        
    } catch (error) {
        // res.status(500).json({message: error})
        next(error)
    }
}

const getSingleTask = async(req, res, next)=>{
    const id = req.params.id;
    try {
        const task = await Task.findById(id)
        if (!task){
            
            return next(createCustomError(`no task id with ${id}`, 404))
        }
        res.status(200).render('../views/edit_task.ejs', {task: task})
    } catch (error) {
        // res.status(500).json({message: error})
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
            return next(createCustomError(`no task id with ${id}`, 404))
        }
        res.status(200).redirect('/api/v1/tasks')
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
            return next(createCustomError(`no task id with ${id}`, 404))
        }
        res.status(200).redirect('/api/v1/tasks')
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