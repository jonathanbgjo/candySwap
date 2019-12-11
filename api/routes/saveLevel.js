var sequelize = require('../sequelize');
var SavedLevel = sequelize.SavedLevel;
var Level = sequelize.Level;
var User = sequelize.User;

module.exports = (app) => {
  app.post('/saveLevel/:id', (req, res, next) => {
    console.log("save Level route");
    console.log(req)
  //   LevelLeaderboard.findOne({
  //     where: {level_id: req.params.id, user_id: req.body.user.user_id}
  //   }).then(content => {
  //   if(content.score > req.body.score){

  //   }else{
  //     LevelLeaderboard.upsert({score: req.body.score, createdAt:new Date(), updatedAt:new Date(),user_id: req.body.user.user_id, level_id: req.params.id
  //       , where: {level_id: req.params.id, user_id:req.body.user.user_id, score: ['score' < req.body.score]}})
  //       //result will return false if it updated, or true if created
  //       .then(result => console.log("result"+result))
  //       .catch(err => console.log(err))
  //   }})
  //   .catch(err => {LevelLeaderboard.create({score: req.body.score, createdAt:new Date(), updatedAt:new Date(),user_id: req.body.user.user_id, level_id: req.params.id,
  //     where: {level_id : req.params.id, user_id: req.body.user.user_id}})
  //       .then(result => console.log("result"+result))
  //       .catch(err => console.log(err))})

  })
}
