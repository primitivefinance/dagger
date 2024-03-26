import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://dfmm-indexer-production-9708.up.railway.app/",
  documents: ["src/**/*.ts", "src/**/*.tsx"],
  generates: {
    "src/gql/": {
      preset: "client",
      config: {
        documentMode: "string",
      },
      plugins: [],
    },
  },
};

export default config;
