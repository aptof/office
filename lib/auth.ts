import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/lib/db';
import { nextCookies } from 'better-auth/next-js';
import { schema } from './auth-schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite', // or "mysql", "pg"
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  plugins: [nextCookies()],
});
