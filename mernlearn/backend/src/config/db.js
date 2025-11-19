//an async function to connect to our database.
const mongoose = require("mongoose");

const connectDB = async()=>{
    try {
        //we connect our database succesfully
        await mongoose.connect(process.env.MONGO_URI);
            //issue now is if we upload this to github or smthn, everyone can see our connection link/string. 
            //so we make a .env file to store all this sensitive info.
            //so now weve replaced the link with the .env.MONGO_URI, now the .env file will be gitignored and hence were safe.
        //the await is cause it might take some time to connect
        console.log("MONGODB CONNECTED SUCCESFULLY.")
    } catch (error) {
        console.error("ERROR CONNECTING TO MONGODB", error); //concats to a string since one of them is a string
        process.exit(1) //exit with failure
    }
}
module.exports=connectDB;