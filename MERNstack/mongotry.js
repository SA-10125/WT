const {MongoClient} = require('mongodb');
const url="mongodb://127.0.0.1:27017";
const dbName="university";

MongoClient.connect(url)
.then((client)=>{
    console.log("Connected to MongoDB server");
    const db=client.db(dbName);
    const studentsCollection=db.collection('students');
    // Insert a new student
    return studentsCollection.insertOne({name:"Alice", age:22, major:"Computer Science"})
    .then((result)=>{
        console.log("Inserted student:", result.ops[0]);
    });
})
.catch((err)=>{
    console.error("Error connecting to MongoDB:", err);
});

