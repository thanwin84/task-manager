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
const userSchema = new mongoose.Schema(
    {
        username: String, 
        hash: String,
        salt: String,
        tasks: [taskSchema]
    }
)


const User = mongoose.model('User', taskSchema)
module.exports = User