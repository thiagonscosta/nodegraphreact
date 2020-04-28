const graphql = require('graphql');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
// var schema = require('./graphql/schemas/bookSchema');
const { GraphQLSchema } = graphql;
const { query } = require('./graphql/queries')
const { mutation } = require('./graphql/mutations');

const expressGraphQl = require("express-graphql");

require('dotenv').config();

const dialect = process.env.DB_DIALECT;
const host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;

mongoose
  .connect(`${dialect}://${host}:${db_port}/${database}`, {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connection success'))
  .catch((error) => console.log('connection error: ', error));

const app = express();


const schema = new GraphQLSchema({
  query,
  mutation
});
app.use(cors('*'));
app.use(
  '/graphql',
  cors(),
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
  })
);
// app.use('/', cors(), graphqlHTTP({
//   schema: schema,
//   rootValue: global,
//   graphiql: true,
// }));



const PORT = process.env.PORT || 4000;

app.listen(PORT);