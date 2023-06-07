import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Checkbox = ({ className = 'h-[18px] w-[18px] cursor-pointer accent-orange', ...rest }: CheckboxProps) => {
  return <input type='checkbox' className={className} {...rest} />;
};

export default Checkbox;
