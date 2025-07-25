const express = require('express');
const router = express.Router();
// const authController = require('../controllers/AddRecipeController');
const { addRecipe } = require('../controllers/addRecipeController');
// const AddRecipe = require('../models/AddRecipe');


router.post('/', addRecipe);


module.exports = router; 