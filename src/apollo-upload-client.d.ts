declare module 'apollo-upload-client/UploadHttpLink.mjs' {
    import type { ApolloLink } from '@apollo/client';
    import type { BaseHttpLink } from '@apollo/client/link/http';

    export default class UploadHttpLink extends ApolloLink {
        constructor(options?: BaseHttpLink.ConstructorOptions);
    }
}
