import { useState } from 'react';

import z from 'zod';

import { appStore } from '@/app/store';
import { formSchema } from '@/lib/validation/formSchema';
import Datalist from '@/shared/ui/Datalist/Datalist';
import LabelInput from '@/shared/ui/LabelInput/LabelInput';
import Select from '@/shared/ui/Select/Select';

type FormErrors = Record<string, string>;
type ValidatedFormData = z.output<typeof formSchema>;

export default function UncontrolledForm() {
  const { countries, addFormSubmission, closeModal } = appStore();

  const [errors, setErrors] = useState<FormErrors>({});

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const formValues = {
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
      password: formData.get('password'),
      secondPassword: formData.get('secondPassword'),
      gender: formData.get('gender'),
      checkbox: formData.has('checkbox'),
      file: formData.getAll('file'),
      country: formData.get('country'),
    };

    try {
      const data: ValidatedFormData = formSchema.parse(formValues);

      addFormSubmission({
        formType: 'uncontrolled',
        data: {
          name: data.name,
          age: Number(data.age),
          email: data.email,
          gender: data.gender,
          country: data.country,
          checkbox: data.checkbox,
          file: data.file,
        },
      });

      setErrors({});
      event.currentTarget.reset();
      closeModal();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};

        error.issues.forEach((issue) => {
          const path = issue.path.join('.');

          newErrors[path] = issue.message;
        });
        setErrors(newErrors);
        console.error(error.issues);
      }
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-10 text-base md:text-2xl"
    >
      <div className="flex flex-col justify-between gap-4 xl:flex-row">
        <div className="flex flex-col gap-4">
          <LabelInput
            type="text"
            name="name"
            id="nameUncontrolled"
            placeholder="Jack"
            label="name:"
            autoComplete="name"
            error={errors.name}
          />

          <LabelInput
            type="number"
            name="age"
            id="ageUncontrolled"
            placeholder="18"
            label="age:"
            error={errors.age}
          />
          <LabelInput
            type="email"
            name="email"
            id="emailUncontrolled"
            placeholder="example@gmail.com"
            autoComplete="email"
            label="email:"
            error={errors.email}
          />

          <LabelInput
            type="password"
            name="password"
            id="passwordUncontrolled"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
            label="password:"
            autoComplete="new-password"
            error={errors.password}
          />
          <LabelInput
            type="password"
            name="secondPassword"
            id="secondPasswordUncontrolled"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
            label="confirm password:"
            autoComplete="new-password"
            error={errors.secondPassword}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Select
            label="select gender:"
            name="gender"
            id="genderUncontrolled"
            value={['prefer not to say', 'female', 'male']}
          />
          <LabelInput
            type="checkbox"
            name="checkbox"
            id="termsUncontrolled"
            label="accept terms:"
            error={errors.terms}
          />

          <LabelInput
            type="file"
            name="file"
            id="fileUncontrolled"
            label="upload image:"
            error={errors.file}
          />

          <LabelInput
            type="country"
            name="country"
            id="countryUncontrolled"
            label="select country:"
            list="countryListUncontrolled"
            error={errors.countries}
          />
          <Datalist id="countryListUncontrolled" value={countries} />
        </div>
      </div>
      <div className="flex flex-row-reverse justify-between">
        <button
          type="submit"
          className="focus:outline-secondary w-fit self-center"
        >
          submit {/*todo: block button if not all input's if data is unfull*/}
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="focus:outline-secondary w-fit self-center"
        >
          close {/* refactor: make smoothly close */}
        </button>
      </div>
    </form>
  );
}
