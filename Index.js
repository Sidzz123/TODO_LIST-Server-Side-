// Main component file where the frontend hits first before anything.

const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./Config/DataBase');
const cookieParser = require('cookie-parser');
const Troutes = require('./Routes/Tasks');
const auth = require('./Routes/Auth');
 const verifyToken = require("./Middleware/auth");

app.use(express.json());
app.use(cookieParser());
// Allow requests from frontend origin
app.use(cors({
  origin: 'http://localhost:3001', // replace with your React app's URL
  credentials: true               // allow cookies if needed
}));
  
app.use('/auth',auth);
app.use('/TodoNames',verifyToken,Troutes);
db();
app.listen(3000,()=>{
    console.log("Server established at port 3000.");
});


  