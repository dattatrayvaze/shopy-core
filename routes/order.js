const express = require('express');
const { addToCart, createOrder, removeFromCart, showCart, placeOrder } = require('../app/controllers/OrderController');
const router = express.Router();


router.get('/order/:id',placeOrder)
router.post('/cart',addToCart)
router.delete('/cart/:id',removeFromCart)
router.delete('/cart/order/:id',placeOrder)
router.get('/cart/:id',showCart)



module.exports=router;
