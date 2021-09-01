const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            return next(err)
        }

        this.password = hash;
        next();
    })
})

userSchema.methods.checkPassword = function (password) {
    const hashPassword = this.password
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashPassword, (err, same) => {
            if (err) {
                return reject(err)
            }
            resolve(same);
        })
    });
}
module.exports = { User: mongoose.model('user', userSchema) }
