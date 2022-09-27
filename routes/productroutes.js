const ProdController = require('./app/controllers/ProdController')
const router = require('express').Router()


router.post('/addProduct',ProdController.addProduct)
router.get('/allProducts', ProdController.getAllProducts)
router.get('/getFeaturedProduct', ProdController.getFeaturedProduct)
router.get('/:id', ProdController.getOneProduct)
router.put('/:id', ProdController.updateProduct)
router.delete('/:id', ProdController.deleteProduct)

module.exports = productroutes