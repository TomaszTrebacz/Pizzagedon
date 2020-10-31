import GraphQLUUID from 'graphql-type-uuid';
import * as Query from "./Query";
import * as Mutation from "./Mutation";

const resolvers = { Query, Mutation, UUID: GraphQLUUID };

export default resolvers;