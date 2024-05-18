const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const dotenv = require ('dotenv');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const app = express();
const dbConn = require('./config/db.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './routes/frontend/pics') // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original file name for the uploaded file
    }
  });
const upload = multer({storage: storage});

// Handle file upload using Multer middleware
app.post('/upload', upload.single('image'), (req, res) => {
    const image = req.file; // Uploaded image file
  
    if (!image) {
      return res.status(400).send('Please upload an image');
    }
  
    // Insert the image details into the database
    const insertQuery = 'INSERT INTO images (filename, size) VALUES (?, ?)';
    dbConn.query(insertQuery, [image.originalname, image.size], (err, result) => {
      if (err) {
        console.error('Error inserting image:', err);
        res.status(500).send('Error inserting image');
        return;
      }
      res.status(200).send('Image uploaded successfully');
    });
  });

require('dotenv').config({ path: './.env' });

const authentication = require("./routes/api/authentication.js");
const submitRecipe = require("./routes/api/submitRecipe.js");
const viewRecipe = require("./routes/api/viewRecipe.js");
const profile = require("./routes/api/profile.js");
const recipe = require("./routes/api/recipe.js");

app.use(express.json({ extended: false}));
app.use(cors());
app.use(cookieParser());
app.use('/authentication', authentication);
app.use('/submitRecipe', submitRecipe);
app.use('/viewRecipe', viewRecipe);
app.use('/profile', profile);
app.use('/recipe', recipe);
app.use(express.static('public'));


app.get('/', (req, res) => res.send('API Running'));

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"))
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
