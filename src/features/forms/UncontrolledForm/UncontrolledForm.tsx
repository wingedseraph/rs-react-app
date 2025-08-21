import { createPortal } from 'react-dom';

import LabelInput from '@/shared/ui/LabelInput/LabelInput';
import Select from '@/shared/ui/Select/Select';

export default function UncontrolledForm() {
  const handleSubmit = () => {
    /* submit logic formData */
  };

  {
    /* Form should contain labels, which should be connected with inputs (look at htmlFor) */
  }

  {
    /* accept terms(checkbox) */
  }
  {
    /* input file(picture) */
  }
  {
    /* autocomplete select country */
  }

  return (
    <div>
      {createPortal(
        <form
          onSubmit={handleSubmit}
          className="bg-primary border-border-primary fixed top-1/2 left-1/2 z-10 flex w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col gap-10 rounded-4xl border-4 p-10 text-3xl"
        >
          UncontrolledForm
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-4">
              <LabelInput
                type="text"
                name="name"
                id="name"
                placeholder="Jack"
                label="name:"
              />

              <LabelInput
                type="number"
                name="age"
                id="age"
                placeholder="18"
                label="age:"
              />
              <LabelInput
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                label="email:"
              />

              <LabelInput
                type="password"
                name="password"
                id="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                label="password:"
              />
              <LabelInput
                type="password"
                name="password"
                id="secondPassword"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                label="password:"
              />
            </div>

            <div className="flex flex-col gap-4">
              <Select
                label="select gender:"
                name="gender"
                options={['male', 'female']}
              />
              <button type="submit" className="w-fit py-5">
                submit
              </button>
            </div>
          </div>
        </form>,

        document.body
      )}
    </div>
  );
}
