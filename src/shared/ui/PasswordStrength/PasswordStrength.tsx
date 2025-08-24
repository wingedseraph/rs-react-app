import { formSchema } from '@/lib/validation/formSchema';

type PasswordStrengthProps = {
  password: string;
};

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = (pass: string) => {
    if (!pass) return { level: 0, text: 'too short' };

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

  const strength = getStrength(password);
  const width = password ? Math.min((strength.level / 6) * 100, 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-600">
        <span className="text-secondary">{strength.text}</span>
      </div>
      <div className="bg-border-primary mt-1 h-1 w-full rounded">
        <div
          className="bg-secondary h-full rounded transition-all duration-300"
          style={{ width: `${String(width)}%` }}
        />
      </div>
    </div>
  );
}
