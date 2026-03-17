'use client';

import CreateAdForm from '@/features/create-ad/ui/CreateAdForm';
import { RootState } from '@/shared/store/store';
import { useSelector } from 'react-redux';

const CreatePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <p>Авторизуйтесь, что бы создать объявление</p>;
  return <CreateAdForm />;
};

export default CreatePage;
