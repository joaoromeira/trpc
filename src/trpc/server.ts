import 'server-only';

import { cache } from 'react';

import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { headers } from 'next/headers';

import { type AppRouter, createCaller } from '@root/server/api/root';
import { createTRPCContext } from '@root/server/api/trpc';

import { createQueryClient } from './query-client';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient
);
