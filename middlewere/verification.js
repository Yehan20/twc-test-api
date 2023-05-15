// Function to create and send the jwt token
const jwt = require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
     console.log('run the middle weres')
    //  verify the token before giving access to the user
     const token = req.headers["authorization"];
     if(!token){
        return res.status(401).json({message:"Forbidden"})
     }
     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,user)=>{
          
          if(err){
            console.log(err)
             return res.status(401).json({message:'Access Denied'})
          }
          console.log(user)
          req.user = user;
          next();
     })  
}
const middleWeres = {
    verifyToken
}

module.exports = middleWeres;