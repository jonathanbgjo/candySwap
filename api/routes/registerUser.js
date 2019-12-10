// import User from '../sequelize';
// import bcrypt from 'bcrypt';

var sequelize = require('../sequelize');
var User = sequelize.User;
var bcrypt = require('bcrypt')
const BCRYPT_SALT_ROUNDS = 12;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
module.exports = (app) => {
  app.post('/register', (req,res)=>{
    // console.log("are we in register?")
    //console.log(req);
    const data = {
          user_id: req.body.user_id,
          username : req.body.username,
          email : req.body.email,
          password : req.body.password
    };
    // console.log(data.username + data.email + data.password);
    User.create({ username: data.username, password: data.password, email: data.email})
    .then(() => User.findOrCreate({
        where: {username: data.username,
        email: data.email}
    }))
    .then(([user, created]) => {
      // console.log(user.get({
      //   plain: true
      // }))
      // console.log(created);
    })                                                                                                    ````````````````
    res.json(data.user_id);
  })
}
