import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { cache } from './cache';



export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: process.env.REACT_APP_URL + '/graphql',
 
});
