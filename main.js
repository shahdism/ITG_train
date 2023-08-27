require('dotenv').config(); // loads environment variables from a .env file
const express=require ( 'express');
const db = require('./models/connection'); // Import the db connection object from the main application file
const session =require( 'express-session');//middleware for session management.
const path = require('path');

const app =express();
const PORT = process.env.PORT || 4000;


//middleware 
app.use(express.urlencoded ({extended:false}));
app.use(express.json());

app.use(
    session({
   secret:"my secret key ",
   saveUninitialized: true,
   resave:true
    })
);



//templete engin
app.use(express.static('uplodes'));
app.set("view engine","ejs");

//route prefix
app.use("",require("./routes/routs"));

app.listen(PORT,()=>{

    console.log(`server started at http://localhost:${PORT}`);
});