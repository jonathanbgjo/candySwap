var User = require('../sequelize');
module.exports = (app) => {
  app.delete('/api/users:id', (req, res, next) => {
    console.log("are we in delete");
    //console.log(req);
    User.delete().then(users => {
      console.log(users)
      res.send(users);
    })
    .catch(err => {
      console.log('problem with delete');
      res.status(500).json(err);
    });
  });
}
