import { useAppDispatch, useAppSelector } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { userOrders } from '@slices';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useAppSelector(userOrders.selectOrders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userOrders.getUserOrdersThunk());
  }, []);
  return <ProfileOrdersUI orders={orders} />;
};
