const Sequelize = require("sequelize");
const sequelize = require('../../config/database');

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image:{
    type:Sequelize.BLOB,
    
    
  },
  description:{
    type:Sequelize.STRING
  },
  cid:{
    type:Sequelize.INTEGER
  }
});

module.exports = Product;
