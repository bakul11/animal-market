import mongoose from "mongoose";

// Database Connection 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL);
        console.log("Database connected");
    } catch (error) {
        console.log('Database connect fail...');
    }
}
export default connectDB;

