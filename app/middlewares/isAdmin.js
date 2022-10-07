const User = require("../models/User");


module.exports = (req, res, next) => {
    let id =req.params.id
    User.findOne({
        where:{id:id}
    }).then((user)=>{
        // if(user.name==="Manalii"){
        if(user.role===1){
            // res.json("you are admin")
            next();
        }else{
            res.json("you are not admin")
        }
    })
    
    next();
}