import mongoose from 'mongoose'
let isConected = false;

export const connectDB = async () => {
    
    mongoose.set('strictQuery',true);
    if (!process.env.mongoose_url) return console.log("mongoose url is not found");
    if (isConected) console.log("Already conected to MongoDb");
    try {
        
       await mongoose.connect(process.env.mongoose_url)
       console.log("Connected to MongoDb");
       isConected = true;
    } catch (error) {
        console.log(error)
    }
}