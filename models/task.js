const mongoose = require('mongoose')



const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, "You must provide a name"],
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: new Date()
        }

    }
)


const Task = mongoose.model('Task', taskSchema)
module.exports = Task