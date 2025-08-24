import clsx from 'clsx';

import { type FormSubmission } from '@/app/store';
import { useBase64Image } from '@/shared/hooks/useBase64Image';

type CardProps = {
  data: FormSubmission;
};

export const Card = ({ data }: CardProps) => {
  const { imageSrc, error } = useBase64Image(data.data.file);

  return (
    <div
      className={clsx(
        'rounded-4xl border-4 p-10 transition-all duration-300',
        data.isNew ? 'border-secondary' : 'border-transparent'
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold capitalize">{data.formType} Form</h2>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Name:</span>
          <span>{data.data.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Age:</span>
          <span>{data.data.age}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>{data.data.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Gender:</span>
          <span className="capitalize">{data.data.gender}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Country:</span>
          <span className="capitalize">{data.data.country}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Terms Accepted:</span>
          <span>{data.data.checkbox ? 'Yes' : 'No'}</span>
        </div>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="form submitted file"
            className="mt-4 max-h-48 max-w-48 rounded-lg"
          />
        ) : (
          <span className="text-sm">{error}</span>
        )}
      </div>
    </div>
  );
};
