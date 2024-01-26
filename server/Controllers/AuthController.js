const createError = require("http-errors");
const User = require("../Models/User");
const bcrypt = require('bcrypt')
const { authSchema } = require("../helpers/validation_schema");
const {
  successResponse,
  validationErrorResponse, registeredSuccessfully , internalServerError , userNotExists , invalidCredentials
} = require("../helpers/response");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helper");

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

      let hashPassword =await bcrypt.hash(result.value.password, 10) ;

      const user = new User({...result.value , password : hashPassword});
      
      const savedUser = await user.save();

      const accessToken = await signAccessToken(savedUser.id);
      const refreshToken = await signRefreshToken(savedUser.id);

      return registeredSuccessfully(res , user , accessToken)
      
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
