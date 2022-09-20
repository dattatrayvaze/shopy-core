const csurf = require('csurf');
const express = require('express');
const { test, testPost } = require('../app/controllers/TestControllers');
const router = express.Router();


router.get('/test',test);
router.post('/test',testPost);

module.exports=router;
