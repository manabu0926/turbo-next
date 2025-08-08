import { defineConfig } from "orval";

export default defineConfig({
  frontend: {
    input: {
      target: "./openapi/generated/openapi.json",
    },
    output: {
      biome: true,
      mode: "tags-split",
      target: "./src/app/generated/query/",
      clean: true,
      client: "react-query",
      httpClient: "axios",
      override: {
        mutator: {
          path: "./src/app/api/lib/customInstance.ts",
          name: "customInstance",
        },
        useTypeOverInterfaces: true,
        query: {
          useSuspenseQuery: true,
          version: 5,
        },
      },
    },
  },
  server: {
    input: {
      target: "./openapi/generated/openapi.json",
    },
    output: {
      biome: true,
      mode: "tags-split",
      client: "hono",
      target: "./src/server/api/routes",
      override: {
        useTypeOverInterfaces: true,
        hono: {
          compositeRoute: "./src/server/api/configured_api.ts",
          validatorOutputPath: "./src/server/api/routes/validator.ts",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: {
        command: "bun check:unsafe",
      },
    },
  },
  zod: {
    input: {
      target: "./openapi/generated/openapi.json",
    },
    output: {
      biome: true,
      mode: "tags-split",
      target: "./src/app/generated/zod",
      client: "zod",
      clean: true,
    },
  },
});
