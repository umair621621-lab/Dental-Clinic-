import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01';

if (!projectId) {
  // Fail loudly at build/runtime rather than silently rendering an
  // empty site — a missing project id almost always means the
  // developer forgot to set NEXT_PUBLIC_SANITY_PROJECT_ID.
  console.warn(
    '[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Content fetches will fail.'
  );
}

/**
 * Public, read-only client for anything rendered to visitors.
 * Uses the CDN and only ever returns published documents.
 */
export const sanityClient = createClient({
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
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published',
});
