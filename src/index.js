import mongoose from "mongoose"
import { DB_NAME} from "./constants"
import connectDB from "./db"



connectDB()

/*

//Db connection can be done in many ways by writing function or one line but we will be using IIFE

import express from "express"
const app = express() 

( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("Error: ", error);
            throw error
        })
        
        app.listen(process.env.PORT, () => {
            console.log(`App is listening at port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
})()
*/