const { default: mongoose } = require('mongoose');

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)   
        console.log(`the db is connect with ${mongoose.connection.host}`);
    } catch (error) {
        console.error(error.message);
        await mongoose.disconnect(); // Disconnect from MongoDB
        process.exit(1); // Exit the process with an error code
    }               
};