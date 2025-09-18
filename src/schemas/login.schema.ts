import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(6, 'Invalid password'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
