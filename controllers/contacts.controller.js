// Containes Crud Operations of the contacts

//Import global packages
const jwt = require('jsonwebtoken');

//Importing shcemas
const userSchema = require('../model/users');
const contactSchema = require('../model/contacts');


const viewContacts=  async(req,res)=>{
    const user = (req.user)
    try{
        const usersContacts = await contactSchema.findOne({userId:user._id})
        res.status(200).json(usersContacts)
    }catch(e){
        console.log(e)
        res.status(500).json({message:"Internal Server Error"})
    }

}

const addContact = async(req,res)=>{

    const {fullName,gender,phoneNumber,email} = req.body;
    const user = req.user;

    const newContact={
        fullName,gender,phoneNumber,email
    }

    //Adding a new Contact to the array of the document of the user
    try{
      const updatedContact= await contactSchema.findOneAndUpdate(
            {userId:user._id},
            {$push:{contacts:newContact}},
            {new:true}
         )

      res.status(200).json(updatedContact)
    } catch(e){

     console.log(e)
      res.status(500).json({message:"Internal Server Error"})
    }

}

const updateContact = async(req,res)=>{
    const user = (req.user)

    //From the client
    const updatedContact = {
         fullName:req.body.newFullName,
         email:req.body.newEmail,
         phone:req.body.newNumber,
         gender:req.body.newGender,
         id:req.body.id
    }
    try{
        const doc = await contactSchema.findOneAndUpdate(

            { userId:user._id},
            {$set:{'contacts.$[elem].fullName':updatedContact.fullName,
                   'contacts.$[elem].email':updatedContact.email,
                   'contacts.$[elem].gender':updatedContact.gender,
                   'contacts.$[elem].phoneNumber':updatedContact.phone
            }},
            {
                new:true,
                arrayFilters:[{'elem._id':updatedContact.id}]
            }
            )

         res.status(200).json(doc)   
            
    }catch(e){
         res.status(500).json({message:"Internal Server Error"})
    }
}

const deleteContact = async(req,res)=>{
   //const userId  =req.user._id;
   const contactId = req.body.id;
   try{
    // we update and remove the contact
     const updatedContact = await contactSchema.findOneAndUpdate(
        {userId:req.user._id},
        {$pull:{contacts:{_id:contactId}}},
        {new:true},
        )
     console.log(updatedContact)   
     res.status(200).json(updatedContact);   
   }catch(e){
      res.status(500).json({message:'Internal Server Error'})
   }

}



const contactController= {
    viewContacts,addContact,updateContact,deleteContact
}
module.exports = contactController;