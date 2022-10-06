const express = require('express');
const { addToCart, createOrder, removeFromCart, showCart } = require('../app/controllers/OrderController');
const router = express.Router();


router.get('/order/:id',createOrder)
router.post('/cart',addToCart)
router.delete('/cart/:id',removeFromCart)
router.get('/cart/:id',showCart)



module.exports=router;
