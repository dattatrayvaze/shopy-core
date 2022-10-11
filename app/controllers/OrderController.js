const Cart = require("../models/cart");
const { Op } = require("sequelize");
const Product = require("../models/product");
const User = require("../models/User");

exports.addToCart = (req, res) => {
  let id= req.params.userId;
  let productId=req.params.productId
  
  let info = {
    productId:productId,
    userId: id,
    productPrice:req.body.productPrice
  };
  const cart = Cart.create(info)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

exports.removeFromCart = (req, res) => {
  let productId = req.params.productId;
  let cart = Cart.destroy({
    where: { productId: productId },
  })
    .then((cart) => {
      res.status(200).json("cart deleted");
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

exports.placeOrder = (req, res) => {
  let userId = req.params.id;

  let user = User.findOne({
    where: { id: userId },
  }).then((user,err) => {
    let total =0;
  
    if(user==null){
      return res.json("user doesn't exist")
    }

  Cart.findAll({
    where:{userId:userId},
    
  }).then((cart)=>{
     cart.forEach(element => {
      total=total+element.productPrice
      
    })
      
    const t=total
    user.createOrder({ total: t,status:"order placed"}).then((user) => {
      let cart = Cart.destroy({
        where: { userId: userId },
      })
        .then((cart) => {
          res.status(200).json("cart deleted and order placed");
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    });
  })

  });
};

exports.showCart = (req, res) => {
  let userId = req.params.id;
  let total=0;
  let cart = Cart.findAll({
    where: { userId: userId },
    attributes: ["id","productPrice", "userId"],
  })
    .then((cart) => {
      cart.forEach(element => {
        total=total+element.productPrice   
      })
      res.status(200).json({
        cart,total
      });
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

exports.createOrder = (req, res) => {
  let id = req.params.id;

  let user = User.findOne({
    where: { id: id },
  }).then((user) => {
    user.createOrder({ total: 45, cartId: 4 });
    res.json(user);
  });
};

exports.getUserById = (req, res) => {
  let id = req.params.id;

  let user = User.findOne({
    where: { id: id },
  }).then((user) => {
    user.createOrder({ total: 45, cartId: 4 });
    res.json(user);
  });
};



exports.getTotal=(req,res)=>{
  let id=req.params.id;
  let total =0;
  Cart.findAll({
    where:{userId:id,},
    
  }).then((cart)=>{
     cart.forEach(element => {
      total=total+element.productPrice
      
    })
    console.log(total)
    res.json(total)   
  })

}