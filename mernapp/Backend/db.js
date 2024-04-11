const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        

        const fetched_data = await mongoose.connection.db.collection("clients");
        const data = await fetched_data.find({}).toArray();
        console.log(data);
    } catch (err) {
        console.error("Error:", err);
    }
};

module.exports = mongoDB;
