// import User from '../sequelize';
// import bcrypt from 'bcrypt';

var sequelize = require('../sequelize');
var Level = sequelize.Level;


module.exports = (app) => {
  app.post('/level', (req,res)=>{
    //store data into data object
    const data = {
          dimensions: req.body.dimensions,
          grid : req.body.grid,
          numTurns : req.body.numTurns,
          scoreToBeat : req.body.scoreToBeat
    };
    //create new level and send id back
    Level.create({turns: data.numTurns, dimensions: data.dimensions, scoreToBeat: data.scoreToBeat, grid:data.grid, createdAt: new Date(), updatedAt: new Date()})
    .then((level) => res.json(level.level_id))
    .catch(([level, created]) => {
      // console.log(user.get({
      //   plain: true
      // }))
      console.log(created);
    })
  })
}
