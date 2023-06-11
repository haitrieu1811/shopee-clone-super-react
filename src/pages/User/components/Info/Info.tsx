import { Fragment } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Input from 'src/components/Input';
import InputNumber from 'src/components/InputNumber';
import { UpdateProfileFormData } from '../../pages/Profile/Profile';
import DateSelect from '../DateSelect';

const Info = () => {
  const { t } = useTranslation('pages');
  const {
    control,
    register,
    formState: { errors }
  } = useFormContext<UpdateProfileFormData>();

  return (
    <Fragment>
      <div className='flex items-center pb-[30px]'>
        <div className='w-auto pr-5 text-right text-sm text-gray-500 md:w-[160px]'>{t('profile.name')}</div>
        <div className='flex-1 text-sm'>
          <Input
            type='text'
            placeholder={t('profile.name')}
            name='name'
            register={register}
            errorMessage={errors.name?.message}
          />
        </div>
      </div>
      <div className='flex items-center pb-[30px]'>
        <div className='w-auto pr-5 text-right text-sm text-gray-500 md:w-[160px]'>{t('profile.phone_number')}</div>
        <div className='flex-1 text-sm'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                placeholder={t('profile.phone_number')}
                errorMessage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
      <div className='flex items-center pb-[30px]'>
        <div className='w-auto pr-5 text-right text-sm text-gray-500 md:w-[160px]'>{t('profile.address')}</div>
        <div className='flex-1 text-sm'>
          <Input
            type='text'
            name='address'
            placeholder={t('profile.address')}
            register={register}
            errorMessage={errors.address?.message}
          />
        </div>
      </div>
      <Controller
        control={control}
        name='date_of_birth'
        render={({ field }) => (
          <DateSelect errorMessage={errors.date_of_birth?.message} value={field.value} onChange={field.onChange} />
        )}
      />
    </Fragment>
  );
};

export default Info;
