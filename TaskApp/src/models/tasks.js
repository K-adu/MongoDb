const mongoose = require('mongoose')

const Task = new mongoose.model('Task',{
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
})

module.exports = Task