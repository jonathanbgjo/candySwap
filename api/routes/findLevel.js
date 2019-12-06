var sequelize = require('../sequelize');
var Level = sequelize.Level;
module.exports = (app) => {
    app.get('/level/:id', (req,res) =>{
      console.log('in get one level route')
      console.log(req.params.id)
      if(req.params.id){
        Level.findOne({
          where:{
            level_id : req.params.id
          }
        }).then(level => {
          if(level != null){
            console.log('found level in DB')
            console.log(level);
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
}
