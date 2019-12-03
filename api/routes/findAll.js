var User = require('../sequelize');

module.exports = (app) => {
  app.get('/api/users', (req, res, next) => {
    console.log("are we in get all");
    //console.log(req);
    User.findAll().then(users => {
      console.log("in find all")
      console.log(users)

      res.json(users);
    })
    .catch(err => {
      console.log('problem with get all');
      res.status(500).json(err);
    });
  });

}
