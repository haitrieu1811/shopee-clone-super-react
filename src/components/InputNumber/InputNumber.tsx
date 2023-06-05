import { InputHTMLAttributes, forwardRef, useState } from 'react';

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    classNameInput?: string;
    classNameError?: string;
    errorMessage?: string;
}

const InputNumber = (
    {
        className,
        classNameInput = 'w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm',
        classNameError = 'mt-2 text-sm text-red-500',
        errorMessage,
        value = '',
        onChange,
        ...rest
    }: InputNumberProps,
    ref: React.ForwardedRef<HTMLInputElement>
) => {
    const [localValue, setLocalValue] = useState<string>(value as string);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (/^\d+$/.test(value) || value === '') {
            onChange && onChange(e);
            setLocalValue(value);
        }
    };

    return (
        <div className={className}>
            <input className={classNameInput} onChange={handleChange} {...rest} value={value || localValue} ref={ref} />
            {errorMessage && <div className={classNameError}>{errorMessage}</div>}
        </div>
    );
};

export default forwardRef<HTMLInputElement, InputNumberProps>(InputNumber);
