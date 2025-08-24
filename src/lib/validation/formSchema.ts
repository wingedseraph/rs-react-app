import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'name is required')
      .refine(
        (value) => /^[A-Z]/.test(value),
        'name must start with a capital letter'
      ),
    age: z
      .string()
      .min(1, 'age is required')
      .refine((val) => Number(val) > 0, 'age must be a positive number'),
    email: z.email('email is required'),
    password: z
      .string()
      .min(6, 'password must be at least 6 characters')
      .refine(
        (value) =>
          /[A-Z]/.test(value) &&
          /[0-9]/.test(value) &&
          /[!@#$%^&*]/.test(value) &&
          /[a-z]/.test(value),
        'password must contain uppercase, lowercase, number, and special character'
      ),
    secondPassword: z.string().min(1, 'please confirm your password'),
    gender: z.string().min(1, 'please select a gender'),
    checkbox: z.boolean().refine((val) => val, 'you must accept the terms'),
    file: z.instanceof(FileList).optional(),
    country: z.string().min(1, 'please select a country'),
  })
  .refine((data) => data.password === data.secondPassword, {
    message: "passwords don't match",
    path: ['secondPassword'],
  });
