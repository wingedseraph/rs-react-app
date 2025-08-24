import { z } from 'zod';

export const formSchema = z
  .object({
    name: z.string().min(1, 'name is required'), // refactor: age (should be number, no negative values)
    age: z
      .string()
      .min(1, 'age is required')
      .transform(Number)
      .pipe(z.number().positive('must be a positive value')),
    email: z.email('email is required'),
    // refactor: should match, display the password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character
    password: z.string().min(6, 'password must be at least 6 characters'),
    secondPassword: z.string().min(1, 'please confirm your password'),
    gender: z.string().min(1, 'please select a gender'),
    checkbox: z.boolean().refine((val) => val, 'you must accept the terms'),
    // file: z.instanceof(FileList).optional(), // refactor: validate size and extension, allow png jpeg, save in redux store as base64
    country: z.string().min(1, 'please select a country'),
  })
  .refine((data) => data.password === data.secondPassword, {
    message: "passwords don't match",
    path: ['secondPassword'],
  });
