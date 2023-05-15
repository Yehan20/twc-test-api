const mongoose = require('mongoose');

const ContactsSchema  = new mongoose.Schema({
       fullName:String,
       gender:String,
       email:String,
       phoneNumber:String,
})

const ContactSchema = new mongoose.Schema({
    userId:{
         type:String,
         required:true
    },
    userEmail:{
        type:String,
        required:true,
        lowercase:true,
    },
    contacts:{
        type:[ContactsSchema],
        required:true,
    }


})


module.exports = mongoose.model("contacts",ContactSchema)