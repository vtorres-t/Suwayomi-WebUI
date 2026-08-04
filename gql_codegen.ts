import type { CodegenConfig } from '@graphql-codegen/cli';
// eslint-disable-next-line import-x/no-extraneous-dependencies
import 'dotenv/config';

const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.CODEGEN_SERVER_URL_GQL,
    documents: ['src/lib/graphql/**', '!src/lib/graphql/generated/**'],
    ignoreNoDocuments: true,
    config: {
        namingConvention: {
            typeNames: 'change-case-all#pascalCase',
            transformUnderscore: true,
        },
        scalars: {
            LongString: 'string',
            Cursor: 'string',
            Duration: 'string',
        },
    },
    generates: {
        'src/lib/graphql/generated/graphql-base.types.ts': {
            plugins: ['typescript'],
            config: {
                generateOperationTypes: false,
            },
        },
        'src/lib/graphql/generated/graphql.ts': {
            plugins: ['typescript-operations'],
            config: {
                importSchemaTypesFrom: 'src/lib/graphql/generated/graphql-base.types.ts',
                nonOptionalTypename: true,
            },
        },
        'src/lib/graphql/generated/apollo-helpers.ts': {
            plugins: ['typescript-apollo-client-helpers'],
        },
    },
};

// eslint-disable-next-line import-x/no-default-export
export default config;
