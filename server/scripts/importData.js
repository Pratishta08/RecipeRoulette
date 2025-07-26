const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); 
const Recipe = require('../models/Recipes'); 
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config({path: path.resolve(__dirname, '../.env')})
const dbUri = process.env.MONGO_URI;
if(!dbUri){
    console.error('MONGO_URI not found');
    process.exit(1);
}

mongoose.connect(dbUri)
    .then(()=>console.log('MongoDB connected for data import'))
    .catch(err =>{
        console.error('MongoDB connection error during import', err);
        process.exit(1);
    });


async function importFromDummyJSON() {
    try {
        const response = await axios.get('https://dummyjson.com/recipes');
        const dummyRecipes = response.data.recipes || [];
        if (!dummyRecipes.length) {
            console.log('No recipes found in DummyJSON response.');
            return;
        }
        
        const mappedRecipes = dummyRecipes.map(r => ({
            recipeName: r.name || '',
            rating: r.rating ? String(r.rating) : 'N/A',
            instructions: r.instructions ? r.instructions.join(' ') : '',
            prepTimeMinutes: r.prepTimeMinutes || 0,
            cookTimeMinutes: r.cookTimeMinutes || 0,
            servings: r.servings ? String(r.servings) : 'N/A',
            ingredients: r.ingredients || [],
            imageUrl: r.image || '',
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