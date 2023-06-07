import { InputHTMLAttributes } from 'react';
import type { UseFormRegister } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
  classNameInput?: string;
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
  const registerResult = register ? register(name) : {};

  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} />
      {errorMessage && <div className='mt-2 text-sm text-red-500'>{errorMessage}</div>}
    </div>
  );
};

export default Input;
