var sequelize = require('../sequelize');
var User = sequelize.User;
module.exports = (app) => {
  app.delete('/user/:id', (req, res) => {
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
