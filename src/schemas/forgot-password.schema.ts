import { z } from 'zod';

export const forgotPasswordSchema = z
  .object({
    email: z.email('Invalid email').min(1, 'Email is required'),
    new_password: z
      .string()
      .min(6, 'Password must have at least 6 characters')
      .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least 1 number'),
    confirmPassword: z.string().min(6, 'Invalid password'),
  })
  .superRefine((val, ctx) => {
    if (val.new_password !== val.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
