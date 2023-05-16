if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}
// Global Packages
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const session = require('express-session')
const bodyParser = require('body-parser')

//mongodb+srv://yehan:<password>@carcitycluster.dodfqtz.mongodb.net/

const app = express();


// Routes
const authRoutes = require('./routes/auth.routes')
const contactRoutes = require('./routes/operations.routes')

//Middle Were
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
     origin:'http://127.0.0.1:5173',
     credentials:true,
    
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


