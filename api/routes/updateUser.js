var sequelize = require('../sequelize');
var User = sequelize.User;

module.exports = (app) => {
  app.put('/user/:id', (req, res, next) => {
    User.update({username: req.body.username, email: req.body.email, password:req.body.password, totalScore: req.body.totalScore}, {where: {user_id: req.params.id}})
    .then(function(rowsUpdated) {
        res.json(rowsUpdated)
      })
      .catch(next)
      })


  app.put('/user/score/:id', (req, res, next) => {
    let total;
    User.findOne({
      where: {
        user_id : req.params.id
      }
      // order: [ [ 'createdAt', 'DESC' ]],
    })
    .then(user => {
      total = user.totalScore + req.body.score;
      User.update({'totalScore': total}, {where: {'user_id': req.params.id}})
      .then(function(rowsUpdated) {
        res.json(rowsUpdated)
      })
      .catch(next)})
    })


}
