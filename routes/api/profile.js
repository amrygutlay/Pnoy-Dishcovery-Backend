const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const dbConn = require('../../config/db.js');

// view profile
router.get('/viewProfile', (req, res) => {
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

            const sqlQuery = `SELECT * FROM user_account WHERE email = ?`;
            dbConn.query(sqlQuery, decodedEmail, (error, results) => {
                if (error) {
                    console.log('Error executing SQL query', error);
                    return res.status(500).json({ success: false, message: "Error executing SQL query" });
                }
                console.log('SQL query executed successfully');
                res.status(200).json(results);
            });
        });
    } catch (error) {
        console.log('Error handling request', error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// update password
router.put('/updatePassword', async (req, res) => {
    try {
        const email = req.body.email;
        const newPassword = req.body.newPassword;

        // Ensure email and new password are provided
        if (!email || !newPassword) {
            return res.status(400).json({ error: 'Missing Fields' });
        }

        // Hash the new password before updating
        const hashedPassword = await bcrypt.hash(newPassword, 5);

        // Update the user's password in the database
        const updatePasswordQuery = `UPDATE user_account SET password = ? WHERE email = ?`;
        dbConn.query(updatePasswordQuery, [hashedPassword, email], (error, results) => {
            if (error) {
                console.error("Error updating password:", error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Check if the password was updated successfully
            if (results.affectedRows > 0) {
                return res.status(200).json({ success: true, message: "Password updated successfully" });
            } else {
                return res.status(404).json({ error: 'User not found or password not updated' });
            }
        });
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
