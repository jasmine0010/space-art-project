import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({ title: z.string(), eyebrow: z.string(), description: z.string() }),
});
const art = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/art' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      caption: z.string(),
      credit: z.string(),
      alt: z.string().min(1),
      image: image().optional(),
      approved: z.boolean().default(false),
      order: z.number().default(0),
      download: z.string().startsWith('/downloads/').optional(),
    }),
});
const workshop = defineCollection({
  loader: file('./src/data/workshop.json', {
    parser: (text) => [{ id: 'first', ...JSON.parse(text) }],
  }),
  schema: z.object({
    title: z.string(),
    topic: z.string(),
    status: z.literal('In preparation'),
    audience: z.string(),
    duration: z.string(),
    description: z.string(),
    locationNote: z.string(),
    registrationNote: z.string(),
  }),
});
const site = defineCollection({
  loader: file('./src/data/site.json', { parser: (text) => [{ id: 'main', ...JSON.parse(text) }] }),
  schema: z.object({
    name: z.string().min(1),
    location: z.string(),
    mission: z.string(),
    email: z.union([z.literal(''), z.email()]),
    interestFormUrl: z.union([z.literal(''), z.url({ protocol: /^https$/ })]),
    navigation: z.array(z.object({ label: z.string(), href: z.string().startsWith('/') })),
    branches: z.array(
      z.object({
        number: z.string(),
        title: z.string(),
        description: z.string(),
        href: z.string().startsWith('/'),
        link: z.string(),
        icon: z.enum(['star', 'planet', 'spark']),
        color: z.enum(['yellow', 'pink', 'lavender']),
      }),
    ),
  }),
});
export const collections = { pages, art, workshop, site };
