// import User from '../sequelize';
// import bcrypt from 'bcrypt';

var sequelize = require('../sequelize');
var User = sequelize.User;
var bcrypt = require('bcrypt');
const session = require('express-session');

module.exports = (app) => {
  app.post('/login', (req,res)=>{
    //find one user based on email
    if (req.body.email) {
      User.findOne({
        where: {
          email : req.body.email
        }
        // order: [ [ 'createdAt', 'DESC' ]],
      })
      //if user exists then check to see if passwords match. if so store in session and send user back
        .then(user => {
          if (user != null) {
              if(req.body.password === user.password){
                //consider session.save()
                session.user = user;
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
    else {
      return res.status(500).json({
        auth: false,
        message: 'username and token id do not match',

      });
      //res.send(" hi");
    }
  })

  app.get('/logged', (req,res) =>{
    if(session.user){
      res.status(200).json(session.user)
    }else{
      console.log("request.session user doesnt exist")
      res.status(401).json(false);
    }
  })

  app.get('/logout', (req,res) => {
    session.user = null;
    res.status(200).json(true);
  })
}
