// Import necessary modules
const express = require('express');
const router = express.Router();
const dbConn = require('../../config/db.js');

// View recipe details using recipe name as a query parameter
router.get('/recipeDetails', (req, res) => {
    const searchTerm = req.query.rec_name;

    // Check if search term parameter is provided
    if (!searchTerm) {
        return res.status(400).json({ error: 'No search term provided' });
    }
    
    const viewRecipeQuery = `
        SELECT 
            r.recipe_id,
            r.rec_name AS rec_name,
            r.rec_desc,
            r.preptime,
            r.cooktime,
            r.servings,
            i.ingr_name,
            i.calories,
            i.protein,
            i.fat,
            i.carbohydrates,
            s.step_num,
            s.step_desc
        FROM 
            recipes r
        INNER JOIN 
            ingredients i ON r.recipe_id = i.recipe_id
        INNER JOIN 
            procedure_steps s ON r.recipe_id = s.recipe_id
        WHERE 
            r.rec_name LIKE ?
        ORDER BY 
            s.step_num;
    `;

    const searchParam = `%${searchTerm}%`;

    dbConn.query(viewRecipeQuery, [searchParam], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Process results...
        const groupedResults = results.reduce((acc, row) => {
            if (!acc[row.recipe_id]) {
                acc[row.recipe_id] = {
                    recipe_id: row.recipe_id,
                    rec_name: row.rec_name,
                    rec_desc: row.rec_desc,
                    preptime: row.preptime,
                    cooktime: row.cooktime,
                    servings: row.servings,
                    ingredients: [],
                    steps: []
                };
            }
            
            if (row.ingr_name) {
                acc[row.recipe_id].ingredients.push({
                    ingr_name: row.ingr_name,
                    calories: row.calories,
                    protein: row.protein,
                    fat: row.fat,
                    carbohydrates: row.carbohydrates
                });
            }
            
            if (row.step_num && row.step_desc) {
                acc[row.recipe_id].steps.push({
                    step_num: row.step_num,
                    step_desc: row.step_desc
                });
            }
            
            return acc;
        }, {});

        res.json(Object.values(groupedResults));
    });
});

module.exports = router;
