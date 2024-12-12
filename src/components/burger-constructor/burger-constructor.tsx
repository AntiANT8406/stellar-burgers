import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '@store';
import { burgerConstructor, orderMade, user } from '@slices';
import { ProtectedRoute } from '../protected-route';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [preloaderIsClosed, setPreloaderIsClosed] = useState(false);
  const constructorItems = useAppSelector(burgerConstructor.selectCurrentItems);
  const orderData = useAppSelector(burgerConstructor.selectOrderData);
  const orderRequest = useAppSelector(orderMade.selectOrderRequest);
  const orderModalData = useAppSelector(orderMade.selectOrderData);
  const userData = useAppSelector(user.selectUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    !userData
      ? navigate('/login')
      : dispatch(orderMade.makeOrderThunk(orderData));
  };
  const closeOrderModal = () => {
    setPreloaderIsClosed(true);
    orderModalData && dispatch(orderMade.clearData());
    orderModalData && dispatch(burgerConstructor.clearData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      preloaderIsClosed={preloaderIsClosed}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
