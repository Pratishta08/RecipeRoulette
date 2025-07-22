const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); 
const Recipe = require('../models/Recipes'); 
const dotenv = require('dotenv');

dotenv.config({path: path.resolve(__dirname, '../.env')})
const dbUri = process.env.MONGO_URI;
if(!dbUri){
    console.error('MONGO_URI not found');
    process.exit(1);
}

mongoose.connect(dbUri)
    .then(()=>console.log('MongoDB connected for data import'))
    .catch(err =>{
        console.error('MongoDB connecion error during import', err);
        process.exit(1);
    });


const axios = require('axios');

async function importFromDummyJSON() {
    try {
        const response = await axios.get('https://dummyjson.com/recipes');
        const recipes = response.data.recipes || [];
        if (!recipes.length) {
            console.log('No recipes found in DummyJSON response.');
            return;
        }
        // Map DummyJSON fields to our schema
        const mappedRecipes = recipes.map(r => ({
            name: r.name || '',
            rating: r.rating ? String(r.rating) : '',
            description: r.instructions ? r.instructions.join(' ') : '',
            prepTime: r.prepTimeMinutes ? `${r.prepTimeMinutes} min` : '',
            cookTime: r.cookTimeMinutes ? `${r.cookTimeMinutes} min` : '',
            totalTime: r.prepTimeMinutes && r.cookTimeMinutes ? `${r.prepTimeMinutes + r.cookTimeMinutes} min` : '',
            servings: r.servings ? String(r.servings) : '',
            ingredients: r.ingredients || [],
            image: r.image || '',
        }));
        const result = await Recipe.insertMany(mappedRecipes, { ordered: false });
        console.log(`Imported ${result.length} recipes from DummyJSON!`);
    } catch (err) {
        if (err.code === 11000) {
            console.warn('Duplicate key error detected (some documents might already exist).');
        } else {
            console.error('Error importing DummyJSON data:', err);
        }
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
}

importFromDummyJSON();        