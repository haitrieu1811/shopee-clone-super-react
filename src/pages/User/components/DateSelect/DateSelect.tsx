import range from 'lodash/range';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DateSelectProps {
  value?: Date;
  onChange?: (value: Date) => void;
  errorMessage?: string;
}

const DateSelect = ({ value, onChange, errorMessage }: DateSelectProps) => {
  const { t } = useTranslation('pages');

  const [date, setDate] = useState({
    date: 1,
    month: 0,
    year: 1990
  });

  useEffect(() => {
    setDate({
      date: value?.getDate() || 1,
      month: value?.getMonth() || 0,
      year: value?.getFullYear() || 1990
    });
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const newDate = {
      ...date,
      [name]: value
    };
    setDate(newDate);
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date));
  };

  return (
    <div className='flex items-center pb-[30px]'>
      <div className='w-auto pr-5 text-right text-sm text-gray-500 md:w-[160px]'>{t('profile.date_of_birth')}</div>
      <div className='flex-1'>
        <div className='grid grid-cols-12 gap-2'>
          <select
            name='date'
            onChange={handleChange}
            value={value?.getDate() || date.date}
            className='col-span-4 cursor-pointer rounded-sm border border-gray-300 p-2 text-sm outline-none hover:border-orange focus:border-orange'
          >
            <option disabled>{t('profile.date')}</option>
            {range(1, 32).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name='month'
            onChange={handleChange}
            value={value?.getMonth() || date.month}
            className='col-span-4 cursor-pointer rounded-sm border border-gray-300 p-2 text-sm outline-none hover:border-orange focus:border-orange'
          >
            <option disabled>{t('profile.month')}</option>
            {range(0, 12).map((item) => (
              <option key={item} value={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            name='year'
            onChange={handleChange}
            value={value?.getFullYear() || date.year}
            className='col-span-4 cursor-pointer rounded-sm border border-gray-300 p-2 text-sm outline-none hover:border-orange focus:border-orange'
          >
            <option disabled>{t('profile.year')}</option>
            {range(1910, 2024).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {errorMessage && <div className='mt-2 text-sm text-red-500'>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default DateSelect;
