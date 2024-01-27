const createError = require("http-errors");
const User = require("../Models/User");
const Country = require("../Models/Country");
const State = require("../Models/State");
const City = require("../Models/City");
const bcrypt = require('bcrypt')
const { authSchema } = require("../helpers/validation_schema");
const {successResponse, validationErrorResponse, registeredSuccessfully , internalServerError , userNotExists , invalidCredentials , countryList , state_by_country , cityByState, city_by_state} = require("../helpers/response");
const axios = require('axios');
const { signAccessToken, signRefreshToken,  verifyRefreshToken,} = require("../helpers/jwt_helper");

module.exports = {

  country: async (req, res, next) => {
    try {
      

      let data = await Country.find();

      return countryList(res , data) ;
      
    } catch (error) {
      
      console.log("some inteval server error : ashish", error);
      internalServerError(res)
    }
  },

  stateByCountry: async (req, res, next) => {
    try {
      
        let country_id = parseInt(req.query.country_id) ; 

        let data = await State.find({'country_id' : country_id});

        return state_by_country(res , data) ;
      
    } catch (error) {
      
      console.log("some inteval server error : ashish", error);
      internalServerError(res)
    }
  },

  cityByState: async (req, res, next) => {
    try {
      
        let state_id = parseInt(req.query.state_id) ; 

        let data = await City.find({'state_id' : state_id});

        return city_by_state(res , data) ;
      
    } catch (error) {
      
      console.log("some inteval server error : ashish", error);
      internalServerError(res)
    }
  },

  
  
};
