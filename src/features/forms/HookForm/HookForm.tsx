import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { appStore } from '@/app/store';
import { formSchema } from '@/lib/validation/formSchema';
import Datalist from '@/shared/ui/Datalist/Datalist';
import LabelInput from '@/shared/ui/LabelInput/LabelInput';
import PasswordStrength from '@/shared/ui/PasswordStrength/PasswordStrength';
import Select from '@/shared/ui/Select/Select';

type FormData = z.input<typeof formSchema>;

export default function HookForm() {
  const { countries, addFormSubmission, closeModal } = appStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    const parsedData = formSchema.parse(data);

    addFormSubmission({
      formType: 'hook',
      data: parsedData,
    });

    reset();
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit) as React.FormEventHandler}
      className="flex flex-col gap-10 text-base md:text-2xl"
    >
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col gap-4">
          <LabelInput
            type="text"
            placeholder="Jack"
            label="name:"
            id="nameHook"
            autoComplete="name"
            error={errors.name?.message}
            {...register('name')}
          />

          <LabelInput
            type="number"
            placeholder="18"
            label="age:"
            id="ageHook"
            error={errors.age?.message}
            {...register('age')}
          />

          <LabelInput
            type="email"
            placeholder="example@gmail.com"
            autoComplete="email"
            label="email:"
            id="emailHook"
            error={errors.email?.message}
            {...register('email')}
          />

          <div>
            <LabelInput
              type="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
              label="password:"
              id="passwordHook"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register('password')}
            />
            <PasswordStrength password={watch('password') || ''} />
          </div>

          <LabelInput
            type="password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
            label="confirm password:"
            autoComplete="new-password"
            id="secondPasswordHook"
            error={errors.secondPassword?.message}
            {...register('secondPassword')}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Select
            label="select gender:"
            value={['prefer not to say', 'female', 'male']}
            id="selectHook"
            {...register('gender')}
          />

          <LabelInput
            type="checkbox"
            label="accept terms:"
            id="termsHook"
            error={errors.checkbox?.message}
            {...register('checkbox')}
          />

          <LabelInput
            type="file"
            label="upload image:"
            id="fileHook"
            error={errors.file?.message?.toString()}
            {...register('file')}
          />

          <LabelInput
            type="country"
            label="select country:"
            id="countryHook"
            list="countryListHook"
            error={errors.country?.message}
            {...register('country')}
          />
          <Datalist id="countryListHook" value={countries} />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={closeModal}
          className="w-fit self-center"
        >
          close
        </button>
        <button type="submit" className="w-fit self-center">
          submit
        </button>
      </div>
    </form>
  );
}
