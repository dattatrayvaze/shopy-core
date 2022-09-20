const Product = require("../models/product");


exports.addProduct=async (req,res)=>{

    let info={
        name:req.body.name,
        description:req.body.description
    }
    const product=await Product.create(info).then(prod=>{
        res.json({prod:"product added"})
    })
    res.status(200).json({
        all:"products"
    })
}

exports.getAllProducts=(req,res)=>{
    let products=Product.findAll({
      attributes:[  "name",
        "description"
    ]
    }).then(products=>{
        res.status(200).json({
            products
        })
    })
    
}