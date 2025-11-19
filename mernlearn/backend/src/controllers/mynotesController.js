//this file is effectively like a views.py

// const getAllMynotes=(req,res)=>{
//     res.status(200).send("you have 20 notes");
// }; //this is having the function as an object

// function getAllMynotes(req,res){ //can make this an async func also if you want.
//     res.status(200).send("you have 20 notes");
// };

const Note=require("../models/Note.js");

async function getAllMynotes(req,res){ //so here, request is never used, so if you want u can skip it by putting (_,res)
    try {
        //const notes=await Note.find() //this gets you every single note.
        const notes=await Note.find().sort({createdAt:-1}) //this sorts it by which is created latest at the top (if createdAt:1 then itll be latest at bottom)
        res.status(200).json(notes)
    } catch (error) {
        //catch meaning server failed 
        console.error('error in getAllNotes controller: ',error); //can also do console.log
        res.status(500).json({message:"Internal server error"});
    }
}; //go to postman and send a get request to http://localhost:5001/api/mynotes then try breaking something in the try block like making find() to finc() and then send request again and see the difference.

// function createNote(req,res){  
//     res.status(201).json({message:"noted"});
// };

async function createNote(req,res){
    //to create a note, client needs to send the title and content.
    try {
        //we get the title and content from the body of the request
        const {title,content}=req.body //from the post request body
        //console.log(title,content) //by default, you wont be able to access these values. so in server.js we add app.use(express.json) which is our middleware.
        const note = new Note({title:title, content:content}); //creating note
        const savedNote = await note.save() //saving in database (the 'const savedNote=' is optional)
        res.status(201).json({message:"note created succesfully;",note:savedNote    })
    } catch (error) {
        //catch meaning server failed 
        console.error('error in createNote controller: ',error); //can also do console.log
        res.status(500).json({message:"Internal server error"});
    } 
    //now upon sending a post request with
    // {
    // "title": "myfirstnote", 
    // "content":"somecontents"
    // }
    //as the body, i can check the database and see that it is succesfully created perectly.
}

// function updateNote(req,res){  
//     res.status(200).json({message:"note updated"});
// };

//to send put request, we need to do https://loclahost:5001/api/mynotes/{id} so we will have to put the id of the note to be 
// updated in place of {id} and use it to locate our note in the db and edit that.
//(the _id field is created by mongo by default.)
async function updateNote(req,res) {
    try {
        const {title,content}=req.body //got from req
        //now communicate with db
        //const oldNote=await Note.findByIdAndUpdate(req.params.id,{title:title,content:content}); //here, the findByIdAndUpdate will by default return the note before it was updated.
        //now by putting new:true, it returns the note after it was updated.
        const newNote=await Note.findByIdAndUpdate(req.params.id,{title:title,content:content},{new:true});
        //it only updates what the client passes though, so if title missing in the put request, itll stick to the old title.

        //now here, the req.params.id is because we have put path as "/:id" in path in mynotesRoutes.js
        //if we had put ":/hi", we would have to put req.params.hi

        //now check if the req.params.id sent is valid by checkin if the oldNote was returned or not
        if(!newNote){return res.status(404).json({message:"invalid id, note not found."})} //if no note with that id, send err msg

        //now send response
        res.status(200).json({message:"note updated succesfully",newNote:newNote})
    } catch (error) {
        //catch meaning server failed 
        console.error('error in updateNote controller: ',error); //can also do console.log
        res.status(500).json({message:"Internal server error"});
    }
}

// function deleteNote(req,res){  
//     res.status(200).json({message:"note deleted"});
// };

async function deleteNote(req,res) {
    try {
        const deletedNote=await Note.findByIdAndDelete(req.params.id);
        if(!deleteNote){return res.status(404).json({message:"invalid ID, note not found"})}
        res.status(200).json({message:"Note deleted succesfully", deleteNote:deleteNote})
    } catch (error) {
        //catch meaning server failed 
        console.error('error in deleteNote controller: ',error); //can also do console.log
        res.status(500).json({message:"Internal server error"});
    }
}

//controller to fetch a specific note.
async function getMynote(req,res) {
    try {
        const note=await Note.findById(req.params.id);
        if(!note){return res.status(404).json({message:"invalid id, Note not found."})}
        res.status(200).json(note)
    } catch (error) {
        //catch meaning server failed 
        console.error('error in getMynote controller: ',error); //can also do console.log
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports = { //(learn this ig ;-;)
    getAllMynotes,
    createNote,
    updateNote,
    deleteNote,
    getMynote
};
