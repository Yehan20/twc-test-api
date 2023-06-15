//Import global packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Importing shcemas
const userSchema = require('../model/users');
const contactSchema = require('../model/contacts');

// JWT Token Generations
const generateAccessToken = (user)=>{
   const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:'30m'})
   return accessToken;
}
const generateRefreshToken = (user)=>{
   const refreshToken =  jwt.sign(user,process.env.REFRESH_TOKEN_SECRET_KEY)
   return refreshToken;
}

//Auth methods

const login = async(req,res)=>{
 
    const {email,password} = req.body;    


    try{
         //Check if there is a  no user associated with that email 
        const existingUser = await userSchema.find({email:email})
        if(existingUser.length<1) return res.status(409).json({message:"No Account Associated With the Email"})
         
         //Check if Passwords are Same
        if(await bcrypt.compare(password,existingUser[0].password)) { 

            const sanitizedUser ={
                email:existingUser[0].email,
                _id:existingUser[0]._id,
            }
            
            req.session.user = sanitizedUser
            console.log("ression in loginn",req.session.user)

            // creating tokens
            const token = generateAccessToken(sanitizedUser) 
            const refreshToken = generateRefreshToken(sanitizedUser)

            //saving the refresh token in specific users document
            await userSchema.findByIdAndUpdate(
                {_id:existingUser[0]._id},
                {$set:{'refreshToken':refreshToken}},
                {new:true}
                )

            return res.status(200).json ({...sanitizedUser,accessToken:token,refreshToken:refreshToken})
        }
        else return res.status(500).json({message:"Password is Incorrect"})

    }catch(e){
        console.log(e)
        res.status(500).json({message:'Internal Server Error'})
    }
}

const register  = async(req,res)=>{
      const {email,password} = req.body

      try{
        // check if the email exists
        const existingUser = await userSchema.find({email:email})
        if(existingUser.length>0) return res.status(409).json({message:"That Email is Already Taken"})
        
        
        // hashing our password if email is okay
        const salt = await bcrypt.genSalt();
        const hashedPassowrd = await bcrypt.hash(password,salt);
        
        // Saving a User now
        const user = await userSchema.create({
            email:email,
            password:hashedPassowrd
        })

        //Create Contact Document 
        await contactSchema.create({
            userId:user._id,
            userEmail:user.email,
            contacts:[]
        })

        // Remove the password
        const sanitizedUser = {
            _id: user._id,
            email: user.email,
        };



        req.session.user = sanitizedUser

        // creating tokens
        const token = generateAccessToken(sanitizedUser) 
        const refreshToken = generateRefreshToken(sanitizedUser)

        await userSchema.findByIdAndUpdate(
            {_id:existingUser[0]._id},
            {$set:{'refreshToken':refreshToken}},
            {new:true}
        )

        res.status(200).json({...sanitizedUser,accessToken:token,refreshToken:refreshToken})

      }catch(e){
        console.log(e.message)
        res.status(500).json({message:"Internal Server Error"})
      }

}

const logout = async(req,res)=>{
    const userId= req.params.id
    try{
        await userSchema.findByIdAndUpdate(
            {_id:userId},
            {$set:{refreshToken:''}},
            {new:true}
        )
        req.session.destroy() ;
        res.status(204).json({message:"Logged Out"});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internel Error"})
    }
}

const isLogged = (req,res)=>{
    console.log(req.session.user)
    if(req.session.user){
        res.send({user:req.session.user,isLogged:true})
    }
    else res.status(401).send({isLogged:false})
}

const resetToken = async(req,res)=>{

 const id = req.body.id;
 const refreshToken=req.body.token
 
 // check if there is refresh Token
 if(refreshToken===null) return res.status(403).json({message:"Forbidden"});

 // check if the refresh token is same as the refresh token of the user
 try{
    const user = await userSchema.findById(id);
    console.log(user)
    if(user._id==id && user.refreshToken){
        // validate
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET_KEY,(err,result)=>{
             if(result) {
                 const newAcessToken = generateAccessToken({email:user.email, _id:user._id,});
                 return res.json({accessToken:newAcessToken})
             }
            return res.status(403).json({message:"Forbidden"})
        })
    }
  else return res.status(500).json({message:"Token is Invalid"});
 }catch(e){
    res.status(500).json({message:'Internal Server Error'})
 }

}


const AuthController= {
     login,register,logout,resetToken,isLogged
}

module.exports = AuthController;