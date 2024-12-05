const { MongoClient } = require('mongodb');

// MongoDB connection string and database details
const uri = "mongodb://localhost:27017";
const databaseName = "test";
const collectionName = "test_collection";

async function performCRUD() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db(databaseName); // Access the database
    const collection = db.collection(collectionName); // Access the collection

    // 1. Insert a document
    const insertResult = await collection.insertOne({
      name: "Rahul",
      age: 21,
      department: "Computer Science",
    });
    console.log("Insert Acknowledged:", insertResult.acknowledged);

    // 2. Fetch and display all documents
    console.log("Documents After Insert:", await collection.find({}).toArray());

    // 3. Update a document
    const updateResult = await collection.updateOne(
      { name: "Rahul" }, // Filter condition
      { $set: { age: 19 } } // Update operation
    );
    console.log("Updated Document Count:", updateResult.modifiedCount);

    // Display documents after update
    console.log("Documents After Update:", await collection.find({}).toArray());

    // 4. Delete a document
    const deleteResult = await collection.deleteOne({ name: "Rahul" });
    console.log("Deleted Document Count:", deleteResult.deletedCount);

    // Display documents after deletion
    console.log("Documents After Deletion:", await collection.find({}).toArray());
  } catch (error) {
    console.error("Error performing CRUD operations:", error);
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log("Connection to MongoDB closed.");
  }
}

// Execute the function
performCRUD();
