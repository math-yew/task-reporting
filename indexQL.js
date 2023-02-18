const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const config = require('./config.js');

const schema = require('./schema/schema');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(config.uri,
  { useNewUrlParser: true },
  () => {
    console.log("Connect with DB successfully.");
  });
mongoose.connection.once('open', () => {
   console.log('connected to database');
});

const app = express();


app.use('/graphql', graphqlHTTP({
   schema,
   graphiql:true
}));

app.listen(3005, () => {
   console.log('Listening on port 3005');
});
