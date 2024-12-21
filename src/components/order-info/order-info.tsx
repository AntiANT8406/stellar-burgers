import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { ingredients, orderModal, feed, userOrders } from '@slices';
import { useAppDispatch, useAppSelector } from '@store';
import { useParams } from 'react-router-dom';
import { NotFound404 } from '@pages';

const findOrderByNumber = (orders: TOrder[], number: number) =>
  orders.find((order) => order.number === number);

export const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();
  const { number } = useParams<{ number: string }>();
  const orderNumber = Number(number);
  const ingredientsData: TIngredient[] = useAppSelector(
    ingredients.selectIngredients
  );
  const feedOrdersData = useAppSelector(feed.selectOrders);
  const userOrdersData = useAppSelector(userOrders.selectOrders);
  const modalOrder = useAppSelector(orderModal.selectOrder);
  const orderIsFetched = useAppSelector(orderModal.selectIsFetched);
  let orderData: TOrder | null;
  orderData =
    findOrderByNumber(feedOrdersData, orderNumber) ||
    findOrderByNumber(userOrdersData, orderNumber) ||
    modalOrder;

  useEffect(() => {
    if (orderData === null) {
      dispatch(orderModal.getOrderModalThunk(orderNumber));
    }
  }, []);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredientsData.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredientsData.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredientsData]);

  if (orderIsFetched && !orderData) {
    return <NotFound404 />;
  }

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
