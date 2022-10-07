const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database");


const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  productId: {
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
});
// Cart.sync({force:true})

module.exports = Cart;
