//lets import express
//import express from "express";
//there will be a warning, to solve this, we instead import using

// Load environment variables FIRST before anything else
const dotenv=require("dotenv") 
dotenv.config();//this lets us access our environment variables in the .env

const express = require("express");
const app=express();

//middleware (to allow for post data to be passed via request.body)
app.use(express.json()); //this middleware will parse the json body and let us get access to the json body (req.body)
//middleware commes into play just before the response is sent back.
//heres an example middleware:
app.use((req,res,next)=>{console.log(`we just got a new req lol. method is ${req.method} and url is ${req.url}`); next();}) //this is a callback func (this is middleware) (were using this to edit whatever you want just before its sent and then call the function)
//middlware can be used to confirm authentication or for rate limiting etc

const cors=require("cors") 
//app.use(cors()) //this is the middleware im using to say api allows its stuff to load on a different frontend location
//cors stands for Cross-Origin Resources Sharing 
//just cors() means it allows every request from every URL, but if we want to specifically allow only few urls
app.use(cors({origin:["http://localhost:5173"]})) //you can add more URLs if you want.

//middleware can be used to enforce rate limiting (limiting the number of requests in a given time. so we can prevent dos etc sorta.) (protects server from being overwhlemed.)
//so we can say for same user, max 100 requests in 15 mins. if they exceed limit, we say youve been rate limited.
//status code for 'too many requests' is 429
//upstash.com has multiple services, lets goo with free plan with redis with rate limiting.
//redis is the key value store which acts as a storage (like a nosql database that acts as a buffer bus with key value pairs.) (ive signed up)
//have made a database on the website and put the credentials in the .env file.
//npm install @upstash/ratelimit @upstash/redis
const rateLimiter=require("./middleware/ratelimiter.js")
app.use(rateLimiter) 


//now lets build a route.
app.get("/api/notes", (req,res) => {//here, req is request, res is response.
    //(send the notes) here we interact with the database etc, do whatever nessecary
    //res.send("you got notes"); //and send the response back.
    res.status(200).send("you got 5 notes"); //the res.status is for setting status code of the response.
})//here, we are saying when we get this get, run this function (the arrow function).
//this whole thing above is called a route. (an endpoint is a URL+HTTP method that allows client to interact with a resource)
//now if we go to localhost:5001/api/notes, we get a page that says you got 5 notes
//technically this is an API where we are listening for a get request and handling it properly.
//api stands for application programming interface (lets two apps talk to each other (like a waiter that takes requests from the person and gives it to the chef and gets the food back))
//so we send requests and get responses back.

//get meaning it gets data from database and sends back to frontend
//post meaning it puts data into database.
//put is for updating a post
//delete is for deleting a post.

app.post("/api/hello", (req,res) => {
    //create a note
    res.send("fail");
})


//http status codes: 
// 100: informational
// 200 OK: success, 201 Created: new resource Created
// 300: redirection. 301 Moved Permenantly. (like https://example.com to https://example.com (so we create a 301 redirect.))
// 400,500: error status codes. 
//  404 Not Found, 
//  400 bad request
//  401 unautherized 
//  403 forbidden
//  429 too many requests
//  500s server errors (though client made a valid request)
//  500 internal server error (server someting is broken)
//  503 service unavailable (server down or overloaded or smthn)
//you can see these status codes on going to inspect element and network and reloading the page

//right now, any changes we make in the code, we need to kill the server and restart it to see the changes
//so now lets install nodemon as ```npm install nodemon -D``` -D meaning install as a dev dependency (see package.json after installing to und)
//now im changing ```npm run dev``` from ```node server.js``` to ```nodemon server.js```
//now if you run ```npm run dev```, youll see a 'watching extensions: js, mjs, cjs, json' so itll watch for any changes and update as you save
//now this is for dev, lets make on for prod, so we make a script in the json called "start": node server.js


app.get("/api/hi", (req,res)=>{
    res.status(200).send("you have notes");
})

app.post("/api/hi", (req,res)=>{
    res.status(201).json({message:"post created successfully"});
})

app.put("/api/hi/:id", (req,res)=>{ //so id here is like our <str:pk> in django, 
    res.status(200).json({message:"post updated successfully"});
})


app.delete("/api/hi/:id", (req,res)=>{
    res.status(200).json({message:"post deleted successfully"});
})


//as you increase in complexity and size, this file will get too huge if we have all like this, 
// so lets make a folder called routes (and im making a mynotesRoute.js in it.)
const mynotesRoutes = require("./routes/mynotesRoutes.js"); //importing mynotesRoutes
app.use("/api/mynotes", mynotesRoutes) //anything that comes of this format, send it to this file
//like in our urls.py in django. so now in the mynotesRoutes.js, we take url as "/" (just as include and stuff in django, und.)

//similarly, our PORT can also be put in the .env and used here instead of 5001 by putting
//const PORT=process.env.PORT

const connectDB=require("./config/db.js");
// connectDB(); //right now, first the server starts on the port, then the db gets connected, which is odd.
//so we use a .then to say first connect the db, then listen and start the server.

connectDB().then(()=>{
    app.listen(5001, () => {console.log("Server started on port:5001");}); //we put it inside the then instead of in global cause we want the db to connect before anything else happens.
})

// app.listen(5001, () => {console.log("Server started on port:5001");}); //5001 is a port, we can put any port.
//now on cmd run npm run server.js (make sure youre in this backend dir) (this wont work, neither will npm run dev)
//so now lets run with command ```node server.js```
