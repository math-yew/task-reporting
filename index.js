const express = require('express');
// const mongoose = require('mongoose');
const config = require('./config.js');

console.log("uri: " + config.uri);



const { MongoClient } = require('mongodb');

const client = new MongoClient(config.uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('sample_mflix');
    const collection = db.collection('movies');

    // Find the first document in the collection
    const first = await collection.findOne();
    console.log(first);
  } finally {
    // Close the database connection when finished or an error occurs
    await client.close();
  }
}
run().catch(console.error);





const app = express();

// Connect to MongoDB
// mongoose.connect('mongodb://localhost/your_db_name', { useNewUrlParser: true });

// Define a schema for your data
// const yourSchema = new mongoose.Schema({
//   field1: String,
//   field2: Number,
//   field3: Date
// });

// Create a model for your data
// const YourModel = mongoose.model('YourModel', yourSchema);

// Create an endpoint for saving data
app.post('/save', (req, res) => {
  // const yourData = new YourModel({
  //   field1: req.body.field1,
  //   field2: req.body.field2,
  //   field3: req.body.field3
  // });
  // yourData.save((err) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.send('Data saved successfully!');
  //   }
  // });
});

// Create an endpoint for retrieving data
app.get('/data', (req, res) => {
  // YourModel.find((err, data) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.send(data);
  //   }
  // });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
