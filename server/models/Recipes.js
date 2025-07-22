 const mongoose = require ('mongoose');

 const recipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    rating:{type: String},
    description:{type: String, required:true},
    prepTime:{type: String},
    cookTime:{type: String},
    totalTime:{type: String},
    servings:{type: String},
    ingredients:[{type: String}],
    imageUrl:{type:String}
    },{timestamps:true})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports= Recipe;
