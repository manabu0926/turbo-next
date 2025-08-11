import { defineConfig } from "orval";

export default defineConfig({
  frontend: {
    input: {
      target: "./src/openapi/generated/openapi.json",
    },
    output: {
      biome: true,
      mode: "tags-split",
      target: "./src/app/_generated/query/",
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
      target: "./src/openapi/generated/openapi.json",
    },
    output: {
      biome: true,
      mode: "tags-split",
      client: "hono",
      target: "./src/server/api/routes",
      override: {
        useTypeOverInterfaces: true,
        hono: {
          compositeRoute: "./src/server/api/configuredApi.ts",
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
      target: "./src/openapi/generated/openapi.json",
    },
    output: {
      biome: true,
      mode: "tags-split",
      target: "./src/app/_generated/zod",
      client: "zod",
      clean: true,
    },
  },
});
