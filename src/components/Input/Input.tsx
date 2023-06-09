import { InputHTMLAttributes, useState } from 'react';
import type { UseFormRegister } from 'react-hook-form';

import { ClosedEyeIcon, EyeIcon } from '../Icons';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
  classNameInput?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  errorMessage?: string;
}

const Input = ({
  name,
  className,
  classNameInput = 'w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm',
  register,
  errorMessage,
  ...rest
}: InputProps) => {
  const [openEye, setOpenEye] = useState(false);

  const registerResult = register && name ? register(name) : {};

  const toggleEye = () => {
    setOpenEye((prevState) => !prevState);
  };

  const handleType = () => {
    if (rest.type === 'password') {
      return openEye ? 'text' : 'password';
    }
    return rest.type;
  };

  return (
    <div className={className}>
      <div className='relative'>
        <input className={classNameInput} {...registerResult} {...rest} type={handleType()} />
        {rest.type == 'password' && openEye && (
          <EyeIcon
            onClick={toggleEye}
            className='absolute right-[10px] top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer stroke-slate-700'
          />
        )}
        {rest.type == 'password' && !openEye && (
          <ClosedEyeIcon
            onClick={toggleEye}
            className='absolute right-[10px] top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer stroke-slate-700'
          />
        )}
      </div>
      {errorMessage && <div className='mt-2 text-sm text-red-500'>{errorMessage}</div>}
    </div>
  );
};

export default Input;
