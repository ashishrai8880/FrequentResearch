const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const cors = require("cors");
require("dotenv").config();
require("./helpers/init_mongodb");
const { verifyAccessToken } = require("./helpers/jwt_helper");

const PORT = process.env.PORT || 3000;

const AuthRoute = require("./Routes/AuthRoute");
const AddressRoute = require("./Routes/AddressRoute");

const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/",   (req, res) => {
    res.send("Hello from express.");
  });

  app.use("/api/auth", AuthRoute);
  app.use("/api/auth", AddressRoute);

//   app.use(async (req, res, next) => {
//     next(createError.NotFound());
//   });

//   app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.send({
//       error: {
//         status: err.status || 500,
//         message: err.message,
//       },
//     });
//   });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
