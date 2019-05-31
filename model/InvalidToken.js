const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invalidTokenSchema = new Schema({ content: String })

const invalidTokenModel = mongoose.model('invalidTokens', invalidTokenSchema)

module.exports = invalidTokenModel