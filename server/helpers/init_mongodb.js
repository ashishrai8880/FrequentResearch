const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('mongodb connected.')
  })
  .catch((err) => console.log('MongoDB is not connected due to : ',err.message))

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db')
})

mongoose.connection.on('error', (err) => {
  console.log('Some error occured in making connection with mongodb ' ,err.message)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected.')
})

// process.on('SIGINT', async () => {
//   await mongoose.connection.close()
//   process.exit(0)
// })
