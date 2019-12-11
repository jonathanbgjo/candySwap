var sequelize = require('../sequelize');
var SavedLevel = sequelize.SavedLevel;

module.exports = (app) => {
  app.post('/saveLevel/:id', (req, res, next) => {
    console.log("save Level route");
    console.log(req)
    SavedLevel.findOne({
      where: {level_id: req.params.id, user_id: req.body.user.user_id}
    }).then(content => {
      SavedLevel.upsert({score: req.body.score, createdAt:new Date(), updatedAt:new Date(),
      user_id: req.body.user.user_id, level_id: req.params.id, turns: req.body.turns,
      grid: req.body.savedGrid, scoreToBeat: req.body.scoreToBeat, dimensions: req.body.dimensions
      , where: {level_id: req.params.id, user_id:req.body.user.user_id, }})
      //result will return false if it updated, or true if created
      .then(result => console.log("result"+result))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  })
}
