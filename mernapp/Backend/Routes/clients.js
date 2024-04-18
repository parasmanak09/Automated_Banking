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
        const { name, email, password, transactionId } = req.body; // Assuming transactionId is passed from the client

        // Validate email format
        if (!email.endsWith('@cuchd.in')) {
            return res.status(400).json({ message: 'Email must end with @cuchd.in' });
        }

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
            vault: [{ no: 1, balance: 0, days: 10 }]
        });

        // Save the new client to the database
        const savedClient = await newClient.save();

        // Create a default transaction object using the provided transaction ID
        const transaction = {
            
            type: 'deposit',
            from: 'system', // Indicate it's from the system
            to: savedClient.name, // Set the client's ID as the recipient
            money: 0, // Initial deposit amount if needed
            timestamp: Date.now()
        };

        // Add the default transaction to the new client
        savedClient.transactions.push(transaction);

        // Save the updated client with the default transaction
        await savedClient.save();

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


// post request for the transaction
router.post('/transaction', async (req, res) => {
    try {
        const { from, to, money, password } = req.body;

        // Find the sender by ID
        const sender = await Client.findById(from);
        if (!sender) {
            return res.status(404).json({ message: 'Sender not found' });
        }
        
        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, sender.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Check if sender has enough balance
        if (sender.balance < money) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Find the receiver by email
        const receiver = await Client.findOne({ email: to });
        if (!receiver) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        // Update sender's balance (withdraw)
        sender.balance -= money;

        // Update receiver's balance (deposit)
        receiver.balance += money;

        // Generate transaction ID
        const transaction_id = `${sender.email.split('@')[0]}${Math.floor(100000 + Math.random() * 900000)}${to.split('@')[0]}`;

        // Create transaction objects with 'from' and 'to' fields
        const senderTransaction = { 
            transaction_id: transaction_id, 
            type: 'withdraw', 
            money: money, 
            from: sender.email, // Include sender's email
            to: receiver.email, // Include receiver's email
            timestamp: new Date() 
        };
        const receiverTransaction = { 
            transaction_id: transaction_id, 
            type: 'deposit', 
            money: money, 
            from: sender.email, // Include sender's email
            to: receiver.email, // Include receiver's email
            timestamp: new Date() 
        };

        // Add transactions to sender and receiver
        sender.transactions.push(senderTransaction);
        receiver.transactions.push(receiverTransaction);

        // Save updated sender and receiver
        await sender.save();
        await receiver.save();

        res.json({ message: 'Transaction successful' });
    } catch (error) {
        console.error('Error:', error);
        res.json({ message: 'Failed to process transaction', error:error });
    }
});

router.post('/send-verification-email', (req, res) => {
    const { userId, email } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'smtp.elasticemail.com', // Or your email provider
      auth: {
        user: 'harshbelarkha@proton.me',
        pass: '408CA25D72188F712BC0FA6F58192AA704BE'
      }
    });
  
    const mailOptions = {
      from: 'harshbelarkha@proton.me',
      to: email, 
      subject: 'Your Email Verification',
      text: `Your OTP: ${generateOTP()}` // Generate OTP here
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({ error: 'Email sending failed' });
      } else {
        res.json({ message: 'Verification email sent' });
      }
    });
  });


module.exports = router;
