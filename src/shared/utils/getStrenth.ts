import { formSchema } from '@/lib/validation/formSchema';

export const getStrength = (password: string) => {
  if (!password) return { level: 0, text: 'too short' };

  let score = 0;

  const result = formSchema.shape.password.safeParse(password);
  const maxScore = 6;

  score = result.success
    ? maxScore
    : Math.max(0, maxScore - result.error.issues.length);

  if (score <= 4) return { level: score, text: 'weak' };
  if (score <= 5) return { level: score, text: 'good' };

  return { level: score, text: 'strong' };
};
