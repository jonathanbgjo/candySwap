

var sequelize = require('../sequelize');
var SavedLevel = sequelize.SavedLevel;
module.exports = (app) => {
  app.delete('/level/:level_id/:user_id', (req, res) => {
    SavedLevel.destroy({
      where: { user_id: req.params.user_id, level_id: req.params.level_id}
    })
      .then(deletedLevel => {
        console.log("SUCCESS DELETING SAVEDLEVEL"),
        res.json(deletedLevel);
      });

  });
}
