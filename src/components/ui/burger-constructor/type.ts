import { TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  preloaderIsClosed: boolean;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
