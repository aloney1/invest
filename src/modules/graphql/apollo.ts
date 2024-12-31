import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { GRAPHQL_BASE_URL, SEP_GRAPHQL_BASE_URL } from '@/config';
import { CHAIN_ID_KEY } from '@/config/constants';

export let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  const chainID = localStorage.getItem(CHAIN_ID_KEY);
  return new ApolloClient({
    uri: chainID === '42161' ? GRAPHQL_BASE_URL : SEP_GRAPHQL_BASE_URL,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
