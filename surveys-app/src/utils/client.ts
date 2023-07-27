import { GraphQLClient } from 'graphql-request';

export const gqlClient = new GraphQLClient(
  import.meta.env.VITE_GRAPHQL_URL ||
    'https://survey546.azurewebsites.net/graphql'
);
