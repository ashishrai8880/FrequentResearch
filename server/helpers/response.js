const successResponse = (res, message) => {
  res.status(200).send({ message: "Created successfully" });
};

const validationErrorResponse = (res, message) => {
  res.status(400).json({ message: message });
};

const registeredSuccessfully = (res, user, accessToken) => {
  res.status(201).json({
    message: "Congratulations ! Registered Successfully",
    user: { email: user.email },
    token: { accessToken: accessToken },
  });
};

const countryList = (res, data) => {
  res.status(201).json({
    message: "Country List",
    data: data,
  });
};

const state_by_country = (res, data) => {
  res.status(201).json({
    message: "State List",
    data: data,
  });
};

const city_by_state = (res, data) => {
  res.status(201).json({
    message: "City List",
    data: data,
  });
};

const internalServerError = (res) => {
  res.status(500).json({
    message: "Some  Internal Server Error Occured",
  });
};

const userNotExists = (res) => {
  res.status(404).json({
    message: "User Does Not Exists",
  });
};

const invalidCredentials = (res) => {
  res.status(404).json({
    message: "Credentials are not valid . Please Enter correct credentials",
  });
};

module.exports = {
  successResponse,
  validationErrorResponse,
  registeredSuccessfully,
  internalServerError,
  userNotExists,
  invalidCredentials,
  countryList ,
  state_by_country ,
  city_by_state 
};
