const Sequelize = require("sequelize");
const sequelize = require('../../config/database');


const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  status:{
    type: Sequelize.STRING,

  },
  userId:{
    type:Sequelize.INTEGER
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports =  Order;
