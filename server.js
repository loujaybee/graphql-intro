var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    role(id: Int): Role
  }
  type Role {
    id: String,
    title: String
  }
`);

// This class implements the RandomDie GraphQL type
class Role {
  constructor(id){
    console.log('constructor:::', id);
    this.id = id;
    this.roles = [{
      title: 'test 1'
    }, {
      title: 'test 2'
    }];
  }
  id() {
    return this.id;
  }
  title() {
    return this.roles[this.id].title;
  }
}

// The root provides a resolver function for each API endpoint
var root = {
  role: ({ id }) => {
    return new Role(id);
  }
};

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');