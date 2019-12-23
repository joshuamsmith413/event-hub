const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    description: String,
    date: { type: Date, default: Date.now },
    price: Number
});

module.exports = mongoose.model('event', eventSchema, 'events');