var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var dbConn = require('../../config/db.js');

// view recipe category
router.get('/viewCategory', (req, res) => {
  try {
    const authToken = req.cookies.authToken;

    if (!authToken) {
      console.log('JWT token not found in the cookie');
      return res.status(401).json({ success: false, message: "Error, JWT token not found in the cookie" });
      }
  
    console.log('Verifying JWT token');
    jwt.verify(authToken, 'secrethotdog', (err, decodedToken) => {
      if (err) {
        console.log('Error verifying JWT token', err);
        return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
        }
        
      console.log('JWT token verified successfully');
      const decodedEmail = decodedToken.Info.email;
  
      const selectCategoriesQuery = 'SELECT * FROM category';
      dbConn.query(selectCategoriesQuery, decodedEmail, (error, results) => {
        if (error) {
          console.log('Error executing SQL query', error);
          return res.status(500).json({ success: false, message: "Error executing SQL query" });
          }
        console.log('SQL query executed successfully', results);
        res.status(200).json(results);
        });
    });
  } catch (error) {
    console.log('Error handling request', error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
  });

// search recipe
router.get('/searchRecipe', (req, res) => {
  const searchTerm = req.query.rec_name;

  if (!searchTerm) {
    return res.status(400).json({ error: 'No search term provided' });
  }

  const selectRecipesQuery = 'SELECT rec_name FROM recipes WHERE rec_name LIKE ?';
  const searchParam = `%${searchTerm}%`;

  dbConn.query(selectRecipesQuery, [searchParam], (err, results) => {
    if (err) {
      console.error('Error selecting recipes:', err);
      res.status(500).send('Error selecting recipes');
      return;
    }
    res.status(200).json(results);
  });
});

// view recipe details
router.get('/recipeDetails/:name', (req, res) => {
  const recipeName = req.params.rec_name;
  
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
    LEFT JOIN 
      ingredients i ON r.recipe_id = i.recipe_id
    LEFT JOIN 
      procedure_steps s ON r.recipe_id = s.recipe_id
    WHERE 
      r.rec_name = ?
    ORDER BY 
      s.step_num;
  `;

  dbConn.query(viewRecipeQuery, [recipeName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Group results by recipe
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



// Add feedback for a recipe
router.post('/:recipe_id/feedback', async (req, res) => {
  try {
      const { recipe_id } = req.params;
      const { comment, rating } = req.body;

      // Retrieve JWT token from the request headers
      const authToken = req.cookies.authToken;
      if (!authToken) {
          return res.status(401).json({ error: 'Unauthorized: Missing token' });
      }

      console.log('Verifying JWT token');
      jwt.verify(authToken, 'secrethotdog', (err, decodedToken) => {
          if (err) {
              console.log('Error verifying JWT token', err);
              return res.status(401).json({ success: false, message: "Error, invalid JWT token" });
          }

          console.log('JWT token verified successfully');
          const user_id = decodedToken.Info.user_id;

          // Insert feedback into the database
          const insertFeedbackQuery = 'INSERT INTO feedback (recipe_id, user_id, comment, rating) VALUES (?, ?, ?, ?)';
          dbConn.query(insertFeedbackQuery, [recipe_id, user_id, comment, rating], (error, results) => {
              if (error) {
                  console.error('Error inserting feedback:', error);
                  return res.status(500).json({ error: 'Internal Server Error' });
              }
              console.log('Feedback inserted successfully');
              return res.status(200).json({ success: true, message: 'Feedback submitted successfully' });
          });
      });
  } catch (error) {
      console.error('Error handling request:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
