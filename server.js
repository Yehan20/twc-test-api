if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}
// Global Packages
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const session = require('express-session')


const app = express();


// Routes
const authRoutes = require('./routes/auth.routes')
const contactRoutes = require('./routes/operations.routes')

//Middle Were
app.use(express.json());
app.use(cors({
     //origin:'',
     credentials:true,
     methods:["GET","POST"]
}));
app.use(session({
     key:"UserSession",
     secret:process.env.COOKIE_SECRET_KEY,
     cookie:{
        maxAge:3600000
     }
}))
app.use(authRoutes);
app.use(contactRoutes);

app.listen(3001,()=>{
    console.log('run')
    mongoose.connect('mongodb://localhost:27017/twc').then(result=>{
        if(result){
            console.log('connected to the database')
        }
    })
})


