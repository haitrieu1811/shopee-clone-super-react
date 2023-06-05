import { InputHTMLAttributes, useState } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
    classNameInput?: string;
    classNameError?: string;
}

const InputV2 = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
    props: UseControllerProps<TFieldValues, TName> & InputNumberProps
) => {
    const {
        type,
        className,
        classNameInput = 'w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm',
        classNameError = 'mt-2 text-sm text-red-500',
        value = '',
        onChange,
        ...rest
    } = props;

    const { field, fieldState } = useController(props);

    const [localValue, setLocalValue] = useState<string>(value as string);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueFromInput = e.target.value;
        const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '');
        if (numberCondition || type !== 'number') {
            onChange && onChange(e);
            setLocalValue(valueFromInput);
            field.onChange(e);
        }
    };

    return (
        <div className={className}>
            <input
                className={classNameInput}
                {...rest}
                {...field}
                value={value || localValue}
                onChange={handleChange}
            />
            {fieldState.error?.message && <div className={classNameError}>{fieldState.error?.message}</div>}
        </div>
    );
};

export default InputV2;

// type Gen<TFunc> = {
//     getName: TFunc;
// };

// const Hexa = <TFunc extends () => string, TLastName extends ReturnType<TFunc>>(props: {
//     person: Gen<TFunc>;
//     lastName: TLastName;
// }) => {
//     return null;
// };

// const handleName: () => 'Triều Trần' = () => 'Triều Trần';

// const App = () => {
//     return <Hexa person={{ getName: handleName }} lastName='Triều Trần' />;
// };
