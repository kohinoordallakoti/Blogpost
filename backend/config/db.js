import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Host: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB