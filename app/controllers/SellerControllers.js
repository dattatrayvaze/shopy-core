const Seller = require("../models/seller");


exports.getSellers=(req,res)=>{
    let pincode=req.params.pincode
    let sellers=Seller.findAll({
        where:{pincode:pincode},
        attributes:[  "name","id"      
      ]
      }).then(sellers=>{
          res.status(200).json({
              sellers
          })
      })
}
