const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require('../../config/database');
const Product = require("./product");
const User = require("./User");




const Cart = sequelize.define("cart", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    products: { 
        type:Sequelize.INTEGER,  
    },
    userId:{
      type:Sequelize.INTEGER,
    }
      
  
    // products:{
    //       defaultValue:[]
    // }   
   
  });
// Cart.sync({force:true})

  
  module.exports = Cart;
  