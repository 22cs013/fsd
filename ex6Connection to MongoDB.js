const { MongoClient } = require('mongodb');

// MongoDB connection configuration
const uri = "mongodb://localhost:27017";
const databaseName = "test";
const collectionName = "test_collection";

async function fetchData() {
  const client = new MongoClient(uri); // Create a MongoDB client

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB!");

    // Access the database and collection
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    // Fetch all documents from the collection
    const documents = await collection.find({}).toArray();
    console.log("Fetched documents:", documents);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Close the connection to the database
    await client.close();
    console.log("Connection to MongoDB closed.");
  }
}

// Execute the function
fetchData();
