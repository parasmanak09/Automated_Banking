const express = require('express');
const router = express.Router();
const Client = require('../Models/clients');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtsecret = "IlovedChaviAndVanshika";

// Utility function to check if a password meets certain criteria
// function isValidPassword(password) {
//     // Adjust the regex pattern as needed
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
// }

// GET route to fetch all clients
router.get('/check', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        console.error('Error Found:', err);
        res.status(500).send('Error ' + err);
    }
});

// GET route to fetch a specific client by ID
router.get('/dataget/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        res.json(client);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error ' + err);
    }
});

// POST route to create a new client
router.post('/create', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate email format
        if (!email.endsWith('@cuchd.in')) {
            return res.status(400).json({ message: 'Email must end with @cuchd.in' });
        }

        // Validate password strength
        // if (!isValidPassword(password)) {
        //     return res.status(400).json({ message: 'Password must meet certain criteria' });
        // }

        // Check if the email already exists
        const existingEmail = await Client.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new client
        const newClient = new Client({
            name,
            email,
            password: hashedPassword,
            balance: 0,
            email_verified: false,
            transactions: [],
            vault: [{ no: 1, balance: 0, days: 10 }],
            // Add default transaction with current timestamp
            transactions: [{ type: 'deposit', money: 0, timestamp: Date.now() }]
        });

        // Save the new client to the database
        const savedClient = await newClient.save();
        res.json(savedClient);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Error Occurred' });
    }
});

// PATCH route to update email verification status
router.patch('/otppatch/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        client.email_verified = true;
        const updatedClient = await client.save();
        res.json(updatedClient);
    } catch (err) {
        console.error('Error:', err);
        res.send('Error');
    }
});

// POST route to update email verification status
router.post('/updateEmailVerified/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedClient = await Client.findByIdAndUpdate(userId, { email_verified: true }, { new: true });
        res.json(updatedClient);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to update email verification status' });
    }
});

// POST route to authenticate and log in a client
router.post("/login", async (req, res) => {
    let email = req.body.email;
    
    try {
        let user = await Client.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: "Try logging with correct credentials" });
        }

        // Compare passwords securely using bcrypt or similar library
        // For example:
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ errors: "Try logging with correct password" });
        }

        // // Assuming plain text password comparison for now
        // if (req.body.password !== user.password) {
        //     return res.status(400).json({ errors: "Try logging with correct password" });
        // }
        
        const data={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, jwtsecret)
        return res.json({ success: true, email_verified : user.email_verified, authToken:authToken });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

module.exports = router;
