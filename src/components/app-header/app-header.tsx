import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '@store';
import { user } from '@slices';

export const AppHeader: FC = () => {
  const userData = useAppSelector(user.selectUser);
  return <AppHeaderUI userName={userData?.name || ''} />;
};
