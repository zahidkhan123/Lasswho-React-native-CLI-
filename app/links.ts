import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  DefaultOptions,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import * as storage from '@utils/storage';
import { logout } from '@utils/logout';
import { config } from '@config';
import { cache } from '@cache';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export const getApolloClient = () => {
  // If we already have a client initialised, re-use it
  if (apolloClient) {
    return apolloClient;
  }

  const defaultPolicies: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  };

  // Else create the client
  apolloClient = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache,
    defaultOptions: defaultPolicies,
  });

  return apolloClient;
};

export const httpLink = createHttpLink({
  uri: `${config.API_DOMAIN}/graphql`,
});

export const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  // TODO This should be moved in a secure storage (keychain.ts)
  const token = await storage.loadString('authToken');

  console.log(token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-client-id': config.CLIENT_ID,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const errorLink = onError(
  ({ networkError, graphQLErrors, operation }) => {
    // https://www.apollographql.com/docs/link/links/error/#retrying-failed-requests
    console.log('::::', operation.operationName);

    if (graphQLErrors) {
      for (let error of graphQLErrors) {
        // TODO Do not check by message as it is very brittle
        if (
          error.message.toString().toLowerCase().includes('unauthenticated')
        ) {
          logout(getApolloClient());
        }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      // if you would also like to retry automatically on
      // network errors, we recommend that you use
      // apollo-link-retry
    }
  },
);
