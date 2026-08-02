'use server';

import { LoginSchema, loginSchema } from './login-schema';
import { auth } from '@/lib/auth';

export async function loginAction(data: LoginSchema) {
  const validated = loginSchema.parse(data);
  await auth.api.signInEmail({
    body: {
      email: validated.email,
      password: validated.password,
    },
  });
}
