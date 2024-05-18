const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbConn = require('../../config/db.js');

// user sign up
router.post('/signup', async (req, res) => {
    try {
        const SALT_ROUNDS = 10; // Increase salt rounds for stronger hashing

        // Ensure all required fields are provided
        if (!req.body.u_firstname || !req.body.u_lastname || !req.body.email || !req.body.password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);

        // Prepare SQL query
        const sqlQuery = `INSERT INTO user_account(u_firstname, u_lastname, email, password) VALUES (?, ?, ?, ?)`;

        // Values parameter for prepared statement
        const values = [
            req.body.u_firstname,
            req.body.u_lastname,
            req.body.email,
            hashedPassword
        ];

        // Execute the SQL query
        dbConn.query(sqlQuery, values, (error, results) => {
            if (error) {
                console.error("Error signing up:", error);
                return res.status(500).json({ success: false, message: "Failed to sign up. Please try again later." });
            }
            return res.status(200).json({ success: true, message: "User signed up successfully." });
        });
    } catch (error) {
        console.error("Error signing up:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// user log in
router.post('/login', async (req, res) => {
    try {
        const u_firstname = req.body.u_firstname;
        const email = req.body.email;
        const password = req.body.password;

        // Ensure email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Missing Fields' });
        }

        // Retrieve user account with the provided email
        const sqlQuery = `SELECT * FROM user_account WHERE email = ?`;
        dbConn.query(sqlQuery, [email], async (error, results) => {
            if (error) {
                console.error("Error logging in:", error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Check if user with the provided email exists
            if (results.length === 0) {
                return res.status(401).json({ error: 'Invalid user' });
            }

            const user = results[0];

            // Compare the submitted password with the stored hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            // If password is valid, generate JWT token and send it in the response
            if (passwordMatch) {
                console.log("Log In Successful...!")
                const login_info = {
                    user_id: user.user_id,
                    email: user.email
                };
                // Use a secure method to generate token secret
                const authToken = jwt.sign({ Info: login_info }, 'secrethotdog', { expiresIn: '1h' });
                res.cookie('authToken', authToken, { httpOnly: true, secure: true });
                return res.status(200).json({ success: true, token: authToken });
            } else {
                // If password is invalid, return error response
                return res.status(401).json({ error: 'Invalid password' });
            }
        });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
