// import User from '../sequelize';
// import bcrypt from 'bcrypt';

var User = require('../sequelize');
var bcrypt = require('bcrypt')
const BCRYPT_SALT_ROUNDS = 12;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
module.exports = (app) => {
  app.post('/register', (req,res)=>{
    console.log("are we in register?")
    console.log(req);
    const data = {
          user_id: req.body.user_id,
          username : req.body.username,
          email : req.body.email,
          password : req.body.password,
          confirmPassword : req.body.confirmPassword
    };
    console.log(data.username + data.email + data.password + data.confirmPassword);
    User.create({ username: data.username, password: data.password, email: data.email, confirmPassword: data.confirmPassword })
    .then(() => User.findOrCreate({
        where: {username: data.username,
        email: data.email}
    }))
    .then(([user, created]) => {
      console.log(user.get({
        plain: true
      }))
      console.log(created);
    })
    res.send(data.user_id);
  })
}
  // app.post('http://localhost:8000/register', (req,res) => {
  //   console.log("IN REGISTERUSER.JS ROUTE")
  //   const data = {
  //     username : req.username,
  //     email : req.email,
  //     password : req.password,
  //     confirmPassword : req.confirmPassword
  //   };
  //   if(data.password == '' || data.username == ''){
  //     res.json('username or password must bef illed in');
  //   }
  //   User.findOne({
  //     where:{
  //       user: data.username
  //     }
  //   })
  //     .then(user => {
  //       if(user != null){
  //         console.log("name already taken");
  //         res.json('username already taken');
  //       }
  //       else{
  //         bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS)
  //           .then(function(hashedPassword){
  //             console.log(hashedPassword);
  //             User.create({
  //               username : data.username,
  //               email : data.email,
  //               password : data.password,
  //               confirmedPassword : data.confirmedPassword
  //             })
  //           })
  //           .then(() => {
  //             console.log('user created');
  //             res.json('user created');
  //           })
  //       }
  //     })
  //     .catch(err => {
  //       console.log('problem connecting w/ db');
  //       res.status(500).json(err);
  //     })
  // })
