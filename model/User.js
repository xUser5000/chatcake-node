const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    rooms: [String]
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel