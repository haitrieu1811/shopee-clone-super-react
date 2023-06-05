import { useState } from 'react';

import { MinusIcon, PlusIcon } from '../Icons';
import InputNumber, { InputNumberProps } from '../InputNumber';

interface QuantityControllerProps extends InputNumberProps {
    max?: number;
    onDecrease?: (value: number) => void;
    onIncrease?: (value: number) => void;
    onType?: (value: number) => void;
}

const QuantityController = ({ max, onDecrease, onIncrease, onType, value, ...rest }: QuantityControllerProps) => {
    const [localValue, setLocalValue] = useState<number>(Number(value || 0));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let _value = Number(e.target.value);
        if (max && _value > max) {
            _value = max;
        } else if (_value < 1) {
            _value = 1;
        }
        onType && onType(_value);
        setLocalValue(_value);
    };

    const increase = () => {
        let _value = Number(value || localValue) + 1;
        if (max && _value > max) {
            _value = max;
        }
        onIncrease && onIncrease(_value);
        setLocalValue(_value);
    };

    const decrease = () => {
        let _value = Number(value || localValue) - 1;
        if (_value < 1) {
            _value = 1;
        }
        onDecrease && onDecrease(_value);
        setLocalValue(_value);
    };

    return (
        <div className='mr-[15px] flex items-center'>
            <button
                className='border-[rgba(0, 0, 0, 0.09)] flex h-8 w-8 items-center justify-center rounded-l-sm border text-slate-500'
                onClick={decrease}
            >
                <MinusIcon className='h-[10px] w-[10px] fill-black' />
            </button>
            <InputNumber
                type='text'
                name='quantity'
                classNameInput='h-8 w-[50px] border-y border-b-[#00000016] border-t-[#00000016] text-center outline-none'
                value={value || localValue}
                onChange={handleChange}
                {...rest}
            />
            <button
                className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-[#00000016] text-slate-500'
                onClick={increase}
            >
                <PlusIcon className='h-[10px] w-[10px] fill-black' />
            </button>
        </div>
    );
};

export default QuantityController;
