const mongoose=require("mongoose");

//step1: create a schema (schema meaning blueprint that defines how data is organized and its relations etc)
//step2: create a model based off the schema.

const noteSchema = new mongoose.Schema({ //here noteSchema is just any name
    //here we put our fields. (this whole thing in the argument is an object/objects.)
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    // createdAt:{ //not the best way of doing createdat field. (instead we create another object)
    //     type:Date
    // }
}, {timestamps:true} //this is the second object timestamps. by default, mongodb will give you createdAt and updatedAt fields.
); 
//so now schema is ready, lets make model off of the schema.

const Note = mongoose.model("Note", noteSchema) //here, Note is a name but prefer to keep first letter capitalized and singular (Note not Notes)

module.exports=Note; 