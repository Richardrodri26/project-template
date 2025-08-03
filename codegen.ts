import { type CodegenConfig } from '@graphql-codegen/cli';
import { loadEnv } from 'vite';

const schema = loadEnv("production", process.cwd())["VITE_URL_BACKEND_API"] + "graphql";

const config: CodegenConfig = {
  schema,
  documents: ['src/**/*.tsx', 'src/domain/graphql/**/*.graphqls'],
  verbose: true,
  generates: {
    './src/domain/graphql/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
