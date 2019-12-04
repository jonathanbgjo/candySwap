var User = require('../sequelize');

module.exports = (app) => {
  console.log("update user route")
  app.put('/user/:id', (req, res, next) => {
    console.log("update user route app.put");
    //console.log(req);
    // console.log(req.params)
    // console.log(req.body)
    console.log(req.body.username)
    console.log(req.params.id)
    User.update({username: req.body.username, email: req.body.email, password:req.body.password}, {where: {user_id: req.params.id}})
    .then(function(rowsUpdated) {
      console.log(rowsUpdated)
        res.json(rowsUpdated)
      })
      .catch(next)
      })
    // try {
    //   const result = await User.update(
    //     { username: req.body.username},
    //     { where: { user_id: req.body.user_id } }
    //   )
    //   handleResult(result)
    // } catch (err) {
    //   handleError(err)
    // }

}

// try {
//   const result = await Project.update(
//     { title: 'a very different title now' },
//     { where: { _id: 1 } }
//   )
//   handleResult(result)
// } catch (err) {
//   handleError(err)
// }
// router.put(‘/book/:bookId’, function (req, res, next) {
//   Book.update(
//     {title: req.body.title},
//     {where: req.params.bookId}
//   )
//   .then(function(rowsUpdated) {
//     res.json(rowsUpdated)
//   })
//   .catch(next)
//  })

// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
// WHERE CustomerID = 1;
