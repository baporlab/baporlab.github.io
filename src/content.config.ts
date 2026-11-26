import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const publications = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/publications' }),
  schema: z.object({
    doi: z.string().min(1),
    title: z.string().optional(),
    authors: z.array(z.string()).optional().default([]),
    journal: z.string().optional(),
    date: z.coerce.date().optional(),
    news: z.boolean().optional().default(false),
    news_title: z.string().optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    category: z.enum(['publication', 'project', 'award', 'members', 'presentation', 'etc']).default('etc'),
    link: z.string().optional(),
  }),
});

const members = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/members' }),
  schema: z.object({
    name: z.string().min(1),
    group: z.enum(['professor', 'researcher', 'staff', 'alumni']),
    role: z.string().optional().default(''),
    photo: z.string().optional(),
    email: z.string().optional(),
    order: z.number().optional().default(999),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/research' }),
  schema: z.object({
    title: z.string().optional().default(''),
    image: z.string(),
    order: z.number().optional().default(999),
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/settings' }),
  schema: z.object({
    // home
    headline: z.string().optional(),
    subheadline: z.string().optional(),
    intro: z.string().optional(),
    slides: z.array(z.object({ image: z.string() })).optional(),
    // site
    name: z.string().optional(),
    address: z.string().optional(),
    email: z.string().optional(),
    vacancies: z.string().optional(),
  }),
});

export const collections = { publications, news, members, research, settings };
