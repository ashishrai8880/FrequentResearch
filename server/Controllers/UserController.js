const User = require("../Models/User");
const bcrypt = require('bcrypt')
const {successResponse , internalServerError , userNotExists , invalidCredentials , userResponse} = require("../helpers/response");
const { signAccessToken, signRefreshToken,  verifyRefreshToken,} = require("../helpers/jwt_helper");

module.exports = {
  user: async (req, res, next) => {
    try {
      
      let user = await User.find();
        

      return userResponse(res , user )
      
    } catch (error) {
      
      console.log("some inteval server error : ashish", error);
      internalServerError(res)
    }
  },


  
};
