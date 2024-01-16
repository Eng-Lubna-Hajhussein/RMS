const graphql = require("graphql");
const RootQuery = require("./Query/query");
const Mutation = require("./Mutation/mutation");

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});