require('dotenv').config(); // loads environment variables from a .env file
const express=require ( 'express');
const mongoose= require( 'mongoose');
const session =require( 'express-session');//middleware for session management.
const path = require('path');

const app =express();
const PORT = process.env.PORT || 4000;

// database connection 
mongoose.connect(process.env.db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
const db =mongoose.connection;
db.on("error",(error)=>console.log(error));
db.once("open",()=> console.log("connected to db") );

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

app.use((req, res, next) => {
    delete res.locals.message; // Clear the property
    next();
});

//templete engin
app.use(express.static('uplodes'));
app.set("view engine","ejs");

//route prefix
app.use("",require("./routes/routs"));

app.listen(PORT,()=>{

    console.log(`server started at http://localhost:${PORT}`);
});