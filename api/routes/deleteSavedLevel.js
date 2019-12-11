

var sequelize = require('../sequelize');
var SavedLevel = sequelize.SavedLevel;
module.exports = (app) => {
  // app.delete('/api/users:id', (req, res, next) => {
  //   console.log("are we in delete");
  //   //console.log(req);
  //   User.delete().then(users => {
  //     console.log(users)
  //     res.send(users);
  //   })
  //   .catch(err => {
  //     console.log('problem with delete');
  //     res.status(500).json(err);
  //   });
  // });

  app.delete('/level/:level_id/:user_id', (req, res) => {
    // console.log("in delete route/server.js")
    SavedLevel.destroy({
      where: { user_id: req.params.user_id, level_id: req.params.level_id}
    })
      .then(deletedLevel => {
        console.log("SUCCESS DELETING SAVEDLEVEL"),
        res.json(deletedLevel);
      });

  });
}
