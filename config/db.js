import mongoose from "mongoose";


// async/await : connect() returns a Promise

const connectDB = async () => {
    try {
         await mongoose.connect('mongodb://localhost:27017/demoUsersDB') // Connection String
         console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}




export default connectDB