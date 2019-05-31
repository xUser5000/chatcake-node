const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    from: String,
    content: String
})

const roomSchema = new Schema({
    name: String,
    admin: String,
    members: [String],
    messages: [messageSchema]
})

const roomModel = mongoose.model('rooms', roomSchema)

exports = roomModel