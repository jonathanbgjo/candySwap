// app.route('/api/users').get((req, res) => {
//   console.log("found all users");
//   connection.query('SELECT * FROM users', (err,rows) => {
//     if(err){ console.log("ERROR IN GET ALL USERS")}
//     res.status(201).send(rows)
//     console.log(rows);
//   });
// })

var sequelize = require('../sequelize');
var User = sequelize.User;
module.exports = (app) => {
    app.get('/user/:id', (req, res, next) => {
      console.log(req.params);
      if (req.params.id) {
        User.findOne({
          where: {
            user_id : req.params.id
          }
          // order: [ [ 'createdAt', 'DESC' ]],
      })
          .then(user => {
            console.log(user);
            if (user != null) {
              console.log('user found in db');
              res.status(200).json(user);
            } else {
              console.log('user not found in db');
              res
                .status(404)
                .json({ auth: false, message: 'no user with that username' });
            }
          })
          .catch(err => {
            console.log(User);
            console.log('problem communicating with db');
            res.status(500).json(err);
          });
      } else {
        return res.status(500).json({
          auth: false,
          message: 'username and token id do not match',
        });
      }
    });

  // app.get('http://localhost:8000/api/users', (req,res) => {
  //   User.findAll().then(function(users){
  //     console.log(users);
  //     res.send({error:false,message:'users list',data:users});
  //   }).catch(function(err){
  //     console.log('Oops! something went wrong, : ', err);
  //   });
  // })
}
