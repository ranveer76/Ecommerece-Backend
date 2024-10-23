require('dotenv').config()
const jwt=require('jsonwebtoken')

exports.generateToken=(payload,passwordReset=false)=>{
    return jwt.sign(payload,process.env.SECRET_KEY || "your-secret-key",{expiresIn:passwordReset?process.env.PASSWORD_RESET_TOKEN_EXPIRATION || "2m" :process.env.LOGIN_TOKEN_EXPIRATION || "30d"})
}