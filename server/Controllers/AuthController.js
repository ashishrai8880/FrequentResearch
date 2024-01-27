const createError = require("http-errors");
const User = require("../Models/User");
const Country = require("../Models/Country");
const State = require("../Models/State");
const City = require("../Models/City");
const bcrypt = require('bcrypt')
const { authSchema } = require("../helpers/validation_schema");
const {successResponse, validationErrorResponse, registeredSuccessfully , internalServerError , userNotExists , invalidCredentials} = require("../helpers/response");
const axios = require('axios');
const { signAccessToken, signRefreshToken,  verifyRefreshToken,} = require("../helpers/jwt_helper");

module.exports = {
  register: async (req, res, next) => {
    try {
      const result = authSchema.validate(req.body);

      if (result.error) {
        return validationErrorResponse(res, result.error.message);
      }
      
      const doesExist = await User.findOne({ email: result.value.email });
      if (doesExist) {
        validationErrorResponse( res, `${result.value.email} is already been registered`);
      }

      // let hashPassword =await bcrypt.hash(result.value.password, 10) ;
      // const user = new User({...result.value , password : 'hashPassword'});
      const user = new User({...result.value });

      const savedUser = await user.save();

      const accessToken = await signAccessToken(savedUser.id);
      const refreshToken = await signRefreshToken(savedUser.id);

      return registeredSuccessfully(res , user , accessToken)
      
    } catch (error) {
      
      console.log("some inteval server error : ashish", error);
      internalServerError(res)
    }
  },

  country: async (req, res, next) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer 6|IYbfWhozeHWHHFDq5eEn54lz6UlUMCaIYVghSfj32bad0b41`,
      };
      let data = await axios.get('http://127.0.0.1:8000/api/v1/countries/' , {headers}) ;
      data = data.data.data ;

      // Insert multiple documents into the 'users' collection
      let result = await Country.insertMany(data) ;

      return res.status(200).send(result);
      
    } catch (error) {
      
      console.log("some inteval server error : ashish", error);
      internalServerError(res)
    }
  },

  state: async (req, res, next) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer 6|IYbfWhozeHWHHFDq5eEn54lz6UlUMCaIYVghSfj32bad0b41`,
      };
      let data = await axios.get('http://127.0.0.1:8000/api/v1/state/list/' , {headers}) ;
      data = data.data.data ;

      // Insert multiple documents into the 'users' collection
      let result = await State.insertMany(data) ;

      return res.status(200).send(result);
      
    } catch (error) {
      
      console.log("some inteval server error : ashish", error);
      internalServerError(res)
    }
  },

  city: async (req, res, next) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer 1|M1GSU8iWdLCrh6kXVxVfi7m3Ogcfd176yoRNEI9gbd6b402f`,
      };
      let data = await axios.get(`http://127.0.0.1:8000/api/v1/city/list/?perPage=${10000}&page=${16}` , {headers }) ;
      data = data.data.data ;

      // Insert multiple documents into the 'users' collection
      let result = await City.insertMany(data) ;

      return res.status(200).send(result);
      
    } catch (error) {
      
      console.log("some inteval server error : ashish", error);
      internalServerError(res)
    }
  },

  login: async (req, res, next) => {
    try {
      

      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return userNotExists(res);
      }

      const isMatch = await user.isValidPassword(req.body.password);
      if (!isMatch){
          invalidCredentials(res)
      }

      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);

      return registeredSuccessfully(res , user , accessToken)

    } catch (error) {
      
        console.log("some inteval server error : ashish", error);
        internalServerError(res)

    }
  },

  
};
