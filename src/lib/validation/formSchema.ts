import { z } from 'zod';

import { appStore } from '@/app/store';

const MAX_FILE_SIZE = 1024 * 1024 * 10;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

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
    file: z
      .union([z.instanceof(File), z.instanceof(FileList)])
      .refine(
        (file) =>
          file instanceof File || (file instanceof FileList && file.length > 0),
        'file is required'
      )
      .transform((file) => {
        if (file instanceof FileList) {
          return file[0];
        }

        return file;
      })
      .refine(
        (file) => file instanceof File && file.size <= MAX_FILE_SIZE,
        'file size must be less than 10MB'
      )
      .refine(
        (file) => file instanceof File && IMAGE_TYPES.includes(file.type),
        'only .jpg, .jpeg, and .png formats are supported'
      ),
    country: z
      .string()
      .min(1, 'please select a country')
      .refine(
        (value) => appStore.getState().countries.includes(value),
        'please select a valid country'
      ),
  })
  .refine((data) => data.password === data.secondPassword, {
    message: "passwords don't match",
    path: ['secondPassword'],
  });
