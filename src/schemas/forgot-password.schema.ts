import { z } from 'zod';

export const forgotPasswordSchema = z
  .object({
    email: z.email('Invalid email').min(1, 'Email is required'),
    password: z.string().min(6, 'Invalid password'),
    confirmPassword: z.string().min(6, 'Invalid password'),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
