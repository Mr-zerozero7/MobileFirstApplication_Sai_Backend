const mongoose = require('mongoose')
require('dotenv').config();


// database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log('MongoDB Connected Successfully')
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}


module.exports = connectDB
