const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const taskSchema = new mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 100
        },
        priority: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            enum: ["low", "medium", "high"]
        },
        dueDate: Date,
        createdBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
            required: true
        },
        board: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "board",
            required: true
        }
    },
    {
        timestamp: true
    }
)
taskSchema.index({ taskName: 1, dueDate: 1 }, { unique: true });

module.exports = { Task: mongoose.model('task', taskSchema) }