
const successResponse = (res , message)=>{
    res.status(200).send({message : 'Created successfully'})
}

const validationErrorResponse = (res , message)=>{
    res.status(400).json({message : message})
}

const registeredSuccessfully = (res , user , accessToken )=>{
    res.status(201).json({
        message: "Congratulations ! Registered Successfully",
        user: { email: user.email },
        token: { accessToken: accessToken }})
}

const internalServerError = (res  )=>{
    res.status(500).json({
        message: "Some  Internal Server Error Occured",
})}

const userNotExists = (res  )=>{
    res.status(404).json({
        message: "User Does Not Exists",
})}

const invalidCredentials = (res  )=>{
    res.status(404).json({
        message: "Credentials are not valid . Please Enter correct credentials",
})}



module.exports = {successResponse , validationErrorResponse , registeredSuccessfully , internalServerError , userNotExists , invalidCredentials}