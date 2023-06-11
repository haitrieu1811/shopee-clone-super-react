import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import userApi from 'src/apis/user.api';
import Button from 'src/components/Button';
import InputFile from 'src/components/InputFile';
import { AppContext } from 'src/contexts/app.context';
import { ErrorResponse } from 'src/types/utils.type';
import { setProfileToStorage } from 'src/utils/auth';
import { UserSchema, userSchema } from 'src/utils/rules';
import { getAvatarUrl, isEntityError } from 'src/utils/utils';
import Heading from '../../components/Heading';
import Info from '../../components/Info';

export type UpdateProfileFormData = Pick<UserSchema, 'name' | 'avatar' | 'address' | 'date_of_birth' | 'phone'>;
type FormDataError = Omit<UpdateProfileFormData, 'date_of_birth'> & { date_of_birth?: string };
const profileSchema = userSchema.pick(['name', 'avatar', 'address', 'date_of_birth', 'phone']);

const Profile = () => {
  const { t } = useTranslation('pages');
  const { setProfile } = useContext(AppContext);
  const [file, setFile] = useState<File>();

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : '';
  }, [file]);

  const getProfileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  });
  const profile = getProfileQuery.data?.data.data;

  const methods = useForm<UpdateProfileFormData>({
    defaultValues: {
      name: '',
      avatar: '',
      address: '',
      phone: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  });

  const { setValue, handleSubmit, setError } = methods;

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name);
      setValue('address', profile.address);
      setValue('phone', profile.phone);
      setValue('avatar', profile.avatar);
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1));
    }
  }, [profile, setValue]);

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      const updatedUser = data.data.data;
      getProfileQuery.refetch();
      toast.success(data.data.message);
      setProfile(updatedUser);
      setProfileToStorage(updatedUser);
    }
  });

  const uploadAvatarMutation = useMutation(userApi.uploadAvatar);

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = profile?.avatar;
      if (file) {
        const form = new FormData();
        form.append('image', file);
        await uploadAvatarMutation.mutateAsync(form, {
          onSuccess: (data) => {
            avatarName = data.data.data;
          }
        });
      }
      await updateProfileMutation.mutateAsync({
        ...data,
        avatar: avatarName,
        date_of_birth: data.date_of_birth?.toISOString()
      });
    } catch (error) {
      if (isEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data;
        if (!isEmpty(formError)) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            });
          });
        }
      }
    }
  });

  const handleChangeFile = (value?: File) => {
    setFile(value);
  };

  return (
    <div className='rounded-sm bg-white px-[30px] pb-[10px] shadow'>
      <div className='border-b-[1px] border-b-gray-200 py-[18px]'>
        <Heading title={t('profile.my_profile')} description={t('profile.my_profile_description')} />
      </div>
      <FormProvider {...methods}>
        <form className='grid grid-cols-12 gap-6 pt-[30px]' onSubmit={onSubmit}>
          <div className='order-last col-span-12 mt-6 md:order-first md:col-span-8 md:border-r-[1px] md:border-r-gray-200  md:pr-[50px] lg:mt-0'>
            <div className='flex items-center pb-[30px]'>
              <div className='w-auto pr-5 text-right text-sm text-gray-500 md:w-[160px]'>{t('profile.email')}</div>
              <div className='flex-1 text-sm'>{profile?.email}</div>
            </div>
            <Info />
            <Button
              isLoading={updateProfileMutation.isLoading}
              className='mb-[30px] h-10 rounded-sm bg-orange px-5 text-sm text-white hover:bg-[#f05d40] md:ml-[160px]'
            >
              {t('profile.save')}
            </Button>
          </div>
          <div className='col-span-12 flex flex-col items-center md:col-span-4'>
            <img
              src={previewImage || getAvatarUrl(profile?.avatar)}
              alt='Avatar'
              className='my-5 h-[100px] w-[100px] rounded-full object-cover'
            />
            <InputFile onChange={handleChangeFile} />
            <div className='mt-[13px] text-sm leading-relaxed text-gray-500'>
              <p>{t('profile.max_file_size')}</p>
              <p>{t('profile.file_extension')}</p>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Profile;
