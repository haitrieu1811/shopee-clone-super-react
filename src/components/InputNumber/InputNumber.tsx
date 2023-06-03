import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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
        onChange,
        ...rest
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (/^\d+$/.test(value) || value === '') {
            onChange && onChange(e);
        }
    };

    return (
        <div className={className}>
            <input className={classNameInput} onChange={handleChange} {...rest} ref={ref} />
            {errorMessage && <div className={classNameError}>{errorMessage}</div>}
        </div>
    );
};

export default forwardRef<HTMLInputElement, InputProps>(InputNumber);
