const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();
const recipeRoutes = require ('./routes/recipe');
const addRecipeRoutes = require ('./routes/addRecipe');
// const {filterByIngredient }= require('./controllers/recipeController')

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Disable caching for all responses
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

// Routes
const authRoutes = require('./routes/auth');
const {addRecipe} = require('./routes/addRecipe');

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/addRecipe', addRecipeRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Recipe Roulette API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
