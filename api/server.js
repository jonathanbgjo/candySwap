// import express from 'express';
// import * as cors from "cors";
// import bodyParser from 'body-parser';
// import logger from 'morgan';
var Sequelize = require('sequelize');
const cors = require('cors')

const express = require('express')
const session = require('express-session');
const app = express()

// var router = express.Router();
// router.use(cors(options));

//var session = require("express-session")

const bodyParser = require('body-parser')



app.use(session({secret: 'ssshhhhh'}));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

// Another thing you'll need to think of, is CORS (Cross Origin Resource Sharing).
//Since your backend and frontend will live at different domains / different ports, you'll need to enable CORS in the backend.
//This can easily be achieved with Express like this:

// const cors = require('cors');
//       const app = express();
// app.use(cors({origin: [
//   "http://localhost:4736"
// ], credentials: true}));

//sequelize syntax
require('./routes/registerUser')(app);
require('./routes/findUser')(app);
require('./routes/findAll')(app);
require('./routes/loginUser')(app);
require('./routes/updateUser')(app);

// require('./routes/deleteUser')(app);
// require('./routes/updateUser')(app);


app.listen(8000, () => {
  console.log('Server started!')
});


module.exports = app;
