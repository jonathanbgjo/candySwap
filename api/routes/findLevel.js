var sequelize = require('../sequelize');
var Level = sequelize.Level;
var SavedLevel = sequelize.SavedLevel;

module.exports = (app) => {
    app.get('/level/:id', (req,res) =>{
      if(req.params.id){
        Level.findOne({
          where:{
            level_id : req.params.id
          }
        }).then(level => {
          if(level != null){
            res.status(200).json(level);
          }
          else{
            res.status(404).json('level not in db')
          }
        }).catch((err) => {console.log("error in findOneLevel route",err)})
      }else{
        return res.status(500).json({
          auth:false,
          message: 'no req.params.id in findonelevel route'
        })
      }
    })


    app.get('/level/:level_id/:user_id', (req,res) =>{
      if(req.params.level_id && req.params.user_id){
        SavedLevel.findOne({
          where:{
            level_id : req.params.level_id,
            user_id: req.params.user_id
          }
        }).then(savedLevel => {
          if(savedLevel != null){
            res.status(200).json(savedLevel);
          }
          else{
            res.status(404).json('level not in db')
          }
        }).catch((err) => {
          console.log("no saved game. finding default level")
          res.json(false)
        })
      }else{
        return res.status(500).json({
          auth:false,
          message: 'no req.params.id in findonelevel route'
        })
      }
    })
}
