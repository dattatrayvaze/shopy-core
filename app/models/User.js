const bcrypt = require("bcryptjs");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const { UUID } = require("sequelize");



const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   password: {
      type: DataTypes.STRING,
      allowNull: false,

    
    },
	salt: {
		type:DataTypes.STRING,
	},

    role: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

// User.sync({force:true})

User.autheticate = function (plainpassword) {
  return this.securePassword(plainpassword) === this.password;
},
  User.securePassword = function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", "secret")
        .update(password)
        .digest("hex");
    } catch (err) {
      console.log(err);
      return "";
    }
  };

module.exports = User;
