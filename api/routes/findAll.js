var sequelize = require('../sequelize');
var User = sequelize.User;
var LevelLeaderboard = sequelize.LevelLeaderboard;
var Level = sequelize.Level;
module.exports = (app) => {
  //find all users
  app.get('/api/users', (req, res, next) => {
    User.findAll().then(users => {
      res.json(users);
    })
    .catch(err => {
      console.log('problem with get all');
      res.status(500).json(err);
    });
  });
  //find top 5 global leaderboard
  app.get('/topFive' , (req,res) => {
    User.findAll({
      limit: 5,
      order: [['totalScore', 'DESC'],]
  }).then(users => res.json(users))
  .catch(err => {res.status(500);console.log(err)})
  })
  //find top 3 leaderboard for specific level
  app.get('/api/levelLeaderboard/:id', (req,res) =>{
    LevelLeaderboard.findAll({
      where: {'level_id' : req.params.id},
      order: [['score', 'DESC']],
      limit: 3,
    })
    .then(content => res.json(content))
    .catch(err => console.log(err));
  })
  //get all levels ( to display on map)
  app.get('/levels', (req,res) =>{
    Level.findAll().then(levels => {
      res.json(levels);
    })
    .catch(err => {
      console.log('problem with get alllevels');
      res.status(500).json(err);
    });
  })


}
