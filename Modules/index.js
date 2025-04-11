const express = require('express');
const router = require('./router/index');
const cors = require('cors');
const passport = require('passport');
require("dotenv").config();
require("./passport");



const app = express(); //create app using express
const port = 3000;   //ininlize port 3000

require('./db');

// middleware
app.use(cors());
app.use(express.json());  //middleware for json data
app.use(express.urlencoded({ extended: true }));  //middleware for form data
app.use(passport.initialize());

//login signup middleware
app.use('/api', router);

//login with google middleware
const googleAuthRouter = require('./router/googleAuth');
app.use('/auth', googleAuthRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); //server listen on port 3000.