const express = require('express');
const menuItems = require('./data/menuData');

const app = express();
const PORT = 3000;

app.use(express.static('public'));


app.use(express.json());

app.get('/menu', (req, res) => {
    try {
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/menu/vegetarian', (req, res) => {
    try {
        const vegetarianItems = menuItems.filter(item => item.isVegetarian === true);
        res.json(vegetarianItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/menu/categories', (req, res) => {
    try {
        const categoryCount = {};
        
    
        menuItems.forEach(item => {
            if (categoryCount[item.category]) {
                categoryCount[item.category]++;
            } else {
                categoryCount[item.category] = 1;
            }
        });
        
    
        const categories = Object.keys(categoryCount).map(categoryName => ({
            name: categoryName,
            itemCount: categoryCount[categoryName]
        }));
        
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API Endpoints:`);
    console.log(`   GET /menu - All menu items`);
    console.log(`   GET /menu/vegetarian - Vegetarian items only`);
    console.log(`   GET /menu/categories - Categories with counts`);
});