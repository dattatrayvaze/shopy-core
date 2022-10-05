const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// const model=(sequelize,DataTypes)=>{

    const Seller=sequelize.define('seller',{

        id:{
            type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            
        },
        pincode:{
            type: DataTypes.INTEGER,

        },
        city:{
            type:DataTypes.STRING
        },
        address:{
            type:DataTypes.STRING

        },
        phoneNo:{
            type:DataTypes.INTEGER
        },
        enterpriseName:{
            type:DataTypes.STRING
        }

    })

// Seller.sync({force:true})


module.exports=Seller;
