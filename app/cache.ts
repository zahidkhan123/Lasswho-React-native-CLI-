import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client';
import * as storage from '@utils/storage';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
      },
    },
  },
});

/**
 * Set initial values when we create cache variables.
 */

export let isLoggedInVar: ReactiveVar<boolean> = makeVar<boolean>(false);
storage
  .loadString('authToken')
  .then((token) => (isLoggedInVar = makeVar<boolean>(!!token)));
