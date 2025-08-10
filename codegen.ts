import { type CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const schema = process.env.VITE_URL_BACKEND_API + 'graphql';

const config: CodegenConfig = {
  schema,
  documents: ['src/**/*.tsx', 'src/domain/graphql/**/*.graphqls'],
  verbose: true,
  generates: {
    './src/domain/graphql/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: { withHooks: true },
    },
  },
};

export default config;
