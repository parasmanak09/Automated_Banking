const express = require('express');
const mongoose = require('mongoose');

//const url = 'mongodb+srv://harshmail:harsh@onlinesbi.tyo30fj.mongodb.net/'; // Cluster --> OnlineSBII
//const url = 'mongodb+srv://harshmail:harsh@cluster0.udepd.mongodb.net/'; // Cluster ---> Cluster0
const url = 'mongodb://localhost:27017/';
const app = express();
const cors = require('cors'); // Import cors package
const port = 9015;

const mongoDB=require('./db');

app.use(cors({ origin : 'http://localhost:3000'})); // Use cors middleware
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB...');
        mongoDB();
    })
    .catch(err => console.error('Could not connect to MongoDB:', err));

const connection = mongoose.connection;

const clientRouter = require('./Routes/clients');

app.use('/api', clientRouter);
app.use('/api', require("./Routes/display"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


app.listen(port, () => {
    console.log('Server listening on port ' + port);

});
