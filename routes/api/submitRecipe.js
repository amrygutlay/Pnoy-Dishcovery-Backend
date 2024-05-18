var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var dbConn = require('../../config/db.js');

// view categories
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
              console.log('Error fetching request:', error);
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

// add category
router.post('/addCategory', (req, res) => {
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

    const { categ_name } = req.body;
    const insertCategoryQuery = 'INSERT INTO category (categ_name) VALUES (?)';
    dbConn.query(insertCategoryQuery, decodedEmail, [categ_name], (error, results) => {
          if (error) {
              console.log('Error adding category:', error);
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

// submit recipe
router.post('/addRecipe', (req, res) => {
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

      const { categ_name, rec_name, rec_desc, preptime, cooktime, servings } = req.body;

      // First, get the categ_id based on categ_name
      const selectCategIdQuery = 'SELECT categ_id FROM category WHERE categ_name = ?';
      dbConn.query(selectCategIdQuery, [categ_name], (error, results) => {
        if (error) {
          console.log('Error fetching category ID:', error);
          return res.status(500).json({ success: false, message: "Error executing SQL query" });
        }

        if (results.length === 0) {
          return res.status(404).json({ success: false, message: "Category not found" });
        }

        const categ_id = results[0].categ_id;

        // Now, insert the recipe with the fetched categ_id
        const insertRecipeQuery = 'INSERT INTO recipes (categ_id, rec_name, rec_desc, preptime, cooktime, servings) VALUES (?, ?, ?, ?, ?, ?)';
        dbConn.query(insertRecipeQuery, [categ_id, rec_name, rec_desc, preptime, cooktime, servings], (error, results) => {
          if (error) {
            console.log('Error submitting recipe:', error);
            return res.status(500).json({ success: false, message: "Error executing SQL query" });
          }
          console.log('SQL query executed successfully', results);
          res.status(200).json({ success: true, message: "Recipe added successfully" });
        });
      });
    });
  } catch (error) {
    console.log('Error handling request', error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


// add submitted recipe's ingredients
router.post('/addIngredients', (req, res) => {
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

      const { rec_name, ingr_name, calories, protein, fat, carbohydrates } = req.body;

      // Fetch recipe_id based on rec_name
      const selectRecipeIdQuery = 'SELECT recipe_id FROM recipes WHERE rec_name = ?';
      dbConn.query(selectRecipeIdQuery, [rec_name], (error, results) => {
        if (error) {
          console.log('Error fetching recipe_id:', error);
          return res.status(500).json({ success: false, message: "Error executing SQL query" });
        }

        if (results.length === 0) {
          console.log('Recipe not found:', rec_name);
          return res.status(404).json({ success: false, message: "Recipe not found" });
        }

        const recipe_id = results[0].recipe_id;

        // Insert ingredients associated with the fetched recipe_id
        const insertIngredientQuery = 'INSERT INTO ingredients (recipe_id, ingr_name, calories, protein, fat, carbohydrates) VALUES (?, ?, ?, ?, ?, ?)';
        dbConn.query(insertIngredientQuery, [recipe_id, ingr_name, calories, protein, fat, carbohydrates], (error, results) => {
          if (error) {
            console.log('Error inserting ingredients:', error);
            return res.status(500).json({ success: false, message: "Error executing SQL query" });
          }
          console.log('Ingredients inserted successfully', results);
          res.status(200).json(results);
        });
      });
    });
  } catch (error) {
    console.log('Error handling request', error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// add submitted recipe's procedures
router.post('/addSteps', (req, res) => {
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

      const { rec_name, step_num, step_desc } = req.body;

      // Fetch recipe_id based on rec_name
      const selectRecipeIdQuery = 'SELECT recipe_id FROM recipes WHERE rec_name = ?';
      dbConn.query(selectRecipeIdQuery, [rec_name], (error, results) => {
        if (error) {
          console.log('Error fetching recipe_id:', error);
          return res.status(500).json({ success: false, message: "Error executing SQL query" });
        }

        if (results.length === 0) {
          console.log('Recipe not found:', rec_name);
          return res.status(404).json({ success: false, message: "Recipe not found" });
        }

        const recipe_id = results[0].recipe_id;

        // Insert procedure steps associated with the fetched recipe_id
        const insertProcedureQuery = 'INSERT INTO procedure_steps (recipe_id, step_num, step_desc) VALUES (?, ?, ?)';
        dbConn.query(insertProcedureQuery, [recipe_id, step_num, step_desc], (error, results) => {
          if (error) {
            console.log('Error inserting procedure steps:', error);
            return res.status(500).json({ success: false, message: "Error executing SQL query" });
          }
          console.log('Procedure steps inserted successfully', results);
          res.status(200).json(results);
        });
      });
    });
  } catch (error) {
    console.log('Error handling request', error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});



module.exports = router;
