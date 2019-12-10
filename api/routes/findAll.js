var sequelize = require('../sequelize');
var User = sequelize.User;
var LevelLeaderboard = sequelize.LevelLeaderboard;
var Level = sequelize.Level;
module.exports = (app) => {
  app.get('/api/users', (req, res, next) => {
    // console.log("are we in get all");
    //console.log(req);
    User.findAll().then(users => {
      // console.log("in find all")
      res.json(users);
    })
    .catch(err => {
      console.log('problem with get all');
      res.status(500).json(err);
    });
  });

  app.get('/topFive' , (req,res) => {
    // console.log('in topFive route')
    User.findAll({
      limit: 5,
      order: [['totalScore', 'DESC'],]
  }).then(users => res.json(users))
  .catch(err => {res.status(500);console.log(err)})
  })

//   db.Outlet.findAll({
//     include: [{
//         model:db.Product,
//         attributes: ['id', 'name', 'nameKh'],
//         through: { where: { amount: 10 } }
//     }]
// })
  app.get('/api/levelLeaderboard/:id', (req,res) =>{
    // User.create(req.param.id)
    // Level.hasUsers()
    // .then( users => {res.json(users)})
    // LevelLeaderboard.findAll({})
    // .then(content => res.json(content));

    LevelLeaderboard.findAll({
      where: {'level_id' : req.params.id},
      order: [['score', 'DESC']],
    })
    .then(content => res.json(content))
    .catch(err => console.log(err));
  })


}
