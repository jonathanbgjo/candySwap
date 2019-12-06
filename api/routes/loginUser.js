// import User from '../sequelize';
// import bcrypt from 'bcrypt';

var sequelize = require('../sequelize');
var User = sequelize.User;
var bcrypt = require('bcrypt');
const session = require('express-session');

module.exports = (app) => {
  app.post('/login', (req,res)=>{
    console.log(req)
    console.log("IN LOGIN ROUTE")
    if (req.body.email) {
      User.findOne({
        where: {
          email : req.body.email
        }
        // order: [ [ 'createdAt', 'DESC' ]],
      })
        .then(user => {
          if (user != null) {
            console.log('user found in db');
            console.log(req.body.password ===user.password);
              if(req.body.password === user.password){
                //req.session.user = user;
                console.log("HEY WE SAVED IN SESSION");
                session.user = user;
                //   session.save()
                //     console.log('saved?!')
                //  }
                console.log(session.user);
                console.log("at the end of login")
                res.status(200).json(session.user);
            }else {
              console.log('user not found in db');
              res
                .status(404)
                .json({ auth: false, message: 'no user with that username' });
            }
          }
       })
        .catch(err => {
          console.log(err);
          console.log('problem communicating with db');
          res.status(500).json(err);
        });
    }
    else {console.log("???")
      return res.status(500).json({
        auth: false,
        message: 'username and token id do not match',

      });
      //res.send(" hi");
    }
  })

  app.get('/logged', (req,res) =>{
    console.log("in logged route")

    if(session.user){
      console.log(session.user);
      res.status(200).json(session.user)
    }else{
      console.log("request.session user doesnt exist")
      res.status(401).json(false);
    }
  })

  app.get('/logout', (req,res) => {
    //console.log(req)
    console.log("in logout route/server.js")

    console.log(session = null)
    res.json(true);
  })
}

// var myVariable = {a:[1,2,3,4], b:"some text"};

// sessionStorage['myvariable'] = JSON.stringify(myVariable);
// var readValue = JSON.parse(sessionStorage['myvariable']);
