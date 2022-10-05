const express = require('express');
const { isAdmin, isAuthenticated, isSignedIn } = require('../app/controllers/AuthController');
const { getAllCategories,  getOneCategory, addCategory, updateCategory, deleteCategory, addCategoryPage, getRandom, searchCategory } = require('../app/controllers/CategoryController');
const User = require('../app/models/User');
const router = express.Router();



router.get('/categories',getAllCategories);
router.get('/category/:id',getOneCategory);
router.get('/addCategory',addCategoryPage);
router.post('/addCategory',addCategory);
router.put('/updateCategory/:id',updateCategory);
router.delete('/category/:id',deleteCategory)

router.get('/random-category',getRandom)
router.get('/search/:name',searchCategory)

module.exports=router;

