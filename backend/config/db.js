const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Mask sensitive parts of the URI (for logging purposes)
const maskedURI = process.env.MONGO_URI.replace(/:\/\/(.*):(.*)@/, '://<username>:<password>@');
console.log(`Connecting to MongoDB at URI: ${maskedURI}`);

const connectDB = async () => {
    const maxRetries = 5; // Maximum retry attempts
    let retries = 0;

    while (retries < maxRetries) {
        try {
            console.log(`Attempting to connect to MongoDB (Attempt ${retries + 1}/${maxRetries})`);
            await mongoose.connect(process.env.MONGO_URI); // No need for additional options
            console.log('MongoDB connected successfully');
            return; // Exit the function if connection is successful
        } catch (error) {
            retries++;
            console.error(`MongoDB connection failed (Attempt ${retries}): ${error.message}`);
            if (retries < maxRetries) {
                console.log('Retrying in 5 seconds...');
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
            } else {
                console.error('Max retry attempts reached. Exiting...');
                process.exit(1); // Exit the process after max attempts
            }
        }
    }
};

module.exports = connectDB;
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

// // Mask sensitive parts of the URI (for logging purposes)
// const maskedURI = process.env.MONGO_URI.replace(/:\/\/(.*):(.*)@/, '://<username>:<password>@');
// console.log(`Connecting to MongoDB at URI: ${maskedURI}`);

// const connectDB = async () => {
//     const maxRetries = 5; // Maximum retry attempts
//     let retries = 0;

//     while (retries < maxRetries) {
//         try {
//             console.log(`Attempting to connect to MongoDB (Attempt ${retries + 1}/${maxRetries})`);
//             await mongoose.connect(process.env.MONGO_URI, {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//             });
//             console.log('MongoDB connected successfully');
//             return; // Exit the function if connection is successful
//         } catch (error) {
//             retries++;
//             console.error(`MongoDB connection failed (Attempt ${retries}): ${error.message}`);
//             if (retries < maxRetries) {
//                 console.log('Retrying in 5 seconds...');
//                 await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
//             } else {
//                 console.error('Max retry attempts reached. Exiting...');
//                 process.exit(1); // Exit the process after max attempts
//             }
//         }
//     }
// };

// module.exports = connectDB;

// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

// console.log(`Connecting to MongoDB at URI: ${process.env.MONGO_URI}`);

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error(`MongoDB connection failed: ${error.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
