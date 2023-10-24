import mongoose from "mongoose"
import { NextResponse } from "next/server";
// mongoose.set('strictQuery',true)
let currentState = false;
const dbConnect = async () => {
    if(currentState){
        return console.log("Database is already connected.")
    };
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI!)
        currentState=true;
        if(connection.host){
            currentState=true;
            console.log('Connected successfully')
        }
    } catch (error) {
        console.log('connection failed')
        console.log(error)
        return NextResponse.json({message:"Database connection failed please try again",success:false})
    }
}

export default dbConnect;