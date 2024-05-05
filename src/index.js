// require.apply('dotenv').config({path:'./env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js"
import {app} from "./app.js"

dotenv.config.apply({
    path: './env'
})



connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERROR : ", error);
        throw error
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB CONNECTION FAILED !!! ", err );
})
