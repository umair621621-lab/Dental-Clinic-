import { createClient, type SanityClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01';

if (!projectId) {
  // Warn loudly, but don't throw: `createClient` requires a projectId,
  // and throwing here is a module-load-time crash that takes down every
  // page (including the build's own page-data collection) when the env
  // var isn't set yet. Callers already fall back gracefully via
  // `safeFetch` in queries.ts.
  console.warn(
    '[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Content fetches will fail.'
  );
}

type FetchOnlyClient = Pick<SanityClient, 'fetch'>;

function createConfiguredClient(
  config: Parameters<typeof createClient>[0]
): SanityClient | FetchOnlyClient {
  if (!projectId) {
    return {
      fetch: () =>
        Promise.reject(
          new Error('[sanity] Cannot fetch: NEXT_PUBLIC_SANITY_PROJECT_ID is not set.')
        ),
    };
  }
  return createClient(config);
}

/**
 * Public, read-only client for anything rendered to visitors.
 * Uses the CDN and only ever returns published documents.
 */
export const sanityClient = createConfiguredClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

/**
 * Privileged, token-authenticated client. Only import this inside
 * server-only code (Route Handlers, Server Components that need
 * draft content) — never bundle SANITY_API_TOKEN into client code.
 */
export const sanityWriteClient = createConfiguredClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published',
});
