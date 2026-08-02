'use server';

import { auth } from '@/lib/auth';
import { SignupSchema, signupSchema } from './signup-schema';

export async function signupAction(data: SignupSchema) {
  const validated = signupSchema.parse(data);
  await auth.api.signUpEmail({
    body: {
      email: validated.email,
      password: validated.password,
      name: validated.name,
    },
  });
}
