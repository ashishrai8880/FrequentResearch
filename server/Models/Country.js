const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CountrySchema = new Schema({id : Number} , { strict: false })


const Country = mongoose.model('country', CountrySchema)
module.exports = Country
