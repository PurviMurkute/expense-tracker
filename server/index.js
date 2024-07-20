import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URL)

    if (conn) {
        console.log("MongoDB connected successfully 📦")
    }
    else{
        console.log("MongoDB not connected")
    }
};
connectDB();

const PORT = process.env.PORT;

app.get('/', (req, res)=>{
    res.json({
        message: "Welcome to expense-tracker API"
    })
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})