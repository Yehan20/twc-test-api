if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}
// const KEY =function(){
//     if( process.env.MONGODB_SECRET_KEY===undefined){
  
//         return require('dotenv').config()
//     }
//     console.log('run')
//     return  process.env.MONGODB_SECRET_KEY
// }()

// console.log(KEY)

// Global Packages
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const session = require('express-session')
const bodyParser = require('body-parser')

const atlas=process.env.MONGODB_SECRET_KEY

const app = express();


// Routes
const authRoutes = require('./routes/auth.routes')
const contactRoutes = require('./routes/operations.routes')

//Middle Were
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
     origin:'https://yn-contacts-portal.netlify.app',
     credentials:true,
    
    
}));
app.use(session({
     key:"UserSession",
     secret:process.env.COOKIE_SECRET_KEY,
     cookie:{
        // secure:true,
        maxAge:3600000
     },
     saveUninitialized:false,
     resave:false,
}))
app.use(authRoutes);
app.use(contactRoutes);

app.listen(3001,()=>{
    console.log('run')
    mongoose.connect(atlas).then(result=>{
        if(result){
            console.log('connected to the database')
        }
    })
})


