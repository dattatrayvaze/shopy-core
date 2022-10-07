const express = require('express');
const { getSellers } = require('../app/controllers/SellerControllers');
const router = express.Router();


// router.get('/products',addProduct)
router.get('/sellers/:pincode',getSellers);

module.exports=router;