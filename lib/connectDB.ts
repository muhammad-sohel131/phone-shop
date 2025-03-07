import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(<string>process.env.MongoURL)
        console.log("connected to DB")
    }catch(err){
        console.log(err)
    }
}

export default connectDB