const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        validate:{ // check the email format using a regex
          validator:v=>{
            const emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;
            return emailRegex.test(v)
          },
          message:()=> "Email Format is Wrong"
        }
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
        required:false,
    }


})

module.exports = mongoose.model("user",UserSchema)