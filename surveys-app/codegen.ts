import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://survey546.azurewebsites.net/graphql",
  documents: "src/**/*.gql",
  generates: {
    "src/gql/index.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        fetcher: "graphql-request",
      },
    },
  },
};

export default config;
