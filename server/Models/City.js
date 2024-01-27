const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitySchema = new Schema({id : Number} , { strict: false })


const City = mongoose.model('City', CitySchema)
module.exports = City
