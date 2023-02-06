const express = require('express');
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;

const config = require('./config.js');
const app = express();
let db;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use(bodyParser.json());

MongoClient.connect(config.uri, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db('sollus');
  app.listen(3003, () => {
    console.log('listening on 3003');
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/data/:id', (req, res) => {
  console.log("get id");
  db.collection('task_reporting').findOne({_id: ObjectId(req.params.id)}, (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.get('/dataOne', (req, res) => {
  console.log("GETone");
  db.collection('task_reporting').findOne({},(err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.get('/data', (req, res) => {
  console.log("get");
  db.collection('task_reporting').find({}).toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.get('/cases/:archive', (req, res) => {
  console.log("case");
  let query = (req.params.archive == 'true') ? {} : {archive: {$ne:true}};
  db.collection('task_reporting').find(query).toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.post('/data', (req, res) => {
  console.log("post");
  db.collection('task_reporting').insertOne(req.body, (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.put('/data/:id', (req, res) => {
  console.log("put");
  db.collection('task_reporting').updateOne({_id: ObjectId(req.params.id)}, {$set: req.body}, (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.delete('/data/:id', (req, res) => {
  console.log("delete");
  db.collection('task_reporting').deleteOne({_id: ObjectId(req.params.id)}, (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

// app.delete('/data/:id', (req, res) => {
//   console.log("delete");
//   db.collection('task_reporting').deleteMany({tasks: []}, (err, result) => {
//     if (err) return console.log(err);
//     res.send(result);
//   });
// });
