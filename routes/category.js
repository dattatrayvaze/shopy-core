const express = require('express');
const { getAllCategories,  getOneCategory, addCategory, updateCategory, deleteCategory, addCategoryPage } = require('../app/controllers/CategoryController');
const { addProduct } = require('../app/controllers/ProductControlllers');
const router = express.Router();

router.get('/categories',getAllCategories);
router.get('/category/:id',getOneCategory);
router.get('/addCategory',addCategoryPage);
router.post('/addCategory',addCategory);
router.put('/updateCategory/:id',updateCategory);


router.delete('/category/:id',deleteCategory)

module.exports=router;

