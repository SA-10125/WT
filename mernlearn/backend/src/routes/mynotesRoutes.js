const express = require("express"); //importing express

const router=express.Router();

// //notice the router.get instead of app.get
// router.get("/",(req,res)=>{ //so here, we are putting just / since we come here only after and from a api/mynotes
//     res.status(200).send("you have 20 notes");
// })

// router.post("/",(req,res)=>{  
//     res.status(201).json({message:"noted"});
// })

// router.put("/:id",(req,res)=>{  
//     res.status(200).json({message:"note updated"});
// })

// router.delete("/:id",(req,res)=>{  
//     res.status(200).json({message:"note deleted"});
// })

// module.exports = router;

//ive commented out the above stuff cause having all the funcs here is hassle.
//now this file itself could get V long, so im commenting it out and abstracting a little more
//by creating a folder called controllers and in it, a file mynotesController.js
//now i just move my functions in there and use this as my urls.py calling those functions (instead of having them here as arrow functions)
//so effectively, if you think of it like django,
//the server.js would have the redirect for the main urls, this file would act as a urls.py for that app, 
//and the controllers file would act as a views func.


const {getAllMynotes, createNote,updateNote, deleteNote, getMynote} = require("../controllers/mynotesController.js"); //importing 

router.get("/",getAllMynotes) //so here, we are putting just / since we come here only after and from a api/mynotes and calling the function at the endpoint.
router.post("/",createNote)
router.put("/:id",updateNote)
router.delete("/:id",deleteNote)
router.get("/:id",getMynote)

module.exports = router;
