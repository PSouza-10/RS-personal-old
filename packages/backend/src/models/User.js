const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 33
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: false,
        maxlength: 11,
        minlength: 11
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    const hashedPassword = await bcrypt.hash(this.password, 10)

    this.password = hashedPassword
})

module.exports = model('User', UserSchema)