const express = require('express');
const router = express.Router();
const Client = require('../Models/clients');

// Define client-related routes here.
router.get('/check', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {res.send('Error Found');
        res.status(500).send('Error ' + err);
    }
});

router.get('/check/:id', async (req, res) => {
    try {
        const clients = await Client.findById(req.params.id);
        res.json(clients);
    } catch (err) {
        res.status(500).send('Error ' + err);
    }
});

router.post('/create', async (req, res) => {
    try {
        console.log('Received request:', req.body); // Log the received data
        const { name, email, password } = req.body;
        
// Possibly in a separate file like 'validationUtils.js'
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}


    //     // Password validation
    // if (!isValidPassword(password)) {
    //     return res.status(400).json({
    //       message: "Password must be at least 8 characters, contain one uppercase, one lowercase, one number, and one special character."
    //           })      }
      
        // Check if the email ends with "@cuchd.in"
        if (!email.endsWith('@cuchd.in')) {
            return res.status(400).json({message:'Email must end with @cuchd.in'})
        }
        
        // Check if the email already exists
        const existingEmail = await Client.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({message:"Email already exists"})
        }

        // ... other validation checks
        
        // Save the client to the database
        const client = new Client({
            name: name,
            email: email,
            password: password,
        });
        const savedClient = await client.save();
        console.log('Saved client:', savedClient); // Log the saved client
        res.json({ response: true });
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ message: "Error Occured" });
    }
});



router.patch('/patch/:id', async(req, res)=> {
    try{
        const client = await Client.findById(req.params.id);
        client.name = req.body.name
        const a1 = await client.save()
        res.json(a1)
    }catch (err) {
        res.send('Error')
    }
})



router.post("/login", async (req, res) => {
    let email = req.body.email;
    try {
        let user = await Client.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: "Try logging with correct credentials" });
        }

        // Compare passwords securely using bcrypt or similar library
        // For example:
        // const validPassword = await bcrypt.compare(req.body.password, user.password);
        // if (!validPassword) {
        //     return res.status(400).json({ errors: "Try logging with correct password" });
        // }

        // Assuming plain text password comparison for now
        if (req.body.password !== user.password) {
            return res.status(400).json({ errors: "Try logging with correct password" });
        }

        return res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

module.exports = router;
