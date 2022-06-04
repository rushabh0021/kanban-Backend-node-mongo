const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const boardSchema = new mongoose.Schema(
    {
        name: {
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
        createdBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
            required: true
        },
    },
    {
        timestamp: true
    }
)
boardSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = { Board: mongoose.model('board', boardSchema) }