const express = require('express');
const { addToCart, createOrder, removeFromCart, showCart, placeOrder, getTotal } = require('../app/controllers/OrderController');
const router = express.Router();


router.get('/order/:id',placeOrder)

router.post('/cart/:userId/:productId',addToCart)

router.delete('/cart/:userId/:productId',removeFromCart)

router.delete('/cart/order/:id',placeOrder)

router.get('/cart/:id',showCart)

router.get('/cart-total/:id',getTotal)


module.exports=router;
