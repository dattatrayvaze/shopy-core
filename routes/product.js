const express = require('express');
const { addProduct, getAllProducts } = require('../app/controllers/ProductControlllers');
const router = express.Router();


// router.get('/products',addProduct)
router.post('/products',addProduct)
router.get('/allProducts',getAllProducts)
module.exports=router;