var sequelize = require('../sequelize');
var User = sequelize.User;
module.exports = (app) => {
  app.get('/api/users', (req, res, next) => {
    console.log("are we in get all");
    //console.log(req);
    User.findAll().then(users => {
      console.log("in find all")
      res.json(users);
    })
    .catch(err => {
      console.log('problem with get all');
      res.status(500).json(err);
    });
  });

  app.get('/topFive' , (req,res) => {
    console.log('in topFive route')
    User.findAll({
      limit: 5,
      order: [['totalScore', 'DESC'],]
  }).then(users => res.json(users))
  .catch(err => {res.status(500);console.log(err)})
  })
}
