import { appStore } from '@/app/store';
import { Card } from '@/shared/ui/Card/Card';

export default function CardList() {
  const { formSubmissions } = appStore();

  return (
    <>
      {formSubmissions.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
            {formSubmissions.map((submission) => (
              <Card key={submission.id} data={submission} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
