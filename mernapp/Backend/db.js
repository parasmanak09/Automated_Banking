const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        

        const fetched_data = await mongoose.connection.db.collection("clients");
        fetched_data.find({}).toArray( (err, data) =>{
            if(err){
                console.log(err);
            }
            else{
                global.clients = data;
                console.log(global.clients);
            }
        } );
       

        
    } catch (err) {
        console.error("Error:", err);
    }
};

module.exports = mongoDB;
