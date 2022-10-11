const express = require('express');
const { addProduct, getAllProducts,getProductById, getProductByName, updateProduct, deleteProduct, searchProduct, getRandom, upload } = require('../app/controllers/ProductControlllers');
const router = express.Router();


router.post('/product/:id',upload, addProduct)
router.get('/products',getAllProducts)
router.get('/product/:id',getProductById)
router.get('/product/search/:name',getProductByName)
router.put('/product/:id',updateProduct)
router.delete('/product/:id',deleteProduct)
router.get('/products/:name',searchProduct)
router.get('/random-product',getRandom)


module.exports=router;