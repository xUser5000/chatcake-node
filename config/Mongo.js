const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/chatcake', { useNewUrlParser: true })

mongoose.connection.once('open', () => {
    console.log('MongoDB connection is established......')
}).on('error', err => {
    console.error(err)
})