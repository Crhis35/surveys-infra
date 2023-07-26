import { GraphQLClient } from 'graphql-request';

export const gqlClient = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL);
