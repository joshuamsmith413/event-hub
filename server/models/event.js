const mongoose = require('mongoose')

const Schema = mongoose.Schema
const eventSchema = new Schema({
    name: String,
    date: String,
    price: Number
})
module.exports = mongoose.model('event', eventSchema, 'events')