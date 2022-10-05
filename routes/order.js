const express = require('express');
const { addToCart, createOrder, removeFromCart, showCart } = require('../app/controllers/OrderController');
const router = express.Router();


router.get('/create-order/:id',createOrder)
router.post('/add-to-cart',addToCart)
router.delete('/remove-from-cart/:id',removeFromCart)
router.get('/show-cart/:id',showCart)



module.exports=router;
