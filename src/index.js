// require.apply('dotenv').config({path:'./env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config.apply({
    path: './env'
})



connectDB()

