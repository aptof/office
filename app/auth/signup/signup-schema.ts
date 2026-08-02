import { z } from 'zod';

export const signupSchema = z
  .object({
    email: z.email().trim(),
    name: z.string().min(3, 'At least 3 characters').trim(),
    password: z.string().min(8, 'At least 8 characters'),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    error: 'Password does not match',
    path: ['confirm'],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
