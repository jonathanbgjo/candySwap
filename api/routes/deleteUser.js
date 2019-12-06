var sequelize = require('../sequelize');
var User = sequelize.User;
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

  app.delete('/user/:id', (req, res) => {
    console.log("in delete route/server.js")
    const id = req.params.id;
    User.destroy({
      where: { user_id: id }
    })
      .then(deletedUser => {
        console.log("SUCCESS DELETING USER"),
        res.json(deletedUser);
      });
  });
}
