const Cart = require("../models/cart");
const { Op } = require("sequelize");
const Product = require("../models/product");
const User = require("../models/User");

exports.addToCart=(req,res)=>{
  let info = {
    products: req.body.products,
    userId:req.body.userId
  }
  const cart=Cart.create(info).then((product)=>{
    res.json(product)
  }).catch((err) => {
    res.json(err.message);
  });
}

exports.removeFromCart=(req,res)=>{
  let userId =req.body.userId;
  let cart=Cart.destroy({
    where: { userId: userId },
  }).then((cart)=>{
    res.status(200).json("cart deleted");
  })
  .catch((err) => {
    res.status(400).json(err.message);
  });
}

exports.showCart=(req,res)=>{
  let userId=req.params.id;
  let cart=Cart.findAll({
    where:{userId:userId},
    attributes:["id","products","userId"]
  }).then((cart) => {
    res.status(200).json({
     cart,
    });
  }).catch((err) => {
    res.status(400).json(err.message);
  });
}

exports.createOrder=(req,res)=>{
  let id =req.params.id;
  
    let user=User.findOne({
      where:{id:id}
    }).then(user=>{
      user.createOrder({total:45,cartId:4})

      // let userId =req.body.userId;
  // let cart=Cart.destroy({
  //   where: { userId: id },
  // }).then((cart)=>{
  //   res.status(200).json("cart deleted");
  // })
  // .catch((err) => {
  //   res.status(400).json(err.message);
  // });

      res.json(user)
    })
}


exports.getUserById=(req,res)=>{
    let id =req.params.id;
  
    let user=User.findOne({
      where:{id:id}
    }).then(user=>{
      user.createOrder({total:45,cartId:4})
      res.json(user)
    })
  
    
  }
