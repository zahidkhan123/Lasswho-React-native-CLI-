import { isLoggedInVar } from '@cache';
import * as storage from '@utils/storage';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export const logout = async (client: ApolloClient<NormalizedCacheObject>) => {
  try {
    await storage.clear();
    await client.clearStore();
    isLoggedInVar(false);
  } catch (error) {
    console.log(error);
  }
};
