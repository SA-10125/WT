//Create / Connect to Database

const { MongoClient } = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const dbName = "university";

MongoClient.connect(url)
  .then((client) => {
    console.log("Database connection established successfully");
    const db = client.db(dbName);
    console.log(`Database "${dbName}" is created`);
    client.close();
  })
  .catch((err) => {
    console.error("An error occurred:", err);
  });

//Create Collection

const { MongoClient } = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const dbName = "university";

MongoClient.connect(url)
  .then(client => {
    const db = client.db(dbName);
    return db.createCollection("student")
      .then(() => {
        console.log("Collection 'student' created.");
        return client.close();
      });
  })
  .catch(err => {
    console.error("Error occurred:", err);
  });
//Insert One

const { MongoClient } = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const dbName = "university";

MongoClient.connect(url)
  .then(client => {
    const db = client.db(dbName);
    const collection = db.collection("student");
    return collection.insertOne({ name: "PAC", srn: "000" })
      .then(res => {
        console.log("1 document inserted:", res.insertedId);
        return client.close();
      });
  })
  .catch(err => {
    console.error("Error:", err);
  });
//Insert Many

const { MongoClient } = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const dbName = "university";

MongoClient.connect(url)
  .then(client => {
    const db = client.db(dbName);
    const collection = db.collection("student");
    const docs = [
      { name: "Ayush", srn: "104" },
      { name: "Ajay", srn: "105" }
    ];

    return collection.insertMany(docs)
      .then(res => {
        console.log(`${res.insertedCount} documents inserted.`);
        return client.close();
      });
  })
  .catch(err => {
    console.error("Error:", err);
  });
//Find Documents

const { MongoClient } = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const dbName = "university";

MongoClient.connect(url)
  .then(client => {
    const db = client.db(dbName);
    const collection = db.collection("student");

    return collection.find({}, { projection: { _id: 0, name: 1 } }).toArray()
      .then(docs => {
        console.log("Documents found:", docs);
        return client.close();
      });
  })
  .catch(err => {
    console.error("Error:", err);
  });
//Update One Document

const { MongoClient } = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const dbName = "university";

MongoClient.connect(url)
  .then(client => {
    const db = client.db(dbName);
    const collection = db.collection("student");

    const query = { name: "Ajay" };
    const update = { $set: { name: "Krishna", age: 21 } };

    return collection.updateOne(query, update)
      .then(res => {
        console.log("Matched:", res.matchedCount, "Modified:", res.modifiedCount);
        return client.close();
      });
  })
  .catch(err => {
    console.error("Error:", err);
  });
//Delete One Document

const { MongoClient } = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const dbName = "university";

MongoClient.connect(url)
  .then(client => {
    const db = client.db(dbName);
    const collection = db.collection("student");
    const query = { name: "Ayush" };

    return collection.deleteOne(query)
      .then(res => {
        console.log("Deleted:", res.deletedCount);
        return client.close();
      });
  })
  .catch(err => {
    console.error("Error:", err);
  });
//Drop Collection

const { MongoClient } = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const dbName = "university";

MongoClient.connect(url)
  .then(client => {
    const db = client.db(dbName);
    return db.collection("student").drop()
      .then(res => {
        console.log("Collection dropped:", res);
        return client.close();
      });
  })
  .catch(err => {
    console.error("Error:", err);
  });
