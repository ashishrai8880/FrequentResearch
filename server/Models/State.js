const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StateSchema = new Schema({id : Number} , { strict: false })


const State = mongoose.model('State', StateSchema)
module.exports = State
