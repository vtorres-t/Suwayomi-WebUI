import gql from 'graphql-tag';

export const USER_LOGIN = gql`
    mutation USER_LOGIN($password: String!, $username: String!) {
        login(input: { password: $password, username: $username }) {
            accessToken
            refreshToken
        }
    }
`;

export const USER_REFRESH = gql`
    mutation USER_REFRESH($refreshToken: String!) {
        refreshToken(input: { refreshToken: $refreshToken }) {
            accessToken
        }
    }
`;
