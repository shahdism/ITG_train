const mongoose =require('mongoose');


mongoose.connect(process.env.db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
const db =mongoose.connection;
db.on("error",(error)=>console.log(error));
db.once("open",()=> console.log("connected to db") );

module.exports = db; // Export the db connection object
