import { getStrength } from '@/shared/utils/getStrenth';

export default function PasswordStrength({ password }: { password: string }) {
  const strength = getStrength(password);
  const width = password ? Math.min((strength.level / 6) * 100, 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-base">
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
