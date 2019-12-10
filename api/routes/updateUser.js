var sequelize = require('../sequelize');
var User = sequelize.User;

module.exports = (app) => {
  // console.log("update user route")
  app.put('/user/:id', (req, res, next) => {
    // console.log("update user route app.put");
    //console.log(req);
    // console.log(req.params)
    // console.log(req.body)
    // console.log(req.body.username)
    // console.log(req.params.id)
    User.update({username: req.body.username, email: req.body.email, password:req.body.password, totalScore: req.body.totalScore}, {where: {user_id: req.params.id}})
    .then(function(rowsUpdated) {
      // console.log(rowsUpdated)
        res.json(rowsUpdated)
      })
      .catch(next)
      })


  app.put('/user/score/:id', (req, res, next) => {
    // console.log("update user SCORE route app.put");
    //console.log(req);
    // console.log(req.params)
    // console.log(req.body)
    let total;
    User.findOne({
      where: {
        user_id : req.params.id
      }
      // order: [ [ 'createdAt', 'DESC' ]],
    })
    .then(user => {
      total = user.totalScore + req.body.score;
      // console.log(total);
      // console.log("user id" + user.user_id)
      User.update({'totalScore': total}, {where: {'user_id': req.params.id}})
      .then(function(rowsUpdated) {
        // console.log(rowsUpdated)
        res.json(true)
      })
      .catch(next)})
    })


}
