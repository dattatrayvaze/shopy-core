const ProdController = require('./app/controllers/ProdController')
const router = require('express').Router()


router.post('/Product',ProdController.addProduct)
router.get('/allProducts', ProdController.getAllProducts)
router.get('/FeaturedProduct', ProdController.getFeaturedProduct)
router.get('/product/:id', ProdController.getOneProduct)
router.put('/product/:id', ProdController.updateProduct)
router.delete('product/:id', ProdController.deleteProduct)

module.exports = productroutes
