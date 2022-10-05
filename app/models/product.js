const Sequelize = require("sequelize");
const sequelize = require('../../config/database');
const Category = require("./category");



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
  price:{
    type:Sequelize.INTEGER
  },
  cid:{
    type:Sequelize.INTEGER,
    // references: {
    //   model: 'Category',
    //   key: 'id',
    // },
  }
});
// Product.sync({force:true})


module.exports = Product;
