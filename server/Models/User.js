const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  first_name: {
    type: String,
    lowercase: true,
  },
  last_name: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  // country: {
  //   type: String,
  // },
  // state: {
  //   type: String,
  // },
  // city: {
  //   type: String,
  // },
  // gender: {
  //   type: String,
  // },
  // date_of_birth : {
  //   type : String ,
  // },
  // age : {
  //   type : String ,
  // },
  // password : {
  //   type : String ,
  // },
  
})

// UserSchema.methods.isValidPassword = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password)
//   } catch (error) {
//     throw error
//   }
// }

const User = mongoose.model('user', UserSchema)
module.exports = User
