import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path:"../.env"});
export const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...', process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB: '+ conn.connection.host);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};