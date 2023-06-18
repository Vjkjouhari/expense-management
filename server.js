const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');

dotenv.config();
connectDb();
const app = express()


// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// user Routes
app.use("/api/v1/users", require("./routes/userRoute"));
// transection Route
app.use("/api/v1/transections", require("./routes/transectionRoute"));


const PORT = 8080 || process.env.PORT

// listen
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})